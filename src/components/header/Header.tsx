import Image from "next/image";
import logo from "../../images/logo.png";
import cart from "../../images/cartIcon.png";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineSearch } from "react-icons/hi";
import { BiCaretDown } from "react-icons/bi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../../../type";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { addUser, removeUser } from "@/store/nextSlice";
import FormattedPrice from "../products/FormattedPrice";

type PopupClick = MouseEvent & {
  path: Node[];
};

const Header = () => {
  const { data: session } = useSession();
  const { productData, favoriteData, userInfo, allProducts } = useSelector(
    (state: StateProps) => state.next
  );
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [activeModal, setActiveModal] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const filteredProducts = allProducts.filter(
    (items: StoreProduct) =>
      items.title.toLowerCase().includes(search.toLowerCase()) ||
      items.brand.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;

      const path = _event.path || (event.composedPath && event.composedPath());

      if (sortRef.current && !(path && path.includes(sortRef.current))) {
        setActiveModal(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session.user?.name,
          email: session.user?.email,
          image: session.user?.image,
        })
      );
    } else {
      dispatch(removeUser(userInfo));
    }
  }, [session]);

  return (
    <div className="w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-30">
      <div
        className="h-full w-full mx-auto inline-flex items-center justify-between gap-1
        mdl:gap-3 px-4"
      >
        <Link
          href={"/"}
          className="px-2 border border-transparent hover:border-white cursor-pointer
          duration-300 flex items-center justify-center h-[70%]"
        >
          <Image className="w-28 object-cover mt-1" src={logo} alt="logo" />
        </Link>
        <div
          className="px-2 border border-transparent hover:border-white cursor-pointer
          duration-300 items-center justify-center h-[70%] flex xl:inline-flex gap-1"
        >
          <SlLocationPin />
          <div className="text-xs">
            <p>Delivery to</p>
            <p className="text-white font-bold uppercase">rus</p>
          </div>
        </div>
        <div
          ref={sortRef}
          className="flex-1 h-10 hidden mdl:inline-flex items-center justify-between
          relative"
        >
          <input
            className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black
            border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"
            type="text"
            onClick={() => setActiveModal(!activeModal)}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a products"
          />
          <span
            className="w-12 h-full bg-amazon_yellow text-black text-2xl flex
            justify-center items-center absolute right-0 rounded-tr-md rounded-br-md"
          >
            <HiOutlineSearch />
          </span>
          {activeModal && search && filteredProducts.length > 0 && (
            <div
              className="absolute rounded-lg top-[46px] w-full bg-white
            text-amazon_blue border border-gray-300"
            >
              {filteredProducts.slice(0, 6).map((product: StoreProduct) => (
                <Link
                  key={product._id}
                  onClick={() => setSearch("")}
                  className="flex flex-col p-2
                  first:rounded-lg last:rounded-lg cursor-pointer"
                  href={{
                    pathname: `/items/${product._id}`,
                    query: {
                      ...product,
                    },
                  }}
                >
                  <div
                    className="flex justify-between items-center px-2 hover:bg-gray-100
                    rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={product.image}
                        width={60}
                        height={60}
                        alt="productImg"
                      />
                      <p className=" text-base font-medium">{product.title}</p>
                    </div>
                    <div className="text-amazon_blue font-semibold">
                      <FormattedPrice amount={product.price} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        {userInfo ? (
          <div
            className="flex items-center px-2 border border-transparent
            hover:border-white gap-1 cursor-pointer duration-300 h-[70%]"
          >
            <Image
              className="w-8 h-8 rounded-full object-cover"
              src={userInfo.image}
              width={25}
              height={25}
              alt="userImg"
            />
            <div className="text-xs text-gray-100 flex flex-col justify-between">
              <p className="text-white font-bold">{userInfo.name}</p>
              <p>{userInfo.email}</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => signIn()}
            className="text-xs text-gray-100 flex flex-col justify-center px-2 border
            border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
          >
            <p>Hello, sign in</p>
            <p className="text-white font-bold flex items-center">
              Account & Lists{" "}
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        )}
        <Link
          href={"/favorite"}
          className="text-xs text-gray-100 flex flex-col justify-center px-2 border
          border-transparent hover:border-white cursor-pointer duration-300
          h-[70%] relative"
        >
          <p>Marked</p>
          <p className="text-white font-bold">& Favorite</p>
          {favoriteData.length > 0 && (
            <span
              className="absolute right-2 top-2 w-4 h-4 border
              border-gray-400 flex justify-center
              items-center text-xs text-amazon_yellow"
            >
              {favoriteData.length}
            </span>
          )}
        </Link>
        <Link
          href={"/cart"}
          className="flex items-center p-2 border border-transparent hover:border-white
          cursor-pointer duration-300 h-[70%] relative"
        >
          <Image className="w-auto object-cover h-8" src={cart} alt="cart" />
          <p className="text-xs text-white font-bold mt-3">Cart</p>
          <span
            className=" absolute text-amazon_yellow text-sm top-2
            left-[29px] font-semibold"
          >
            {productData ? productData.length : 0}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
