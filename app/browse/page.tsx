"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Field,
  Label,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Switch,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PlusIcon,
  CheckBadgeIcon
} from "@heroicons/react/20/solid";
import Header from "../components/Header";
import Modal from "../components/Modal";

const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"];
const navigation = {
  categories: [
    {
      name: "Hotels",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone."
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees."
        },
        {
          name: "Accessories",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-03.jpg",
          imageAlt:
            "Model wearing minimalist watch with black wristband and white watch face."
        },
        {
          name: "Carry",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-04.jpg",
          imageAlt:
            "Model opening tan leather long wallet with credit card pockets and cash pouch."
        }
      ]
    },
    {
      name: "Experiences",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-01-men-category-01.jpg",
          imageAlt:
            "Hats and sweaters on wood shelves next to various colors of t-shirts on hangers."
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-01-men-category-02.jpg",
          imageAlt: "Model wearing light heather gray t-shirt."
        },
        {
          name: "Accessories",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-01-men-category-03.jpg",
          imageAlt:
            "Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body."
        },
        {
          name: "Carry",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-01-men-category-04.jpg",
          imageAlt:
            "Model putting folded cash into slim card holder olive leather wallet with hand stitching."
        }
      ]
    }
  ],
  pages: [
    { name: "Special Offers", href: "#" },
    { name: "About", href: "#" }
  ]
};
const filters = [
  {
    id: "roomType",
    name: "Room Type",
    options: [
      { value: "suite", label: "Standard room" },
      { value: "deluxe-room", label: "Deluxe room" },
      { value: "shoes-n-more", label: "Joint room" },
      { value: "supplies-n-stuff", label: "Suite" }
    ]
  }
];
const products1 = [
  {
    id: 1,
    name: "Verdant Retreat, The Smoky Mountains in Tennessee",
    href: "#",
    price: "from $250",
    description: "Sunset Executive Suite",
    imageSrc:
      "https://images.unsplash.com/photo-1722763529109-2bcb289a47c3?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card."
  },
  {
    id: 2,
    name: "Savanna Ridge Lodge, Sabie Park in South Africa",
    href: "#",
    price: "from $145",
    description: "Baobab View Junior Suite",
    imageSrc:
      "https://images.unsplash.com/photo-1607712617949-8c993d290809?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Paper card sitting upright in walnut card holder on desk."
  },
  {
    id: 3,
    name: "L'Étoile Royale, in Paris",
    href: "#",
    price: "from $300",
    description: "Lumière Presidential Suite",
    imageSrc:
      "https://images.unsplash.com/photo-1592229505801-77b31918d822?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt:
      "Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop."
  }
  // More products...
];
const products2 = [
  {
    id: 7,
    name: "Azure Atoll Resort, in the Maldives",
    href: "#",
    price: "from $310",
    description: "Coral Horizon Junior suite",
    imageSrc:
      "https://images.unsplash.com/photo-1602693680203-a01c07f9dfae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt:
      "Close up of long kettle spout pouring boiling water into pour-over coffee mug with frothy coffee."
  },
  {
    id: 8,
    name: "Palais des Sables, in Marrakesh",
    href: "#",
    price: "from $165",
    description: "Deluxe double room",
    imageSrc:
      "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt:
      "Extra large black leather workspace pad on desk with computer, wooden shelf, desk organizer, and computer peripherals."
  },
  {
    id: 9,
    name: "Tatra Majesty Hotel, in Bratislava",
    href: "#",
    price: "from $120",
    description: "Standard double room",
    imageSrc:
      "https://images.unsplash.com/photo-1680503146476-abb8c752e1f4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt:
      "Leather long wallet held open with hand-stitched card dividers, full-length bill pocket, and simple tab closure."
  }
  // More products...
];

