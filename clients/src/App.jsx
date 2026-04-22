import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { router } from "./router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
}

export default App;
