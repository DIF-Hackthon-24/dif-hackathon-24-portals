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
  const [records, setRecords] = useState<{ [key: string]: unknown }>({});
  const [filterOptions, setFilterOptions] = useState(false);

  const searchParams = useSearchParams();
  const discounted = searchParams.get("code");

  useEffect(() => {
    const pollEndpoint = async () => {
      try {
        const response = await fetch(
          `/api/permissions/grant?protocol=https://dif-hackathon-2024/schemas/travelerProfile&action=read`,
          {
            method: "GET",
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

      const protocolPaths = [
        "massage",
        "facial",
        "manicure",
        "pedicure",
        "general",
        "wheelchairAccessible",
      ];

      const body = JSON.stringify({
        protocol: protocol,
        protocolPaths: protocolPaths,
        permissionGrantId: permissionGrantId,
        target: "did:key:z6Mkkq7UNpMq9cdYoC5bqG2C4reWkPTgwDzKqBy1Y8utc4gW",
      });

      const response = await fetch("/api/records/read", {
        method: "POST",
        body: body,
      });
      const data = await response.json();
      console.log("Got records", data);
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
    // keyInfo hardcoded right now, representing hotel website's keyInfo to sign permission request
    // target is the user's DWN, using hardcoded for now too
    const body = JSON.stringify({
      protocol: protocol,
      action: action,
      keyInfo: {
        keyId:
          "did:key:z6MkeXmNA9HutZcYei7YsU5jimrMcb7EU43BWTXqLXw59VRq#z6MkeXmNA9HutZcYei7YsU5jimrMcb7EU43BWTXqLXw59VRq",
        privateJwk: {
          crv: "Ed25519",
          d: "64EBJEwSPeYkEZLSgVFWAOBGftgO-JSdgfRZn470DXs",
          kty: "OKP",
          x: "ASd5wVTGxYk6NWiWtSZIypBkT11mv8r8jpkdTDkyOdA",
          kid: "U1e64aXaBM_1T7KkyzLejCbSLaYGE6Lpy0Rxyc3iuNA",
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
    <div className="bg-orange-50 p-12 min-h-[100vh]">
      {/* <Header /> */}
      {/* <TopBar /> */}

      <div>
        <main>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="py-10 text-center inline">
              <h1 className="text-4xl tracking-tight text-gray-900">
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
                className="w-full p-[9pt] font-bold underline text-left mb-3 mt-5"
                style={{ backgroundColor: "rgba(217, 119, 6, 0.2)" }}
                onClick={() => handleLoyaltyVerification()}
              >
                Have a loyalty credential? Press here to unlock exclusive prices
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
                  title="Starlight Hotels is requesting read access to your traveler profile"
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
                                  checked={option.label === records[section.id]}
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
                        checked={records["wheelchairAccessible"] === "true"}
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
                        <h3>{product.name}</h3>
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
                                <span className="font-bold">{product.discountPrice}</span>
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
                          <h3>{product.name}</h3>
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
                        <h3>{product.name}</h3>
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
                                <span className="font-bold">{product.discountPrice}</span>
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
                          <h3>{product.name}</h3>
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
                          <h3>{product.name}</h3>
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

              {/* Product grid */}
              {/* <section
                aria-labelledby="category-heading"
                className="pt-24 sm:pt-32 xl:mx-auto xl:px-8"
              >
                <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
                  <h2
                    id="category-heading"
                    className="text-2xl font-bold tracking-tight text-gray-900"
                  >
                    Shop by Category
                  </h2>
                  <a
                    href="#"
                    className="hidden text-sm font-semibold text-amber-600 hover:text-amber-500 sm:block"
                  >
                    Browse all categories
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>

                <div className="mt-4 flow-root">
                  <div className="-my-2">
                    <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
                      <div className="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                        {products1.map((category) => (
                          <a
                            key={category.name}
                            href={category.href}
                            className="relative flex h-80 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 "
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            >
                              <img
                                alt=""
                                src={category.imageSrc}
                                className="h-full object-cover object-center"
                              />
                            </span>
                            <span
                              aria-hidden="true"
                              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                            />
                            <span className="relative mt-auto text-center text-xl font-bold text-white">
                              {category.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 px-4 sm:hidden">
                  <a
                    href="#"
                    className="block text-sm font-semibold text-amber-600 hover:text-amber-500"
                  >
                    Browse all categories
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </section> */}
            </div>
          </div>
        </main>

        {/* <Footer /> */}
      </div>
    </div>
  );
}
