import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  buttonActionTitle: string;
  buttonAction: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  buttonActionTitle,
  buttonAction
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg
                  fill="#000000"
                  height="800px"
                  width="800px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <g>
                      <path
                        d="M373.21,0H138.79c-23.665,0-42.917,19.252-42.917,42.916v426.168c0,23.664,19.252,42.916,42.917,42.916h234.422
			c23.664,0,42.916-19.252,42.916-42.916V42.916C416.128,19.252,396.875,0,373.21,0z M395.729,469.084
			c0,12.417-10.101,22.518-22.519,22.518H138.79c-12.418,0-22.519-10.101-22.519-22.518v-54.996h279.458V469.084z M395.729,393.689
			H116.271V71.394h279.458V393.689z M395.729,50.996H116.271v-8.08c0-12.417,10.101-22.518,22.519-22.518h234.422
			c12.417,0,22.518,10.101,22.518,22.518V50.996z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M258.04,422.247h-4.08c-16.872,0-30.598,13.726-30.598,30.598c0,16.872,13.726,30.598,30.598,30.598h4.08
			c16.872,0,30.598-13.726,30.598-30.598C288.637,435.973,274.911,422.247,258.04,422.247z M258.04,463.044h-4.08
			c-5.624,0-10.199-4.575-10.199-10.199c0-5.624,4.575-10.199,10.199-10.199h4.08c5.624,0,10.199,4.575,10.199,10.199
			C268.239,458.469,263.664,463.044,258.04,463.044z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M228.234,135.649h-49.748c-5.633,0-10.199,4.567-10.199,10.199v49.748c0,5.632,4.566,10.199,10.199,10.199
			c5.633,0,10.199-4.567,10.199-10.199v-39.548h39.548c5.633,0,10.199-4.567,10.199-10.199
			C238.433,140.217,233.867,135.649,228.234,135.649z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M228.234,290.677h-39.548v-39.548c0-5.632-4.566-10.199-10.199-10.199c-5.633,0-10.199,4.567-10.199,10.199v49.748
			c0,5.632,4.566,10.199,10.199,10.199h49.748c5.633,0,10.199-4.567,10.199-10.199C238.433,295.245,233.867,290.677,228.234,290.677
			z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M333.514,135.649h-49.748c-5.633,0-10.199,4.567-10.199,10.199c0,5.632,4.566,10.199,10.199,10.199h39.548v39.548
			c0,5.632,4.566,10.199,10.199,10.199c5.633,0,10.199-4.567,10.199-10.199v-49.748
			C343.713,140.217,339.147,135.649,333.514,135.649z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M333.514,240.93c-5.633,0-10.199,4.567-10.199,10.199v39.548h-39.548c-5.633,0-10.199,4.567-10.199,10.199
			c0,5.632,4.566,10.199,10.199,10.199h49.748c5.633,0,10.199-4.567,10.199-10.199v-49.748
			C343.713,245.497,339.147,240.93,333.514,240.93z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M293.737,365.131h-7.139c-5.633,0-10.199,4.567-10.199,10.199s4.566,10.199,10.199,10.199h7.139
			c5.633,0,10.199-4.567,10.199-10.199S299.37,365.131,293.737,365.131z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M375.331,365.131h-42.837c-5.633,0-10.199,4.567-10.199,10.199s4.566,10.199,10.199,10.199h42.837
			c5.633,0,10.199-4.567,10.199-10.199S380.964,365.131,375.331,365.131z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3
                  className="text-base font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  {title}
                </h3>
                <div className="mt-2 text-sm text-gray-500">
                    {children}
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="button"
                onClick={buttonAction}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
              >
                {buttonActionTitle}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
