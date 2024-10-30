"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import TopBar from "@/app/components/TopBar";

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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ConfirmationPage() {
  return (
    <div className="bg-gray-50 p-12 h-[100vh]">
      <Header />
      <TopBar />

      <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
        <img
          src="https://cdn.pixabay.com/photo/2012/04/11/10/39/tick-27406_640.png"
          style={{ height: "3rem", margin: "auto", marginBottom: "1rem" }}
        />
        <h1 className="text-5xl font-bold text-center">All booked! </h1>
        <h2 className="text-3xl font-serif text-center mb-16 mt-10">
          We can't wait to see you soon, please check your wallet for the
          booking details
        </h2>

        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex justify-between">
              <h2 className="text-xl font-medium text-gray-900">
                {product.name}
              </h2>
              <p className="text-xl font-medium text-gray-900">
                {product.price}
              </p>
            </div>
            <div className="italic mt-4 flex flex-row items-center">
              <img className="h-[25pt] mr-3" src="https://icons.veryicon.com/png/o/miscellaneous/face-monochrome-icon/calendar-249.png" />
              19/11/2024 - 24/11/2024
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
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
