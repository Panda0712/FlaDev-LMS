import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavigationText from "~/components/NavigationText/NavigationText";
import { selectCurrentNotifications } from "~/redux/notificationsSlice";

const Notifications = () => {
  const currentNotifications = useSelector(selectCurrentNotifications);
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     dispatch(fetchNotificationsAPI());

  //     const onReceiveNewNotification = (notification) => {
  //       if (typeof notification === "string")
  //         dispatch(deleteNotificationAPI(notification));
  //       else if (notification?.updated) {
  //         delete notification.updated;
  //         dispatch(
  //           updateNotificationAPI({
  //             notificationId: String(notification.payload._id),
  //             updateData: notification.payload,
  //           })
  //         );
  //       } else {
  //         dispatch(addNotifications(notification));
  //       }
  //     };

  //     socketIoInstance.on("BE_SEND_NOTIFICATION", onReceiveNewNotification);

  //     return () => {
  //       socketIoInstance.off("BE_SEND_NOTIFICATION", onReceiveNewNotification);
  //     };
  //   }, [dispatch]);

  return (
    <>
      <NavigationText placeTo="Danh sách thông báo" />
      <div className="mx-6 cursor-pointer relative">
        <p className="text-[32px] font-semibold text-center mt-6 mb-8">
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
                  className={`flex items-center gap-5 mb-3 hover:bg-slate-100 p-2 rounded-md ${
                    index < currentNotifications.length - 1 &&
                    "border-b border-slate-300"
                  }`}
                >
                  <img
                    src={notify.images}
                    className="w-[300px] h-[200px] object-cover rounded-md border border-slate-200"
                    alt=""
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-xl font-semibold truncate">
                      {notify.name}
                    </p>
                    <span
                      className="text-lg text-gray-600 truncate"
                      title={notify.message}
                    >
                      {notify.message}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-xl text-gray-500">
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
