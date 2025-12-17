import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home"
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import AllDesign from "./pages/AllDesign"
import Contact from "./pages/contact";
import Collection from "./pages/New";
import NewCollectionPage from "./Collection";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "services", element: <Services /> },
        { path: "new", element: <Collection /> },
        { path: "alldesign", element: <AllDesign /> },
        { path: "newcollection", element: <NewCollectionPage /> },
        { path: "contact", element: <Contact /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </>
  );
}

export default App;