export default function Browse() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [permissionGrantId, setPermissionGrantId] = useState<string>("");
  const [polling, setPolling] = useState<boolean>(false);
  const [records, setRecords] = useState<{ [key: string]: {} }>({});

  useEffect(() => {
    const pollEndpoint = async () => {
      try {
        const response = await fetch(
          `/api/permissions/grant?protocol=https://dif-hackathon-2024/schemas/hotelSearchPreferences&action=read`,
          {
            method: "GET"
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
        "roomType",
        "smoking",
        "wheelchairAccessible",
        "breakfastIncluded"
      ];

      const body = JSON.stringify({
        protocol: protocol,
        protocolPaths: protocolPaths,
        permissionGrantId: permissionGrantId,
        target: "did:key:z6Mkkq7UNpMq9cdYoC5bqG2C4reWkPTgwDzKqBy1Y8utc4gW"
      });

      const response = await fetch("/api/records/read", {
        method: "POST",
        body: body
      });
      const data = await response.json();
      console.log("Got records", data);
      setRecords(data);
    };

    if (permissionGrantId !== "") {
      console.log("Have permissionGrantId, can do records-read now");
      fetchRecords("https://dif-hackathon-2024/schemas/hotelSearchPreferences");
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
          alg: "EdDSA"
        }
      },
      target: "did:key:z6Mkkq7UNpMq9cdYoC5bqG2C4reWkPTgwDzKqBy1Y8utc4gW"
    });
    const response = await fetch("/api/permissions/request", {
      method: "POST",
      body: body
    });
    const data = await response.json();
    setQrCodeUrl(data.qrCode);
    setModalIsOpen(true);
    setPolling(true);
  };

  return (
    <div className="bg-gray-50 p-12">
      <Header />
      <div>
        <header className="relative">
          <nav aria-label="Top">
            {/* Top navigation */}

            {/* Secondary navigation */}
            <div className="bg-white shadow-sm mt-3 mx-auto flex h-16 justify-between">
              <div className="hidden h-full lg:flex">
                {/* Flyout menus */}
                <PopoverGroup className="inset-x-0 bottom-0 px-4">
                  <div className="flex h-full justify-center space-x-8">
                    {navigation.categories.map((category) => (
                      <Popover key={category.name} className="flex">
                        <div className="relative flex">
                          <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:text-indigo-600">
                            {category.name}
                            <span
                              aria-hidden="true"
                              className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-[open]:bg-indigo-600"
                            />
                          </PopoverButton>
                        </div>

                        <PopoverPanel
                          transition
                          className="group absolute inset-x-0 top-full z-20 bg-white text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 top-1/2 bg-white shadow"
                          />
                          {/* Fake border when menu is open */}
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"
                          >
                            <div className="h-px w-full bg-transparent transition-colors duration-200 ease-out group-data-[open]:bg-gray-200" />
                          </div>

                          <div className="relative">
                            <div className="mx-auto max-w-7xl px-8">
                              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                {category.featured.map((item) => (
                                  <div
                                    key={item.name}
                                    className="group relative"
                                  >
                                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                      <img
                                        alt={item.imageAlt}
                                        src={item.imageSrc}
                                        className="object-cover object-center"
                                      />
                                    </div>
                                    <a
                                      href={item.href}
                                      className="mt-4 block font-medium text-gray-900"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 z-10"
                                      />
                                      {item.name}
                                    </a>
                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </PopoverPanel>
                      </Popover>
                    ))}

                    {navigation.pages.map((page) => (
                      <a
                        key={page.name}
                        href={page.href}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {page.name}
                      </a>
                    ))}
                  </div>
                </PopoverGroup>
              </div>

              <div className="flex flex-1 items-center justify-end">
                <div className="flex items-center lg:ml-8">
                  {/* Cart */}
                  <div className="ml-4 mr-4 flow-root lg:ml-8">
                    <a href="#" className="group -m-2 flex items-center p-2">
                      <ShoppingBagIcon
                        aria-hidden="true"
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        0
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>

      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4">
                {filters.map((section) => (
                  <Disclosure
                    key={section.name}
                    as="div"
                    className="border-t border-gray-200 pb-4 pt-4"
                  >
                    <fieldset>
                      <legend className="w-full px-2">
                        <DisclosureButton className="group flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                          <span className="text-sm font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="h-5 w-5 rotate-0 transform group-data-[open]:-rotate-180"
                            />
                          </span>
                        </DisclosureButton>
                      </legend>
                      <DisclosurePanel className="px-4 pb-2 pt-4">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                defaultValue={option.value}
                                id={`${section.id}-${optionIdx}-mobile`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`${section.id}-${optionIdx}-mobile`}
                                className="ml-3 text-sm text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </fieldset>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="py-24 text-center">
              <h1 className="text-4xl tracking-tight text-gray-900">
                <div className="font-serif">Discover unmatched experiences</div>
                <div className="font-sans font-bold text-6xl">
                  Featured Hotels & Stays
                </div>
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-base text-gray-500">
                Whether you seek serenity or adventure, our handpicked
                destinations and special offers ensure every moment is
                extraordinary.
              </p>
            </div>
            <hr></hr>
            {/* Filters */}
            <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              <aside>
                <h2 className="pb-2 font-bold text-xl">Filters</h2>

                {permissionGrantId ? (
                  <>
                    <div className=" inline-flex gap-1 items-center">
                      <CheckBadgeIcon className="h-5 w-5 fill-cyan-600" />

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
                    <p className="text-sm italic pb-2">
                      Have a traveler profile already in App Wallet?
                    </p>
                    <button
                      type="button"
                      className="rounded-md mb-10 bg-cyan-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                      onClick={async (e) => {
                        e.preventDefault();
                        await fetchPermissionRequestQRCode(
                          "https://dif-hackathon-2024/schemas/hotelSearchPreferences",
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
                  title="Horizon Hotels is requesting read access to your traveler profile"
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
                                  className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
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
                    <hr className="mt-2"></hr>
                    <Field className="flex items-center">
                      <Switch
                        checked={records["smoking"] === "Yes"}
                        // onChange={setEnabled}
                        className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 data-[checked]:bg-cyan-600"
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                        />
                      </Switch>
                      <Label as="span" className="ml-3 text-sm">
                        <span className="font-medium text-gray-900">
                          Smoking allowed
                        </span>
                      </Label>
                    </Field>
                    <Field className="flex items-center">
                      <Switch
                        checked={records["wheelchairAccessible"] === "Yes"}
                        // onChange={setEnabled}
                        className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 data-[checked]:bg-cyan-600"
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
                    <Field className="flex items-center">
                      <Switch
                        checked={records["breakfastIncluded"] === "Yes"}
                        // onChange={setEnabled}
                        className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 data-[checked]:bg-cyan-600"
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                        />
                      </Switch>
                      <Label as="span" className="ml-3 text-sm">
                        <span className="font-medium text-gray-900">
                          Breakfast included
                        </span>
                      </Label>
                    </Field>
                  </form>
                </div>
              </aside>

              {/* Product grid */}
              <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
                <section aria-labelledby="products-heading" className="mt-8">
                  <h2 id="products-heading" className="sr-only">
                    Products
                  </h2>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {products1.map((product) => (
                      <a key={product.id} href={product.href} className="group">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
                          <img
                            alt={product.imageAlt}
                            src={product.imageSrc}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                          />
                        </div>
                        <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                          <h3>{product.name}</h3>
                          <p>{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm italic text-gray-500">
                          {product.description}
                        </p>
                      </a>
                    ))}
                  </div>
                </section>

                <section
                  aria-labelledby="featured-heading"
                  className="relative mt-16 overflow-hidden rounded-lg lg:h-96"
                >
                  <div className="absolute inset-0">
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1595370637468-5b2364def4aa?q=80&w=2668&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="relative h-96 w-full lg:hidden"
                  />
                  <div
                    aria-hidden="true"
                    className="relative h-32 w-full lg:hidden"
                  />
                  <div className="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-br-none lg:rounded-tl-lg">
                    <div>
                      <h2
                        id="featured-heading"
                        className="text-xl font-bold text-white"
                      >
                        Explore All-Inclusive Packages
                      </h2>
                      <p className="mt-1 text-sm text-gray-300">
                        Discover the ease of luxury with our all-inclusive
                        packages.
                      </p>
                    </div>
                    <a
                      href="#"
                      className="mt-6 flex flex-shrink-0 items-center justify-center rounded-md border border-white border-opacity-25 bg-white bg-opacity-0 px-4 py-3 text-base font-medium text-white hover:bg-opacity-10 sm:ml-8 sm:mt-0 lg:ml-0 lg:w-full"
                    >
                      View the packages
                    </a>
                  </div>
                </section>

                <section
                  aria-labelledby="more-products-heading"
                  className="mt-16 pb-24"
                >
                  <h2 id="more-products-heading" className="sr-only">
                    More products
                  </h2>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {products2.map((product) => (
                      <a key={product.id} href={product.href} className="group">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
                          <img
                            alt={product.imageAlt}
                            src={product.imageSrc}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                          />
                        </div>
                        <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                          <h3>{product.name}</h3>
                          <p>{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm italic text-gray-500">
                          {product.description}
                        </p>
                      </a>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>

        <footer
          aria-labelledby="footer-heading"
          className="border-t border-gray-200 bg-white"
        >
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-100 py-10 text-center">
              <p className="text-sm text-gray-500">2024 DIF Hackathon</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
