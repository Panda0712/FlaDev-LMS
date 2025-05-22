import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "~/apis/api";
import { API_ROOT } from "~/utils/constants";

const initialState = {
  currentNotifications: null,
  totalNotifications: 0,
};

export const fetchNotificationsAPI = createAsyncThunk(
  "notifications/fetchNotificationsAPI",
  async (searchPath = "") => {
    const res = await api.get(`${API_ROOT}/v1/notifications${searchPath}`);
    return res.data;
  }
);

export const updateNotificationAPI = createAsyncThunk(
  "notifications/updateNotificationAPI",
  async ({ notificationId, updateData }) => {
    const res = await api.put(
      `${API_ROOT}/v1/notifications/${notificationId}`,
      updateData
    );
    return res.data;
  }
);

export const deleteNotificationAPI = createAsyncThunk(
  "notifications/deleteNotificationAPI",
  async (notificationId) => {
    const res = await api.delete(
      `${API_ROOT}/v1/notifications/${notificationId}`
    );
    return res.data;
  }
);

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null;
      state.totalNotifications = 0;
    },
    addNotifications: (state, action) => {
      const incomingNotification = action.payload;

      state.currentNotifications.unshift(incomingNotification);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotificationsAPI.fulfilled, (state, action) => {
      let incomingNotifications = action.payload.notifications;
      const totalNotifications = action.payload.totalNotifications;

      state.currentNotifications = Array.isArray(incomingNotifications)
        ? incomingNotifications.reverse()
        : [];
      state.totalNotifications = totalNotifications;
    });
    builder.addCase(updateNotificationAPI.fulfilled, (state, action) => {
      const incomingNotification = action.payload;

      const updatedNotification = state.currentNotifications.map((i) =>
        i._id === incomingNotification._id ? incomingNotification : i
      );
      state.currentNotifications = updatedNotification;
    });
    builder.addCase(deleteNotificationAPI.fulfilled, (state, action) => {
      const deleteId = action.meta.arg;

      const updatedNotification = state.currentNotifications.filter(
        (i) => i._id !== deleteId
      );
      state.currentNotifications = updatedNotification;
    });
  },
});

export const { clearCurrentNotifications, addNotifications } =
  notificationsSlice.actions;

export const selectCurrentNotifications = (state) => {
  return state.notifications.currentNotifications;
};

export const selectTotalNotifications = (state) => {
  return state.notifications.totalNotifications;
};

export const notificationsReducer = notificationsSlice.reducer;
