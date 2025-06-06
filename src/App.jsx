import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import UnauthPage from "./pages/unauth-page";
import { useSelector } from "react-redux";
// import CheckAuth from "./components/common/check-auth";
import { useEffect } from "react";
// import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./components/shopping-view/paypal-return";
import PaypalCancelPage from "./components/shopping-view/paypal-cancel";
import PaymentSuccess from "./components/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import { setupInterceptors } from "./axiosInstance";
import store from "./store/store";
import AdminRoute from "./private/AdminRoute";
import ProtectedRoute from "./private/ProtectedRoute";
import Landing from "./components/common/landing";

function App() {
  const { isLoading } = useSelector((state) => state.auth);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  useEffect(() => {
    setupInterceptors(store);
  }, []);

  if (isLoading) return <Skeleton className="w-[800px] h-[600px] bg-black" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={<Landing/>}
        />

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <ShoppingLayout />
            </ProtectedRoute>
          }
        >
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="paypal-cancel" element={<PaypalCancelPage />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
