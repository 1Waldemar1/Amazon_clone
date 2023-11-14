import React from "react";
import { useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../../type";
import CartPayment from "@/components/CartPayment";
import CartProduct from "@/components/CartProduct";
import ResetCart from "@/components/ResetCart";
import Link from "next/link";
import Image from "next/image";

const Favorite = () => {
  const { favoriteData } = useSelector((state: StateProps) => state.next);
  return (
    <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-5 gap-10 py-4">
      {favoriteData.length > 0 ? (
        <>
          <div className="bg-white col-span-4 p-4 rounded-lg">
            <div className="flex items-center justify-between border-b border-b-gray-400 pb-1">
              <p className="text-2xl font-semibold text-amazon_blue">
                Shopping Cart
              </p>
              <p className="text-lg font-semibold text-amazon_blue">Subtitle</p>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              {favoriteData.map((product_cart: StoreProduct) => (
                <div key={product_cart._id}>
                  <div className="flex items-center">
                    <Image
                      src={product_cart.image}
                      width={150}
                      height={150}
                      alt="favoriteImg"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-lg font-semibold mb-4">
                        {product_cart.title}
                      </h1>
                      <p>{product_cart.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white h-64 col-span-5 flex flex-col items-center justify-center py-5 rounded-lg shadow-lg">
          <h1 className="text-lg font-medium">Your favorite items is empty!</h1>
          <Link href={"/"}>
            <button className="w-52 h-10 bg-amazon_blue text-white rounded-lg text-sm font-semibold hover:bg-amazon_yellow hover:text-black">
              go to shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorite;
