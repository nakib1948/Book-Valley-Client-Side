import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import { CloudinaryContext } from 'cloudinary-react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const cloudinaryConfig = {
  cloud_name: import.meta.env.VITE_cloud_name,
  api_key:  import.meta.env.VITE_api_key,
  api_secret: import.meta.env.VITE_api_secret,
};

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
        <CloudinaryContext {...cloudinaryConfig}>
          <RouterProvider router={router} />
          </CloudinaryContext>,
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
