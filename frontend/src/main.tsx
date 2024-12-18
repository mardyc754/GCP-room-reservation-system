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
import { CreateReservation } from "./pages/CreateReservation";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ChangeReservationData } from "./pages/ChangeReservationData";

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
  {
    path: "/reservations/:reservationId",
    element: <ChangeReservationData />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
