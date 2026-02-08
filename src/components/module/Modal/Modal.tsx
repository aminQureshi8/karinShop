import { Fragment } from "react";

import { Transition } from "@headlessui/react";

export default function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Transition show={open} as={Fragment}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => {
            console.log("overlay clicked");
            onClose();
          }}
        />
      </Transition.Child>

      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95 translate-y-4"
        enterTo="opacity-100 scale-100 translate-y-0"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100 translate-y-0"
        leaveTo="opacity-0 scale-95 translate-y-4"
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div className="bg-white rounded-lg dark:bg-gray-800  rounded-base shadow-lg w-full max-w-md p-5 relative">
            <button
              onClick={onClose}
              className="absolute top-3 left-3 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            {children}
          </div>
        </div>
      </Transition.Child>
    </Transition>
  );
}
