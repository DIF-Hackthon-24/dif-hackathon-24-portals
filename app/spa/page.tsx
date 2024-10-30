"use client";

import { useEffect, useState } from "react";
import { Field, Label, Switch } from "@headlessui/react";
import { PlusIcon, CheckBadgeIcon } from "@heroicons/react/20/solid";
import Modal from "../components/Modal";
import { useSearchParams } from "next/navigation";

const filters = [
  {
    id: "treatment",
    name: "",
    options: [
      { value: "massage", label: "Massage" },
      { value: "facial", label: "Facial" },
      { value: "manicure", label: "Manicure" },
      { value: "pedicure", label: "Pedicure" },
      { value: "general-pass", label: "General" },
    ],
  },
];
const massages = [
  {
    id: 1,
    name: "Bespoke full body massage",
    href: "/browse/1",
    price: "$250",
    discountPrice: "$220",
    description: "Sunset Executive Suite",
    duration: "90 mins",
  },
  {
    id: 2,
    name: "Aromatherapy massage",
    href: "#",
    price: "$295",
    discountPrice: "$270",
    description: "Baobab View Junior Suite",
    duration: "60 mins",
  },
  {
    id: 3,
    name: "Deep release massage",
    href: "#",
    price: "$300",
    description: "Lumière Presidential Suite",
    duration: "90 mins",
  },
  // More products...
];

const facial = [
  {
    id: 10,
    name: "Introduction facial",
    href: "/browse/1",
    price: "$250",
    description: "Sunset Executive Suite",
    duration: "60 mins",
  },
  {
    id: 11,
    name: "Renew & Glow flacial",
    href: "#",
    price: "$280",
    description: "Baobab View Junior Suite",
    duration: "60 mins",
  },
  {
    id: 12,
    name: "Ultimate lift facial",
    href: "#",
    price: "$300",
    description: "Lumière Presidential Suite",
    duration: "60 mins",
  },
  // More products...
];

const manicure = [
  {
    id: 20,
    name: "Basic manicure",
    href: "/browse/1",
    price: "$60",
    discountPrice: "$55",
    description: "Sunset Executive Suite",
    duration: "60 mins",
  },
  {
    id: 21,
    name: "Gel manicure",
    href: "#",
    price: "$85",
    description: "Baobab View Junior Suite",
    duration: "60 mins",
  },
  {
    id: 22,
    name: "French manicure",
    href: "#",
    price: "$90",
    discountPrice: "$75",
    description: "Lumière Presidential Suite",
    duration: "60 mins",
  },
  // More products...
];

const pedicure = [
  {
    id: 20,
    name: "Basic pedicure",
    href: "/browse/1",
    price: "$70",
    description: "Sunset Executive Suite",
    duration: "60 mins",
  },
  {
    id: 21,
    name: "Gel pedicure",
    href: "#",
    price: "$95",
    description: "Baobab View Junior Suite",
    duration: "60 mins",
  },
  {
    id: 22,
    name: "French pedicure",
    href: "#",
    price: "$95",
    description: "Lumière Presidential Suite",
    duration: "60 mins",
  },
  // More products...
];

const general = [
  {
    id: 20,
    name: "General day pass",
    href: "/browse/1",
    price: "$300",
    description: "Sunset Executive Suite",
    duration: "1 day",
  },
  {
    id: 21,
    name: "Wellbeing treament 45 mins",
    href: "#",
    price: "$80",
    description: "Baobab View Junior Suite",
    duration: "45 mins",
  },
  {
    id: 22,
    name: "Personal Trainer 60mins",
    href: "#",
    price: "$125",
    description: "Lumière Presidential Suite",
    duration: "60 mins",
  },
  // More products...
];

