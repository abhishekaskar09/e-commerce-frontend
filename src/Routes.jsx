import { createBrowserRouter } from "react-router";
import App from "./App";
import Product from "./page/product/Product";
import Cart from "./page/cart/Cart";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Checkout from "./page/Feature/Checkout";
import Payment from "./page/payment/Payment";
import OrderHistory from "./page/order/Orders";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Product /> },
      { path: '/cart', element: <Cart /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/checkout', element: <Checkout/> },
      { path: '/payment', element: <Payment/> },
      { path: '/orders', element: <OrderHistory/> },
    ]
  }
])
