import React, { useEffect, useState } from "react";
import Image from "next/image";
import error_img from "../../images/error_img.jpg";
import FormattedPrice from "@/components/products/FormattedPrice";
import { addToCart, addToFavorite } from "@/store/nextSlice";
import { useRouter } from "next/router";
import { FaHeart } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { ProductProps, StateProps, StoreProduct } from "../../../type";
import Link from "next/link";

type Product = {
  _id?: number;
  title?: string;
  brand?: string;
  category?: string;
  description?: string;
  image?: string;
  isNew?: boolean;
  oldPrice?: number;
  price?: number;
  quantity?: number;
};

const DynamicPage = () => {
  const [product, setProduct] = useState<Product>({});
  const [isLoading, setIsLoading] = useState(true);
  const { allProducts } = useSelector((state: StateProps) => state.next);
  const router = useRouter();
  const dispatch = useDispatch();
  const filteredProducts = allProducts.filter(
    (items: StoreProduct) =>
      items.category === product.category && items.title !== product.title
  );
  const handleProductClick = (item: ProductProps) => {
    setIsLoading(true);
    router.push({
      pathname: `/items/${item._id}`,
      query: {
        _id: item._id,
        title: item.title,
        brand: item.brand,
        category: item.category,
        description: item.description,
        image: item.image,
        isNew: item.isNew,
        oldPrice: item.oldPrice,
        price: item.price,
      },
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    if (router.query._id) {
      setProduct({
        _id: Number(router.query._id),
        title: router.query.title as string,
        brand: router.query.brand as string,
        category: router.query.category as string,
        description: router.query.description as string,
        image: router.query.image as string,
        isNew: Boolean(router.query.isNew),
        oldPrice: Number(router.query.oldPrice),
        price: Number(router.query.price),
        quantity: Number(router.query.quantity),
      });
    }
  }, [router.query]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-4 md:py-10">
      {isLoading ? (
        <div className="w-full flex flex-col gap-6 items-center justify-center py-20">
          <p>Your product is loading...</p>
          <BeatLoader color="#131921" size={40} />
        </div>
      ) : (
        <div>
          <div className="w-full grid md:grid-cols-3 gap-3 rounded-lg">
            <div className="flex items-center justify-center bg-gray-200 rounded-lg relative group overflow-hidden">
              <Image
                src={product.image || error_img}
                alt="product image"
                width={500}
                height={500}
              />
              <div className="w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:-translate-x-2 transition-transform duration-300">
                <span
                  onClick={() =>
                    dispatch(
                      addToCart({
                        _id: product._id,
                        brand: product.brand,
                        category: product.category,
                        description: product.description,
                        image: product.image,
                        isNew: product.isNew,
                        oldPrice: product.oldPrice,
                        price: product.price,
                        title: product.title,
                        quantity: 1,
                      })
                    )
                  }
                  className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
                >
                  <HiShoppingCart />
                </span>
                <span
                  onClick={() =>
                    dispatch(
                      addToFavorite({
                        _id: product._id,
                        brand: product.brand,
                        category: product.category,
                        description: product.description,
                        image: product.image,
                        isNew: product.isNew,
                        oldPrice: product.oldPrice,
                        price: product.price,
                        title: product.title,
                        quantity: 1,
                      })
                    )
                  }
                  className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
                >
                  <FaHeart />
                </span>
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-3 justify-center p-4">
              <p className="text-xs md:text-sm text-amazon_blue font-semibold -mb-3">
                {product.category}_{product.brand}
              </p>
              <h1 className="text-xl md:text-3xl tracking-wide font-semibold">
                {product.title}
              </h1>
              <p className="text-sm text-gray-600">{product.description}</p>
              <div>
                <p className="text-base text-gray-600 flex items-center gap-1">
                  Price:
                  <span className="text-lg text-amazon_blue font-semibold">
                    <FormattedPrice amount={product.price || 0} />
                  </span>
                  <span className="ml-1 line-through">
                    <FormattedPrice amount={product.oldPrice || 0} />
                  </span>
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  Your saved:{" "}
                  <span>
                    <FormattedPrice
                      amount={(product.oldPrice || 0) - (product.price || 0)}
                    />
                  </span>
                </p>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          _id: product._id,
                          brand: product.brand,
                          category: product.category,
                          description: product.description,
                          image: product.image,
                          isNew: product.isNew,
                          oldPrice: product.oldPrice,
                          price: product.price,
                          title: product.title,
                          quantity: 1,
                        })
                      )
                    }
                    className="w-full md:w-96 h-12 bg-amazon_blue text-gray-200
                  hover:bg-amazon_yellow hover:text-amazon_blue duration-300 rounded-lg mt-5
                    text-base font-semibold"
                  >
                    add to cart
                  </button>
                  <span
                    onClick={() =>
                      dispatch(
                        addToFavorite({
                          _id: product._id,
                          brand: product.brand,
                          category: product.category,
                          description: product.description,
                          image: product.image,
                          isNew: product.isNew,
                          oldPrice: product.oldPrice,
                          price: product.price,
                          title: product.title,
                          quantity: 1,
                        })
                      )
                    }
                    className="w-12 h-12 mt-5 border rounded-lg border-gray-400 flex items-center
                    justify-center text-xl bg-transparent hover:bg-amazon_yellow
                    cursor-pointer duration-300"
                  >
                    <FaHeart />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <div className="flex flex-col">
              {filteredProducts.length > 0 && (
                <h1 className="text-xl md:text-3xl tracking-wide font-semibold">
                  Similar products
                </h1>
              )}
              <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
                {filteredProducts.slice(0, 4).map((item: ProductProps) => (
                  <div
                    key={item._id}
                    className="w-full mt-6 bg-white text-black p-4 border border-gray-300
                    rounded-lg group overflow-hidden relative"
                  >
                    <Link
                      onClick={() => handleProductClick(item)}
                      href={{
                        pathname: `/items/${item._id}`,
                        query: {
                          _id: item._id,
                          title: item.title,
                          brand: item.brand,
                          category: item.category,
                          description: item.description,
                          image: item.image,
                          isNew: item.isNew,
                          oldPrice: item.oldPrice,
                          price: item.price,
                        },
                      }}
                    >
                      <div className="w-full relative">
                        <Image
                          className="w-full h-full object-cover scale-90 hover:scale-100
                          transition-transform duration-300"
                          src={item.image}
                          width={300}
                          height={300}
                          alt="productImg"
                        />
                      </div>
                      <hr />
                      <div className="px-4 py-3 flex flex-col gap-1">
                        <p className="text-xs text-gray-500 tracking-wide">
                          {item.brand}
                        </p>
                        <p className="text-base font-medium h-14">
                          {item.title}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-sm line-through">
                            <FormattedPrice amount={item.oldPrice} />
                          </span>
                          <span className="text-amazon_blue font-semibold">
                            <FormattedPrice amount={item.price} />
                          </span>
                        </p>
                      </div>
                    </Link>
                    <div
                      className="w-8 h-16 absolute top-[140px] right-2 border border-gray-400
                        bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0
                          transition-transform duration-300"
                    >
                      <span
                        onClick={() =>
                          dispatch(
                            addToCart({
                              _id: item._id,
                              title: item.title,
                              brand: item.brand,
                              category: item.category,
                              description: item.description,
                              image: item.image,
                              isNew: item.isNew,
                              oldPrice: item.oldPrice,
                              price: item.price,
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
                              _id: item._id,
                              title: item.title,
                              brand: item.brand,
                              category: item.category,
                              description: item.description,
                              image: item.image,
                              isNew: item.isNew,
                              oldPrice: item.oldPrice,
                              price: item.price,
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
                            _id: item._id,
                            title: item.title,
                            brand: item.brand,
                            category: item.category,
                            description: item.description,
                            image: item.image,
                            isNew: item.isNew,
                            oldPrice: item.oldPrice,
                            price: item.price,
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
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicPage;
