import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import ErrorPage from "./pages/Error";
import AboutPage from "./pages/About";
import ProfileTab from "./components/Profile/ProfileTab";
import FriendsTab, { loader } from "./components/Profile/FriendsTab";
import WishlistTab from "./components/Profile/WishlistTab";
import ProfileRoot from "./pages/ProfileRoot";
import keycloak from "./util/keycloak";
import { tokenLoader } from "./util/auth";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    // errorElement: <ErrorPage></ErrorPage>,
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage></HomePage> },
      {
        path: "/about",
        element: <AboutPage></AboutPage>,
      },
      {
        path: "/profile",
        element: <ProfileRoot></ProfileRoot>,
        children: [
          {
            index: true,
            element: <ProfileTab></ProfileTab>,
          },
          {
            path: "my-friends",
            element: <FriendsTab></FriendsTab>,
            loader: loader,
          },
          {
            path: "wishlist",
            element: <WishlistTab></WishlistTab>,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
