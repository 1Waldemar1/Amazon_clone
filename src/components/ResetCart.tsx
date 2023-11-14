import { closeModal, openModal } from "@/store/modalSlice";
import { resetCart } from "@/store/nextSlice";
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ResetCart = () => {
  const isOpen = useSelector((state: RootState) => state.popup.isOpen);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleResetCart = () => {
    dispatch(closeModal());
    dispatch(resetCart());
  };

  const handleOverlayClick = (event: any) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

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
