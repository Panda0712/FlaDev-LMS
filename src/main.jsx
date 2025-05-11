import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer position="top-right" theme="colored" />
  </StrictMode>
);
