import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { storeApp } from "./app/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ContextProvider } from "./contexts/contextprovider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={storeApp}>
      {/* <App /> */}
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </Provider>
  </StrictMode>
);
