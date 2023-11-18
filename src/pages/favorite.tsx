import { useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../../type";
import Link from "next/link";
import FavoriteProduct from "@/components/favorite/FavoriteProduct";
import ResetFavoriteItems from "@/components/favorite/ResetFavoriteItems";

const Favorite = () => {
  const { favoriteData } = useSelector((state: StateProps) => state.next);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 gap-10 py-4">
      {favoriteData.length > 0 ? (
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">
            <p className="text-2xl font-semibold text-amazon_blue">
              Favorte Items
            </p>
            <p className="text-lg font-semibold text-amazon_blue">Action</p>
          </div>
          <div>
            {favoriteData.map((product: StoreProduct) => (
              <div key={product._id} className="mt-2">
                <FavoriteProduct item={product} />
              </div>
            ))}
            <ResetFavoriteItems />
          </div>
        </div>
      ) : (
        <div className="bg-white h-96 col-span-5 flex flex-col items-center justify-center py-5 rounded-lg shadow-lg">
          <h1 className="text-lg font-medium mb-3">
            Nothing is available in the Favorite list
          </h1>
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
