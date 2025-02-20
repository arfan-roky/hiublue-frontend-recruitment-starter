"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import ThemeProvider from "@/theme/index";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/authStore";

const Providers = (props: { children: React.ReactNode }) => {
  return (
    <>
      <InitColorSchemeScript attribute="class" />
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider>
          <AuthProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {props.children}
          </AuthProvider>
          <ToastContainer />
        </ThemeProvider>
      </AppRouterCacheProvider>
    </>
  );
};

export default Providers;
