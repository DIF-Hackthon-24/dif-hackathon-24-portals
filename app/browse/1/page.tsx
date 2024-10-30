"use client";

import { useState } from "react";
import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import Header from "@/app/components/Header";
import TopBar from "@/app/components/TopBar";
import Footer from "@/app/components/Footer";

const product = {
  title: "Sunset Executive Suite",
  name: "Verdant Retreat, The Smoky Mountains in Tennessee",
  price: "",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Women", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      id: 1,
      imageSrc:
        "https://images.unsplash.com/photo-1722763529109-2bcb289a47c3?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageAlt: "Back of women's Basic Tee in black.",
      primary: true,
    },
    {
      id: 2,
      imageSrc:
        "https://images.unsplash.com/photo-1596194815712-2975c42363a9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageAlt: "Side profile of women's Basic Tee in black.",
      primary: false,
    },
    {
      id: 3,
      imageSrc:
        "https://images.unsplash.com/photo-1581783748410-2c5377ad72ee?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageAlt: "Front of women's Basic Tee in black.",
      primary: false,
    },
  ],
  description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
  details: [
    "Super King sized bed",
    "Spacious living room area",
    "On-site parking",
    "Free high-speed internet",
  ],
};
const policies = [
  {
    name: "Fantastic location",
    icon: GlobeAmericasIcon,
    description: "Located in the heart of the scenic Smoky Mountains",
  },
  {
    name: "Loyalty rewards",
    icon: CurrencyDollarIcon,
    description: "Exclusive special pricing for loyalty members",
  },
];
const reviews = {
  average: 4.8,
  totalCount: 512,
  featured: [
    {
      id: 1,
      title: "Can't say enough good things",
      rating: 5,
      content: `
        <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
        <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
      `,
      author: "Risako M",
      date: "May 16, 2021",
      datetime: "2021-01-06",
    },
    // More reviews...
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductPage() {
  const [datesSet, setDatesSet] = useState(false);

  const handleIssuance = async () => {
    const response = await fetch("/api/bookingIssuance", { method: "POST" });
    const data = await response.json();
    window.location.href = data.urlRedirect;
  };

  return (
    <div className="bg-gray-50 p-12">
      <Header />
      <TopBar />

      <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <div className="flex justify-between">
              <h2 className="text-xl font-medium text-gray-900">
                {product.name}
              </h2>
              <p className="text-xl font-medium text-gray-900">
                {product.price}
              </p>
            </div>
            {/* Reviews */}
            <div className="mt-4">
              <h2 className="sr-only">Reviews</h2>
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  {reviews.average}
                  <span className="sr-only"> out of 5 stars</span>
                </p>
                <div className="ml-1 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        reviews.average > rating
                          ? "text-yellow-400"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                    />
                  ))}
                </div>
                <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                  ·
                </div>
                <div className="ml-4 flex">
                  <a
                    href="#"
                    className="text-sm font-medium text-cyan-600 hover:text-cyan-500"
                  >
                    See all {reviews.totalCount} reviews
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
              {product.images.map((image) => (
                <img
                  key={image.id}
                  alt={image.imageAlt}
                  src={image.imageSrc}
                  className={classNames(
                    image.primary
                      ? "lg:col-span-2 lg:row-span-2"
                      : "hidden lg:block",
                    "rounded-lg"
                  )}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 lg:col-span-5">
            <label
              htmlFor="inbound"
              className="block text-gray-600 font-medium mb-2 italic"
            >
              From
            </label>
            <input
              type="date"
              id="inbound"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
            />

            <label
              htmlFor="outbound"
              className="block text-gray-600 font-medium mb-2 italic"
            >
              Until
            </label>
            <input
              type="date"
              id="outbound"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-6"
              onChange={() => setDatesSet(true)}
            />

            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Guests
              </label>
              <select
                id="guests"
                name="guests"
                defaultValue="2"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>1</option>
                <option>2</option>
              </select>
            </div>

            {datesSet && (
              <div className="mt-6 font-bold text-right text-xl">$1300</div>
            )}

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-cyan-600 px-8 py-3 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              onClick={(e) => {
                e.preventDefault();
                handleIssuance();
              }}
            >
              <span className="font-bold tracking-widest">BOOK</span>
            </button>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-sm font-medium text-gray-900">Description</h2>

              <div className="prose prose-sm mt-4 text-gray-500">
                <ul role="list">
                  {product.details.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Policies */}
            <section aria-labelledby="policies-heading" className="mt-10">
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {policies.map((policy) => (
                  <div
                    key={policy.name}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
                  >
                    <dt>
                      <policy.icon
                        aria-hidden="true"
                        className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                      />
                      <span className="mt-4 text-sm font-medium text-gray-900">
                        {policy.name}
                      </span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-500">
                      {policy.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
