import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchWishlist } from "~/apis/endpoints";
import Loading from "~/components/Loading/Loading";
import NavigationText from "~/components/NavigationText/NavigationText";
import WishlistCard from "~/components/WishlistCard/WishlistCard";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAfterDelete = () => {
    setLoading(true);
    fetchWishlist()
      .then(handleSetData)
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      })
      .finally(() => setLoading(false));
  };

  const handleSetData = (res) => {
    setWishlist(res || []);
  };

  useEffect(() => {
    setLoading(true);
    fetchWishlist()
      .then((res) => {
        setWishlist(res || []);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <section>
      <NavigationText placeTo="Wishlist" />
      <div className="lg:px-28 md:px-24 sm:px-18 px-12 pt-[32px] pb-[90px] relative">
        <h3 className="lg:text-[32px] md:text-[28px] text-[24px] font-semibold mb-1">
          Wishlist
        </h3>
        <p className="mb-[24px] font-medium text-[#555555]">
          {wishlist?.length || 0} khóa học trong wishlist
        </p>

        <div className="flex justify-between gap-12">
          {wishlist?.length > 0 ? (
            <div className="flex flex-col gap-5 basis-[calc(70%-24px)] max-lg:basis-[100%]">
              {wishlist.map((wishlistItem, index) => (
                <WishlistCard
                  key={index}
                  handleAfterDelete={handleAfterDelete}
                  wishlistItem={wishlistItem}
                />
              ))}
            </div>
          ) : (
            <h4 className="md:text-[24px] text-[20px] font-medium text-center">
              Chưa có khóa học nào trong wishlist!
            </h4>
          )}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
