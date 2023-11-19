import React from "react";
import { ProductProps } from "../../../type";
import Image from "next/image";
import { HiShoppingCart } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import FormattedPrice from "./FormattedPrice";
import { useDispatch } from "react-redux";
import { addToCart, addToFavorite } from "@/store/nextSlice";
import Link from "next/link";
import DynamicPage from "@/pages/items/[id]";

const Products = ({ productData }: any) => {
  const dispatch = useDispatch();
  return (
    <div
      className="w-full px-6 gap-6 grid grid-cols-1 md:grid-cols-2 md:gap-6
      xl:grid-cols-4 xl:gap-6"
    >
      {productData.map(
        ({
          _id,
          title,
          brand,
          category,
          description,
          image,
          isNew,
          oldPrice,
          price,
        }: ProductProps) => (
          <div
            key={_id}
            className="w-full xl:h-full bg-white text-black p-4 border border-gray-300
            rounded-lg group overflow-hidden relative"
          >
            <Link
              href={{
                pathname: `/items/${_id}`,
                query: {
                  _id: _id,
                  title: title,
                  brand: brand,
                  category: category,
                  description: description,
                  image: image,
                  isNew: isNew,
                  oldPrice: oldPrice,
                  price: price,
                  quantity: 1,
                },
              }}
            >
              <div className="w-full xl:h-[260px] relative">
                <Image
                  className="w-full h-full object-cover scale-90 hover:scale-100
                  transition-transform duration-300"
                  src={image}
                  width={300}
                  height={300}
                  alt="productImg"
                />

                {isNew && (
                  <p
                    className="absolute top-0 right-0 text-amazon_blue font-medium
                    text-xs tracking-wide animate-bounce"
                  >
                    !save <FormattedPrice amount={oldPrice - price} />
                  </p>
                )}
              </div>
              <hr />
              <div className="px-4 py-3 flex flex-col gap-1">
                <p className="text-xs text-gray-500 tracking-wide">
                  {category}
                </p>
                <p className="text-base font-medium">{title}</p>
                <p className="flex items-center gap-2">
                  <span className="text-sm line-through">
                    <FormattedPrice amount={oldPrice} />
                  </span>
                  <span className="text-amazon_blue font-semibold">
                    <FormattedPrice amount={price} />
                  </span>
                </p>
                <p className="text-xs text-gray-500 text-justify">
                  {description.substring(0, 120) + " ..."}
                </p>
              </div>
            </Link>
            <div
              className="w-12 h-24 absolute bottom-[260px] right-0 border border-gray-400
                bg-white rounded-md flex flex-col translate-x-20 group-hover:-translate-x-4
                  transition-transform duration-300"
            >
              <span
                onClick={() =>
                  dispatch(
                    addToCart({
                      _id: _id,
                      brand: brand,
                      category: category,
                      description: description,
                      image: image,
                      isNew: isNew,
                      oldPrice: oldPrice,
                      price: price,
                      title: title,
                      quantity: 1,
                    })
                  )
                }
                className="w-full h-full border-b border-b-gray-400
                    flex items-center justify-center text-xl bg-transparent
                   hover:bg-amazon_yellow cursor-pointer duration-300"
              >
                <HiShoppingCart />
              </span>
              <span
                onClick={() =>
                  dispatch(
                    addToFavorite({
                      _id: _id,
                      brand: brand,
                      category: category,
                      description: description,
                      image: image,
                      isNew: isNew,
                      oldPrice: oldPrice,
                      price: price,
                      title: title,
                      quantity: 1,
                    })
                  )
                }
                className="w-full h-full border-b border-b-gray-400
                    flex items-center justify-center text-xl bg-transparent
                   hover:bg-amazon_yellow cursor-pointer duration-300"
              >
                <FaHeart />
              </span>
            </div>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: _id,
                    brand: brand,
                    category: category,
                    description: description,
                    image: image,
                    isNew: isNew,
                    oldPrice: oldPrice,
                    price: price,
                    title: title,
                    quantity: 1,
                  })
                )
              }
              className="h-10 w-full font-medium bg-amazon_blue text-white rounded-md
              hover:bg-amazon_yellow hover:text-black duration-300 mt-2"
            >
              add to cart
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Products;
