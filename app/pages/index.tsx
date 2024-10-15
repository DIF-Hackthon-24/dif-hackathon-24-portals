import { useState } from "react";
import Modal from "../components/Modal";
import { MapPinIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import SignInForm from "../components/SignInForm";

// import { useRouter } from "next/router";

export default function Login() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isOnSignIn, setIsOnSignIn] = useState(false);
  const [modalTitle, setModalTitle] = useState("Passwordless Login")
  const [modalDescription, setModalDescription] = useState("Scan this QR code from your digital wallet to log in")
  // const router = useRouter();

  const openModal = async () => {
    setModalIsOpen(true);
    await fetchVerificationQRCode();
  };

  const closeModal = () => {
    setModalTitle("Passwordless Login")
    setModalDescription("Scan this QR code from your digital wallet to log in")
    setModalIsOpen(false);
  };

  const fetchVerificationQRCode = async () => {
    const response = await fetch("/api/verification");
    const data = await response.json()
    setQrCodeUrl(data.qrCode);
  };

  const fetchIssuanceQRCode = async () => {
    const response = await fetch("/api/issuance", {method: "POST"});
    const data = await response.json()
    setModalTitle("Acquire Login Credential")
    setModalDescription("Scan this QR code from your digital wallet to get a new Login Credential")
    setQrCodeUrl(data.qrCode);
  };

  // const handleLoginSuccess = () => {
  //   // Simulate login success, navigate to the landing page
  //   router.push("/landing");
  // };

  return (
    <div className="relative bg-white h-screen">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 h-full">
        <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <img
              alt="Your Company"
              src="https://cdn-icons-png.freepik.com/512/5070/5070423.png?ga=GA1.1.377055622.1728578237"
              className="h-11"
            />
            <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
              Horizon Hotels
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Unlock Exclusive Perks and Tailored Stays –{" "}
              <button
                className="highlight-mark font-extrabold underline"
                onClick={() => setIsOnSignIn(true)}
              >
                SIGN IN
              </button>{" "}
              for Personalized Offers or Continue to Book Your Getaway
            </p>
            {!isOnSignIn ? (
              <div className="bg-white rounded-lg max-w-md w-full mt-12">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-600 font-medium mb-2 italic"
                  >
                    Destination
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MapPinIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-400"
                      />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Bali, St. Tropez, Tanzania, Anywhere..."
                      className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-4"
                    />
                  </div>
                </div>

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
                />

                <button className="w-full bg-cyan-600 text-white py-2 rounded-lg font-semibold hover:bg-cyan-700 transition duration-300">
                  Find your next stay
                  <ArrowRightIcon
                    aria-hidden="true"
                    className="h-5 w-5 inline"
                  />
                </button>
              </div>
            ) : (
              <SignInForm buttonAction={openModal} />
            )}
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          />
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        title={modalTitle}
        buttonActionTitle="Acquire Login Credential"
        buttonAction={fetchIssuanceQRCode}
      >
        <h2>{modalDescription}</h2>
        {qrCodeUrl && <img className="inline h-64" src={qrCodeUrl} alt="QR Code" />}
      </Modal>
    </div>
  );
}
