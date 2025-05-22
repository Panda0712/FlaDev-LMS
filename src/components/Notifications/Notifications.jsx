import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addNotifications,
  deleteNotificationAPI,
  fetchNotificationsAPI,
  selectCurrentNotifications,
  updateNotificationAPI,
} from "~/redux/notificationsSlice";
import { socketIoInstance } from "~/socketClient";

const Notifications = () => {
  const [openNotification, setOpenNotification] = useState(false);
  const [newNotifications, setNewNotifications] = useState(false);

  const currentNotifications = useSelector(selectCurrentNotifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleOpenNotification = () => setOpenNotification(!openNotification);

  useEffect(() => {
    dispatch(fetchNotificationsAPI());

    const onReceiveNewNotification = (notification) => {
      if (typeof notification === "string")
        dispatch(deleteNotificationAPI(notification));
      else if (notification?.updated) {
        delete notification.updated;
        dispatch(
          updateNotificationAPI({
            notificationId: String(notification.payload._id),
            updateData: notification.payload,
          })
        );
      } else {
        dispatch(addNotifications(notification));
        setNewNotifications(true);
      }
    };

    socketIoInstance.on("BE_SEND_NOTIFICATION", onReceiveNewNotification);

    return () => {
      socketIoInstance.off("BE_SEND_NOTIFICATION", onReceiveNewNotification);
    };
  }, [dispatch]);

  return (
    <div
      className="mx-6 cursor-pointer relative"
      onClick={() => {
        toggleOpenNotification();
        setNewNotifications(false);
      }}
    >
      <Bell
        size={24}
        className={`${
          newNotifications && currentNotifications?.length
            ? "fill-yellow-300"
            : ""
        }`}
      />

      {newNotifications && currentNotifications?.length ? (
        <div className="absolute top-[-1px] right-0 w-2 h-2 bg-green-400 rounded-full border-slate-100"></div>
      ) : null}

      {openNotification && (
        <div
          className="absolute max-[900px]:left-0 right-0 mt-2 w-80 max-h-96 overflow-auto 
        overflow-x-hidden rounded-md bg-white shadow-lg border border-slate-300 z-50"
        >
          <div className="p-4">
            {currentNotifications?.length > 0 ? (
              currentNotifications.map((notify, index) => (
                <div
                  key={index}
                  onClick={() => navigate("/notifications")}
                  className={`flex items-center gap-3 mb-3 hover:bg-slate-100 p-2 rounded-md ${
                    index < currentNotifications.length - 1 &&
                    "border-b border-slate-300"
                  }`}
                >
                  <img
                    src={notify.images}
                    className="w-24 h-16 object-cover rounded-md border border-slate-200"
                    alt=""
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold max-w-[150px] truncate">
                      {notify.name}
                    </p>
                    <span
                      className="text-xs text-gray-600 max-w-[150px] truncate"
                      title={notify.message}
                    >
                      {notify.message}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-sm text-gray-500">
                Chưa có thông báo mới nào!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
