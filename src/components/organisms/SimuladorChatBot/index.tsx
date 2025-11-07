"use client";
import { LucideX } from "lucide-react";

interface ILink {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}
export default function SimuladorChatBot({ url, isOpen, onClose }: ILink) {
  return (
    isOpen && (
      <div className="fixed inset-0 z-[150] flex items-end justify-center  text-center sm:items-center sm:p-0 w-full ">
        <div
          className="fixed inset-0 bg-gray-400/40 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <button className="absolute top-4 right-4 text-2xl">
          <LucideX />
        </button>

        <div className="relative transform overflow-hidden rounded-lg h-full w-full bg-white md:h-auto text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          <div className="bg-white flex h-[calc(100%-74px)] md:min-h-[80vh] top-0 ">
            {url && (
              <iframe
                style={{ width: "100%" }}
                className=""
                src={url || ""}
              ></iframe>
            )}
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    )
  );
}

