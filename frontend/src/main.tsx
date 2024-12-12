import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  // LoaderFunctionArgs,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import "./index.css";

import { Home } from "./pages/Home.tsx";
import { Navbar } from "./components/Navbar.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  // {
  //   path: '/books/:bookId',
  //   element: <BookDetails />,
  //   loader: loader(queryClient)
  // },
  // {
  //   path: '/login',
  //   element: <Login />
  // },
  // {
  //   path: '/register',
  //   element: <Register />
  // },
  // {
  //   path: '/basket',
  //   element: <Basket />
  // },
  // {
  //   path: '/your-books',
  //   element: <YourBooks />
  // },
  // {
  //   path: '/stock',
  //   element: <Stock />
  // },
  // {
  //   path: '/users',
  //   element: <Users />
  // },
  // {
  //   path: '/add-book',
  //   element: <AddBook />
  // }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </StrictMode>
);
