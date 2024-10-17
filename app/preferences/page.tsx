"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useRouter } from "next/navigation";

export default function Preferences() {
  const [showQrCode, setShowQrCode] = useState(false);
  const router = useRouter();
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [polling, setPolling] = useState<boolean>(true);

  useEffect(() => {
    const pollEndpoint = async () => {
      try {
        const response = await fetch(
          `/api/permissions/grant?protocol=https://tel-platform.online/schemas/contactInformation&action=read`,
          {
            method: "GET"
          }
        );
        const data = await response.json();
        console.log("Data in polling", data);
        // Check if permission has been granted
        if (data.grantId) {
          setPolling(false); // Stop polling when permission grant is successful
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
    setShowQrCode(true);
    setPolling(true);
  };

  return (
    <div
      className="p-12"
      style={{
        backgroundImage:
          "backgroundImage: linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url('https://images.unsplash.com/photo-1661285829826-acd045ab0a77?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    >
      <Header />

      <form className="mt-20">
        <div className="mx-[20%] py-14 px-[5%] bg-white rounded-md">
          <h2 className="text-4xl font-semibold leading-7 text-gray-900 text-center">
            Let's set your travel preferences
          </h2>
          <p className="text-xl leading-6 text-gray-600 text-center mt-6">
            We only use these to curate personalized recommendations to you
          </p>

          <div className="flex items-center flex-col mt-6">
            <button
              className="rounded-md bg-cyan-600 px-5 py-2 text-xl font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              onClick={async (e) => {
                e.preventDefault();
                await fetchPermissionRequestQRCode(
                  "https://tel-platform.online/schemas/contactInformation",
                  "read"
                );
              }}
            >
              Already provided these in the App Wallet? Click Here
            </button>
            {showQrCode && (
              <div className="flex flex-col items-center mt-4">
                <h3 className="text-gray-900 italic">
                  Scan the QR code below from your App Wallet
                </h3>
                {qrCodeUrl && (
                  <img className="inline h-64" src={qrCodeUrl} alt="QR Code" />
                )}
              </div>
            )}
          </div>

          <div className="mt-16 ">
            <h3 className="text-gray-500 tracking-[3px] font-bold">
              ACCOMMODATION PREFERENCES
            </h3>
            <div className="mt-4">
              <label
                htmlFor="roomtype"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Room Type Preference
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    id="roomtype"
                    name="roomtype"
                    type="text"
                    placeholder="Standard Double, Premium Deluxe..."
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <label
                htmlFor="roomtemp"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Room Temperature Preference
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    id="roomtemp"
                    name="roomtemp"
                    type="text"
                    placeholder="In degrees Celcius, e.g., 18"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <label
                htmlFor="breakfast"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Breakfast Included
              </label>
              <div className="mt-2">
                <select
                  id="breakfast"
                  name="breakfast"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>

            <div className="mt-8">
              <label
                htmlFor="wheelchair"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Wheelchair Accessible
              </label>
              <div className="mt-2">
                <select
                  id="wheelchair"
                  name="wheelchair"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
            </div>

            <div className="mt-8">
              <label
                htmlFor="smoking"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Smoking
              </label>
              <div className="mt-2">
                <select
                  id="smoking"
                  name="smoking"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-16 ">
            <h3 className="text-gray-500 tracking-[3px] font-bold">
              DINING PREFERENCES
            </h3>
            <div className="mt-4">
              <label
                htmlFor="diet"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Diet Preference
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    id="diet"
                    name="diet"
                    type="text"
                    placeholder="Vegeterian, Vegan..."
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <label
                htmlFor="allergies"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Allergies
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    id="allergies"
                    name="allergies"
                    type="text"
                    placeholder="Nuts, Lactose..."
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={() => router.push("/browse")}
              type="button"
              className="text-base font-semibold leading-6 text-gray-900 hover:bg-gray-100 px-3 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-cyan-600 px-5 py-2 text-xl font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              NEXT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
