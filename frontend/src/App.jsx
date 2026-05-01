import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import AppLayout from "./Components/AppLayout";
import Deals from "./Pages/Deals";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart";


function App() {
  // Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "deals",
        element: <Deals />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path:"profile",
        element:<Profile/>
      },
      {
        path:"/cart",
        element:<Cart/>
      }
    ],
  },
]);

  return (
    <>
      <RouterProvider router={router} />
      
    </>
  );
}

export default App;
