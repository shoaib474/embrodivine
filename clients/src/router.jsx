import { createBrowserRouter } from "react-router-dom";

// PROTECTED ROUTE
import AuthRedirect from "./user/routes/AuthRedirect";
import ProtectedRoute from "./user/routes/ProtectedRoute";

// USER
import UserLayout from "./layouts/UserLayout";
import Home from "./user/pages/Home";
import Services from "./user/pages/Services";
import Store from "./user/pages/Store";
import Collections from "./user/pages/Collection";
import Contact from "./user/pages/Contact";
import Category from "./user/pages/Category";
import Quotes from "./user/pages/Quotes";
import Auth from "./user/pages/Auth";
import Dashboard from "./user/pages/Dashboard";
import Cart from "./user/pages/Cart";
import NotFound from "./user/pages/NotFound";
import CategoryDetail from "./user/pages/CategoryDetail";
import Payment from "./user/pages/Payment";
import OrderSuccess from "./user/pages/OrderSuccess";

// ADMIN
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import Orders from "./admin/pages/Orders";
import Products from "./admin/pages/Products";
import Login from "./admin/pages/Login";
import Checkout from "./user/pages/Checkout";
import ProductView from "./admin/pages/ProductView";
import UserProductView from "./user/pages/UserProductView";
import NotifyEmails from "./admin/pages/NotifyEmails";
import QuoteRequests from "./admin/pages/QuoteRequests";
import AdminUsers from "./admin/pages/User";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "store", element: <Store /> },
      { path: "collection", element: <Collections /> },
      { path: "category", element: <Category /> },
      { path: "category/:slug", element: <CategoryDetail /> },
      { path: "quote", element: <Quotes /> },
      { path: "contact", element: <Contact /> },
      { path: "/store/:id", element: <UserProductView /> },

      // prevent already logged-in user from visiting auth page
      {
        path: "auth",
        element: (
          <AuthRedirect>
            <Auth />
          </AuthRedirect>
        ),
      },

      // USER DASHBOARD (Protected)
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      // Cart requires user login
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },

      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },

      {
        path: "/checkout/payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },

      {
        path: "/order-success",
        element: <OrderSuccess />,
      },

      { path: "*", element: <NotFound /> },
    ],
  },

  // ADMIN ROUTES
  {
    path: "/admin",
    element: (
      <ProtectedRoute adminOnly={true}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "orders", element: <Orders /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductView /> },
      { path: "notify", element: <NotifyEmails /> },
      { path: "users", element: <AdminUsers /> },
      { path: "quote", element: <QuoteRequests /> },
    ],
  },

  { path: "/admin/login", element: <Login /> },
]);
