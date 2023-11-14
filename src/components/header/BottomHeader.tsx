import { LuMenu } from "react-icons/lu";
import { signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import { StateProps } from "../../../type";

const BottomHeader = () => {
  const { userInfo } = useSelector((state: StateProps) => state.next);

  return (
    <div
      className="w-full h-10 bg-amazon_light text-sm text-white px-4 flex
      items-center"
    >
      <p
        className="flex items-center gap-1 px-2 h-8 border border-transparent
        hover:border-white cursor-pointer duration-300"
      >
        <LuMenu className="text-xl " /> All
      </p>
      <p
        className="hidden md:inline-flex items-center px-2 h-8 border border-transparent
        hover:border-white cursor-pointer duration-300"
      >
        Today's Deals
      </p>
      <p
        className="hidden md:inline-flex items-center px-2 h-8 border border-transparent
        hover:border-white cursor-pointer duration-300"
      >
        Registry
      </p>
      <p
        className="hidden md:inline-flex items-center px-2 h-8 border border-transparent
        hover:border-white cursor-pointer duration-300"
      >
        Customer Service
      </p>
      <p
        className="hidden md:inline-flex items-center px-2 h-8 border border-transparent
        hover:border-white cursor-pointer duration-300"
      >
        Gift Cards
      </p>
      <p
        className="hidden md:inline-flex items-center px-2 h-8 border border-transparent
        hover:border-white cursor-pointer duration-300"
      >
        Sell
      </p>
      {userInfo && (
        <button
          onClick={() => signOut()}
          className="hidden md:inline-flex items-center px-2 h-8 border border-transparent
        hover:border-red-600 hover:text-red-400 text-amazon_yellow cursor-pointer duration-300"
        >
          Sign out
        </button>
      )}
    </div>
  );
};

export default BottomHeader;
