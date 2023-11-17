import { closeModal, openModal } from "@/store/modalSlice";
import { resetCart } from "@/store/nextSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ResetCart = () => {
  const isOpen = useSelector((state: RootState) => state.popup.isOpen);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    if (typeof window !== "undefined") {
      document.body.style.overflow = "";
    }
  };

  const handleResetCart = () => {
    dispatch(closeModal());
    dispatch(resetCart());

    if (typeof window !== "undefined") {
      document.body.style.overflow = "";
    }
  };

  const handleOverlayClick = (event: any) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const handleRouteChange = () => {
      if (isOpen) {
        handleCloseModal();
      }
    };

    const handleRouteComplete = () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    router.events.on("routeChangeComplete", handleRouteComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);

      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="w-44 h-10 font-semibold bg-gray-200 rounded-lg
      hover:bg-red-600 hover:text-white duration-300"
      >
        reset cart
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center
          justify-center z-40 overflow-hidden"
          onClick={handleOverlayClick}
        >
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h1 className="font-semibold text-lg">Reset Cart</h1>
            <p className="my-2">
              Are you sure to reset your items from the cart?
            </p>
            <div className="flex gap-5 justify-end">
              <button
                className="py-2 px-7 rounded-lg bg-amazon_yellow
                text-amazon_blue hover:shadow-md"
                onClick={handleResetCart}
              >
                OK
              </button>
              <button
                className="text-amazon_blue hover:text-red-500 transition-transform duration-300"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetCart;