export default function Browse() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [permissionGrantId, setPermissionGrantId] = useState<string>("");
  const [polling, setPolling] = useState<boolean>(false);
  const [records, setRecords] = useState<{ [key: string]: any }>({});
  const [filterOptions, setFilterOptions] = useState(false);

  const searchParams = useSearchParams();
  const discounted = searchParams.get("code");

  useEffect(() => {
    const pollEndpoint = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("accept", "*/*");
        myHeaders.append("Content-Type", "application/json");

        // keyInfo hardcoded right now, representing hotel website's keyInfo to sign permission grant GET
        // target is the user's DWN, using hardcoded for now too

        const stringifiedKey = JSON.stringify({
          keyId:
            "did:key:z6Mkftos2iAt9hL2joUGvjDVVkeaWPYBj9CYehUxx4niRfKv#z6Mkftos2iAt9hL2joUGvjDVVkeaWPYBj9CYehUxx4niRfKv",
          privateJwk: {
            crv: "Ed25519",
            d: "sSwQBXpKgkvJsinzgffzgIwSmwawPCsN4h9r0POVJ-U",
            kty: "OKP",
            x: "FWcvDHQemUB2TnoCkTea10q2O3dnhwQGoetKyp10UVE",
            kid: "jUh1nu3jESKWUPkMEPfJpOwFelke-yeMSwHtnAR0HFE",
            alg: "EdDSA",
          },
        });

        myHeaders.append("X-KeyInfo", stringifiedKey);
        myHeaders.append(
          "X-Target",
          "did:key:z6Mkkq7UNpMq9cdYoC5bqG2C4reWkPTgwDzKqBy1Y8utc4gW"
        );
        const response = await fetch(
          `/api/permissions/grant?protocol=https://dif-hackathon-2024/schemas/travelerProfile&action=read`,
          {
            method: "GET",
            headers: myHeaders,
          }
        );
        const data = await response.json();
        console.log("Data in polling", data);
        // Check if permission has been granted
        if (data.grantId) {
          setPolling(false); // Stop polling when permission grant is successful
          setPermissionGrantId(data.grantId);
          setModalIsOpen(false);
        }
      } catch (error) {
        console.error("Error fetching permission grant result:", error);
      }
    };

    // Set up the polling logic
    const interval = setInterval(() => {
      if (polling) {
        console.log("Polling!!");
        console.log("Permission request awaiting approval");
        pollEndpoint();
      } else {
        clearInterval(interval); // Stop polling once the condition is met
      }
    }, 2000); // Poll every 2 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [polling, qrCodeUrl]);

  useEffect(() => {
    const fetchRecords = async (protocol: string) => {
      console.log("Fetching records");

      const protocolPaths = ["spaTreatments", "wheelchairAccessible"];

      const body = JSON.stringify({
        protocol: protocol,
        protocolPaths: protocolPaths,
        permissionGrantId: permissionGrantId,
        keyInfo: {
          keyId:
            "did:key:z6Mkftos2iAt9hL2joUGvjDVVkeaWPYBj9CYehUxx4niRfKv#z6Mkftos2iAt9hL2joUGvjDVVkeaWPYBj9CYehUxx4niRfKv",
          privateJwk: {
            crv: "Ed25519",
            d: "sSwQBXpKgkvJsinzgffzgIwSmwawPCsN4h9r0POVJ-U",
            kty: "OKP",
            x: "FWcvDHQemUB2TnoCkTea10q2O3dnhwQGoetKyp10UVE",
            kid: "jUh1nu3jESKWUPkMEPfJpOwFelke-yeMSwHtnAR0HFE",
            alg: "EdDSA",
          },
        },
        target: "did:key:z6Mkkq7UNpMq9cdYoC5bqG2C4reWkPTgwDzKqBy1Y8utc4gW",
      });

      const response = await fetch("/api/records/read", {
        method: "POST",
        body: body,
      });
      const data = await response.json();
      console.log("Got records", data);
      const spaTreatmentsArray = data.spaTreatments.split(",");
      console.log(spaTreatmentsArray);
      data.spaTreatments = spaTreatmentsArray;
      setRecords(data);
      setFilterOptions(true);
    };

    if (permissionGrantId !== "") {
      console.log("Have permissionGrantId, can do records-read now");
      fetchRecords("https://dif-hackathon-2024/schemas/travelerProfile");
    }
  }, [permissionGrantId]);

  const closeModal = () => {
    setModalIsOpen(false);
    setPolling(false);
  };

  const fetchPermissionRequestQRCode = async (
    protocol: string,
    action: string
  ) => {
    console.log("Fetching permission request QR code");
    // keyInfo hardcoded right now, representing spa website's keyInfo to sign permission request
    // target is the user's DWN, using hardcoded for now too
    const body = JSON.stringify({
      protocol: protocol,
      action: action,
      keyInfo: {
        keyId:
          "did:key:z6Mkftos2iAt9hL2joUGvjDVVkeaWPYBj9CYehUxx4niRfKv#z6Mkftos2iAt9hL2joUGvjDVVkeaWPYBj9CYehUxx4niRfKv",
        privateJwk: {
          crv: "Ed25519",
          d: "sSwQBXpKgkvJsinzgffzgIwSmwawPCsN4h9r0POVJ-U",
          kty: "OKP",
          x: "FWcvDHQemUB2TnoCkTea10q2O3dnhwQGoetKyp10UVE",
          kid: "jUh1nu3jESKWUPkMEPfJpOwFelke-yeMSwHtnAR0HFE",
          alg: "EdDSA",
        },
      },
      target: "did:key:z6Mkkq7UNpMq9cdYoC5bqG2C4reWkPTgwDzKqBy1Y8utc4gW",
    });
    const response = await fetch("/api/permissions/request", {
      method: "POST",
      body: body,
    });
    const data = await response.json();
    setQrCodeUrl(data.qrCode);
    setModalIsOpen(true);
    setPolling(true);
  };

  const handleLoyaltyVerification = async () => {
    const response = await fetch("/api/loyalty", { method: "GET" });
    const data = await response.json();
    window.location.href = data.urlRedirect;
  };

  return (
    <>
      <div style={{ width: "100%", height: "18vh", overflow: "hidden", position:'absolute' }}>
        <img
          src="https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Spa image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="bg-orange-50 p-12 min-h-[100vh]">
        <div>
          <main>
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="py-10 text-center inline">
                <h1
                  className="text-4xl tracking-tight text-gray-900"
                  style={{
                    zIndex: 99,
                    position: "relative",
                    width: "max-content",
                    backgroundColor: "color(srgb 0.9999 0.9689 0.93)",
                    padding: "0rem 3rem",
                    margin: "auto",
                    marginTop: "7rem",
                    marginBottom: "3rem",
                  }}
                >
                  <img
                    alt="Your Company"
                    src="https://cdn-icons-png.flaticon.com/512/2438/2438018.png"
                    className="h-20 inline"
                  />
                  <div className="font-sans font-bold text-4xl">
                    Horizon Spa & Wellness
                  </div>
                </h1>
              </div>

              {!discounted && (
                <button
                  className="w-full p-[9pt] font-bold underline text-left mb-3 mt-5 flex flex-row"
                  style={{ backgroundColor: "rgba(217, 119, 6, 0.2)", alignItems:'center', borderColor:'color(srgb 0.8522 0.467 0.0171)', borderRadius:'5rem', borderWidth:'2pt'}}
                  onClick={() => handleLoyaltyVerification()}
                >
                  <img src="https://cdn-icons-png.flaticon.com/512/94/94699.png" style={{height:'2rem', marginRight:'1rem'}}/>
                  Have a loyalty credential? Press here to unlock exclusive
                  prices
                </button>
              )}

              {/* Filters */}
              <div className="pt-12 flex flex-row gap-[4rem]">
                <aside>
                  <h2 className="pb-2 font-bold text-xl text-gray-700">
                    Filter by Treatment
                  </h2>

                  {permissionGrantId ? (
                    <>
                      <div className=" inline-flex gap-1 items-center">
                        <CheckBadgeIcon className="h-5 w-5 fill-amber-600" />

                        <p className="text-base">
                          Traveler profile successfully shared!
                        </p>
                      </div>
                      <p className="text-sm italic pb-10">
                        Filters have been automatically populated based on
                        preferences from your profile
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm italic pb-2 text-gray-600">
                        Have a traveler profile already in App Wallet?
                      </p>
                      <button
                        type="button"
                        className="rounded-md mb-2 bg-amber-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                        onClick={async (e) => {
                          e.preventDefault();
                          await fetchPermissionRequestQRCode(
                            "https://dif-hackathon-2024/schemas/travelerProfile",
                            "read"
                          );
                        }}
                      >
                        Click here to share preferences
                      </button>
                    </>
                  )}
                  <Modal
                    isOpen={modalIsOpen}
                    onClose={closeModal}
                    title="Horizon Spa & Wellness is requesting read access to your traveler profile"
                    footer="No thanks, I'll input my preferences manually"
                  >
                    <h3 className="text-gray-900 italic">
                      Scan the QR code below from your App Wallet
                    </h3>
                    {qrCodeUrl && (
                      <img
                        className="inline h-64"
                        src={qrCodeUrl}
                        alt="QR Code"
                      />
                    )}
                  </Modal>

                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="inline-flex items-center lg:hidden"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      Filters
                    </span>
                    <PlusIcon
                      aria-hidden="true"
                      className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                    />
                  </button>

                  <div className="hidden lg:block">
                    <form className="space-y-8 ">
                      {filters.map((section, sectionIdx) => (
                        <div
                          key={section.name}
                          className={sectionIdx === 0 ? null : "pt-10"}
                        >
                          <fieldset>
                            <legend className="block text-sm font-medium text-gray-900">
                              {section.name}
                            </legend>
                            <div className="space-y-3 pt-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    defaultValue={option.value}
                                    id={`${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    checked={records?.spaTreatments?.includes(
                                      option.label
                                    )}
                                    className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                  />
                                  <label
                                    htmlFor={`${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </fieldset>
                        </div>
                      ))}

                      <hr />

                      <Field className="flex items-center">
                        <Switch
                          checked={records["wheelchairAccessible"] === "Yes"}
                          // onChange={setEnabled}
                          className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 data-[checked]:bg-amber-600"
                        >
                          <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                          />
                        </Switch>
                        <Label as="span" className="ml-3 text-sm">
                          <span className="font-medium text-gray-900">
                            Wheelchair accessible
                          </span>
                        </Label>
                      </Field>
                    </form>
                  </div>
                </aside>

                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <h2
                      id="category-heading"
                      className="text-2xl font-bold tracking-tight text-gray-900"
                    >
                      Massages
                    </h2>
                    <a
                      href="#"
                      className="hidden text-sm font-semibold text-amber-600 hover:text-amber-500 sm:block"
                    >
                      Browse all
                      <span aria-hidden="true"> &rarr;</span>
                    </a>

                    <div className="flex flex-row gap-2">
                      {massages.map((product) => (
                        <div
                          key={product.id}
                          className="p-5 w-[18rem] bg-neutral-50 rounded-lg text-center"
                        >
                          <h3 className="font-bold">{product.name}</h3>
                          {/* <p>{product.description}</p> */}
                          <p>
                            {product.duration}{" "}
                            <span className="text-[1.5rem]">|</span>{" "}
                            {product.discountPrice ? (
                              !discounted ? (
                                <>{product.price}</>
                              ) : (
                                <>
                                  <span className="line-through mr-1">
                                    {product.price}
                                  </span>
                                  <span className="font-bold">
                                    {product.discountPrice}
                                  </span>
                                </>
                              )
                            ) : (
                              <>{product.price}</>
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!filterOptions && (
                    <div className="flex flex-col mt-14">
                      <h2
                        id="category-heading"
                        className="text-2xl font-bold tracking-tight text-gray-900"
                      >
                        Facials
                      </h2>
                      <a
                        href="#"
                        className="hidden text-sm font-semibold text-amber-600 hover:text-amber-500 sm:block"
                      >
                        Browse all
                        <span aria-hidden="true"> &rarr;</span>
                      </a>

                      <div className="flex flex-row gap-2">
                        {facial.map((product) => (
                          <div
                            key={product.id}
                            className="p-5 w-[18rem] bg-neutral-50 rounded-lg text-center"
                          >
                            <h3 className="font-bold">{product.name}</h3>
                            {/* <p>{product.description}</p> */}
                            <p>
                              {product.duration}{" "}
                              <span className="text-[1.5rem]">|</span>{" "}
                              {product.price}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col mt-14">
                    <h2
                      id="category-heading"
                      className="text-2xl font-bold tracking-tight text-gray-900"
                    >
                      Manicure
                    </h2>
                    <a
                      href="#"
                      className="hidden text-sm font-semibold text-amber-600 hover:text-amber-500 sm:block"
                    >
                      Browse all
                      <span aria-hidden="true"> &rarr;</span>
                    </a>

                    <div className="flex flex-row gap-2">
                      {manicure.map((product) => (
                        <div
                          key={product.id}
                          className="p-5 w-[18rem] bg-neutral-50 rounded-lg text-center"
                        >
                          <h3 className="font-bold">{product.name}</h3>
                          {/* <p>{product.description}</p> */}
                          <p>
                            {product.duration}{" "}
                            <span className="text-[1.5rem]">|</span>{" "}
                            {product.discountPrice ? (
                              !discounted ? (
                                <>{product.price}</>
                              ) : (
                                <>
                                  <span className="line-through mr-1 text-[11pt]">
                                    {product.price}
                                  </span>
                                  <span className="font-bold">
                                    {product.discountPrice}
                                  </span>
                                </>
                              )
                            ) : (
                              <>{product.price}</>
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!filterOptions && (
                    <div className="flex flex-col mt-14">
                      <h2
                        id="category-heading"
                        className="text-2xl font-bold tracking-tight text-gray-900"
                      >
                        Pedicure
                      </h2>
                      <a
                        href="#"
                        className="hidden text-sm font-semibold text-amber-600 hover:text-amber-500 sm:block"
                      >
                        Browse all
                        <span aria-hidden="true"> &rarr;</span>
                      </a>

                      <div className="flex flex-row gap-2">
                        {pedicure.map((product) => (
                          <div
                            key={product.id}
                            className="p-5 w-[18rem] bg-neutral-50 rounded-lg text-center"
                          >
                            <h3 className="font-bold">{product.name}</h3>
                            {/* <p>{product.description}</p> */}
                            <p>
                              {product.duration}{" "}
                              <span className="text-[1.5rem]">|</span>{" "}
                              {product.price}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!filterOptions && (
                    <div className="flex flex-col mt-14">
                      <h2
                        id="category-heading"
                        className="text-2xl font-bold tracking-tight text-gray-900"
                      >
                        General
                      </h2>
                      <a
                        href="#"
                        className="hidden text-sm font-semibold text-amber-600 hover:text-amber-500 sm:block"
                      >
                        Browse all
                        <span aria-hidden="true"> &rarr;</span>
                      </a>

                      <div className="flex flex-row gap-2">
                        {general.map((product) => (
                          <div
                            key={product.id}
                            className="p-5 w-[18rem] bg-neutral-50 rounded-lg text-center"
                          >
                            <h3 className="font-bold">{product.name}</h3>
                            {/* <p>{product.description}</p> */}
                            <p>
                              {product.duration}{" "}
                              <span className="text-[1.5rem]">|</span>{" "}
                              {product.price}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
