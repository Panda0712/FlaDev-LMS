import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavigationText from "~/components/NavigationText/NavigationText";
import { selectCurrentNotifications } from "~/redux/notificationsSlice";

const Notifications = () => {
  const currentNotifications = useSelector(selectCurrentNotifications);
  const navigate = useNavigate();

  return (
    <>
      <NavigationText placeTo="Danh sách thông báo" />
      <div className="mx-6 cursor-pointer relative">
        <p
          className="lg:text-[32px] md:text-[28px] text-[24px] 
        font-semibold text-center mt-6 mb-8"
        >
          Thông báo
        </p>
        <div
          className="overflow-auto my-24
        overflow-x-hidden rounded-md bg-white shadow-lg border border-slate-300 z-50"
        >
          <div className="p-4">
            {currentNotifications?.length > 0 ? (
              currentNotifications.map((notify, index) => (
                <div
                  key={index}
                  onClick={() => navigate("/notifications")}
                  className={`flex max-[450px]:flex-wrap items-center 
                    max-[450px]:gap-8 gap-5 mb-3 hover:bg-slate-100 p-2 rounded-md ${
                      index < currentNotifications.length - 1 &&
                      "border-b border-slate-300"
                    }`}
                >
                  <img
                    src={notify.images}
                    className="md:w-[300px] md:h-[200px] w-[200px] h-[150px]
                     object-cover rounded-md border border-slate-200"
                    alt=""
                  />
                  <div className="flex flex-col gap-1">
                    <p className="lg:text-xl md:text-[18px] text-[16px] font-semibold">
                      {notify.name}
                    </p>
                    <span
                      className="md:text-lg text-[14px] text-gray-600"
                      title={notify.message}
                    >
                      {notify.message}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="text-center lg:text-xl 
              md:text-[18px] text-[16px] text-gray-500"
              >
                Chưa có thông báo mới nào!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
