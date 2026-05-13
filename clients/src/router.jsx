import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

// PROTECTED ROUTE
import AuthRedirect from "./user/routes/AuthRedirect";
import ProtectedRoute from "./user/routes/ProtectedRoute";

// USER
const UserLayout = React.lazy(() => import("./layouts/UserLayout"));

const Home = React.lazy(() => import("./user/pages/Home"));
const Services = React.lazy(() => import("./user/pages/Services"));
const Store = React.lazy(() => import("./user/pages/Store"));
const Collections = React.lazy(() => import("./user/pages/Collection"));
const Contact = React.lazy(() => import("./user/pages/Contact"));
const Category = React.lazy(() => import("./user/pages/Category"));
const Quotes = React.lazy(() => import("./user/pages/Quotes"));
const Auth = React.lazy(() => import("./user/pages/Auth"));
const Dashboard = React.lazy(() => import("./user/pages/Dashboard"));
const Cart = React.lazy(() => import("./user/pages/Cart"));
const NotFound = React.lazy(() => import("./user/pages/NotFound"));
const CategoryDetail = React.lazy(() => import("./user/pages/CategoryDetail"));
const Payment = React.lazy(() => import("./user/pages/Payment"));
const OrderSuccess = React.lazy(() => import("./user/pages/OrderSuccess"));
const Checkout = React.lazy(() => import("./user/pages/Checkout"));
const UserProductView = React.lazy(
  () => import("./user/pages/UserProductView"),
);

// ADMIN
const AdminLayout = React.lazy(() => import("./layouts/AdminLayout"));

const AdminDashboard = React.lazy(() => import("./admin/pages/AdminDashboard"));
const Orders = React.lazy(() => import("./admin/pages/Orders"));
const Products = React.lazy(() => import("./admin/pages/Products"));
const Login = React.lazy(() => import("./admin/pages/Login"));
const ProductView = React.lazy(() => import("./admin/pages/ProductView"));
const NotifyEmails = React.lazy(() => import("./admin/pages/NotifyEmails"));
const QuoteRequests = React.lazy(() => import("./admin/pages/QuoteRequests"));
const AdminUsers = React.lazy(() => import("./admin/pages/User"));
const Coupons = React.lazy(() => import("./admin/pages/Coupon"));

import SpinnerLoader from "./user/components/SpinnerLoader";

const wrap = (element) => (
  <Suspense fallback={<SpinnerLoader />}>{element}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: wrap(<UserLayout />),
    errorElement: wrap(<NotFound />),
    children: [
      { index: true, element: wrap(<Home />) },
      { path: "services", element: wrap(<Services />) },
      { path: "store", element: wrap(<Store />) },
      { path: "collection", element: wrap(<Collections />) },
      { path: "category", element: wrap(<Category />) },
      { path: "category/:slug", element: wrap(<CategoryDetail />) },
      { path: "quote", element: wrap(<Quotes />) },
      { path: "contact", element: wrap(<Contact />) },
      { path: "store/:id", element: wrap(<UserProductView />) },

      {
        path: "auth",
        element: wrap(
          <AuthRedirect>
            <Auth />
          </AuthRedirect>,
        ),
      },

      {
        path: "dashboard",
        element: wrap(
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>,
        ),
      },

      {
        path: "cart",
        element: wrap(
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>,
        ),
      },

      {
        path: "checkout",
        element: wrap(
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>,
        ),
      },

      {
        path: "checkout/payment",
        element: wrap(
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>,
        ),
      },

      {
        path: "order-success",
        element: wrap(<OrderSuccess />),
      },

      { path: "*", element: wrap(<NotFound />) },
    ],
  },

  {
    path: "/admin",
    element: wrap(
      <ProtectedRoute adminOnly>
        <AdminLayout />
      </ProtectedRoute>,
    ),
    children: [
      { index: true, element: wrap(<AdminDashboard />) },
      { path: "orders", element: wrap(<Orders />) },
      { path: "products", element: wrap(<Products />) },
      { path: "products/:id", element: wrap(<ProductView />) },
      { path: "notify", element: wrap(<NotifyEmails />) },
      { path: "users", element: wrap(<AdminUsers />) },
      { path: "quote", element: wrap(<QuoteRequests />) },
      { path: "coupon", element: wrap(<Coupons />) },
    ],
  },

  {
    path: "/admin/login",
    element: wrap(<Login />),
  },
]);
