import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  // LoaderFunctionArgs,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import "./index.css";

import { Home } from "./pages/Home";
import { Reservations } from "./pages/Reservations";

import { Navbar } from "./components/Navbar";
import { CreateReservation } from "./pages/CreateReservation";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/reservations",
    element: <Reservations />,
  },
  {
    path: "/create-reservation",
    element: <CreateReservation />,
  },
  {
    path: "/sign-in",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
