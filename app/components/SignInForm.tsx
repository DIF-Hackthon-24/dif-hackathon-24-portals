import React from "react";
import PhoneSVG from "../atoms/PhoneSVG";

interface SignInFromProps {
  buttonAction: () => void;
}

const SignInForm: React.FC<SignInFromProps> = ({ buttonAction }) => {
  return (
    <div className="mt-10 w-4/5">
      <p className="mt-2 text-sm leading-6 text-gray-500">
        Not a member?{" "}
        <a href="#" className="font-semibold text-cyan-600 hover:text-cyan-500">
          Sign up now
        </a>
      </p>
      <div>
        <form action="#" method="POST" className="space-y-6">
          <div className="relative -space-y-px rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
            <div>
              <label htmlFor="email-address" className="sr-onlapp/pages/index.tsxy">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email address"
                autoComplete="email"
                className="px-2 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                autoComplete="current-password"
                className="px-2 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm leading-6 text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm leading-6">
              <a
                href="#"
                className="font-semibold text-cyan-600 hover:text-cyan-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-2 ring-inset ring-cyan-500 hover:bg-gray-50 focus-visible:ring-transparent"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center"
          >
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-white px-6 text-gray-900">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 justify-center flex items-center gap-x-6">
          <button
            className="rounded-3xl bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 flex justify-center items-center flex-col"
            onClick={buttonAction}
          >
            <div className="mb-3 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-700">
              <PhoneSVG color="#FFFFFF"/>
            </div>
            Passwordless Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
