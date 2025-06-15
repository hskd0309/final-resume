
import { createBrowserRouter, Navigate, RouteObject } from "react-router";

import { BackupOtpPage } from "../pages/auth/backup-otp/page";
import { ForgotPasswordPage } from "../pages/auth/forgot-password/page";
import { AuthLayout } from "../pages/auth/layout";
import { LoginPage } from "../pages/auth/login/page";
import { RegisterPage } from "../pages/auth/register/page";
import { ResetPasswordPage } from "../pages/auth/reset-password/page";
import { VerifyEmailPage } from "../pages/auth/verify-email/page";
import { VerifyOtpPage } from "../pages/auth/verify-otp/page";
import { BuilderLayout } from "../pages/builder/layout";
import { builderLoader, BuilderPage } from "../pages/builder/page";
import { DashboardLayout } from "../pages/dashboard/layout";
import { ResumesPage } from "../pages/dashboard/resumes/page";
import { SettingsPage } from "../pages/dashboard/settings/page";
import { HomeLayout } from "../pages/home/layout";
import { HomePage } from "../pages/home/page";
import { ErrorPage } from "../pages/public/error";
import { publicLoader, PublicResumePage } from "../pages/public/page";
import { Providers } from "../providers";
import { AuthGuard } from "./guards/auth";
import { GuestGuard } from "./guards/guest";
import { authLoader } from "./loaders/auth";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Providers />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
        children: [
          {
            index: true,
            element: <HomePage />
          }
        ]
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate replace to="/auth/login" />
          },
          {
            path: "login",
            element: <GuestGuard />,
            children: [
              {
                index: true,
                element: <LoginPage />
              }
            ]
          },
          {
            path: "register",
            element: <GuestGuard />,
            children: [
              {
                index: true,
                element: <RegisterPage />
              }
            ]
          },
          {
            path: "forgot-password",
            element: <GuestGuard />,
            children: [
              {
                index: true,
                element: <ForgotPasswordPage />
              }
            ]
          },
          {
            path: "reset-password",
            element: <GuestGuard />,
            children: [
              {
                index: true,
                element: <ResetPasswordPage />
              }
            ]
          },
          {
            path: "verify-otp",
            element: <GuestGuard />,
            children: [
              {
                index: true,
                element: <VerifyOtpPage />
              }
            ]
          },
          {
            path: "backup-otp",
            element: <GuestGuard />,
            children: [
              {
                index: true,
                element: <BackupOtpPage />
              }
            ]
          },
          {
            path: "verify-email",
            element: <AuthGuard />,
            children: [
              {
                index: true,
                element: <VerifyEmailPage />
              }
            ]
          },
          {
            path: "callback",
            loader: authLoader,
            element: <div />
          }
        ]
      },
      {
        path: "dashboard",
        element: <AuthGuard />,
        children: [
          {
            path: "",
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <Navigate replace to="/dashboard/resumes" />
              },
              {
                path: "resumes",
                element: <ResumesPage />
              },
              {
                path: "settings",
                element: <SettingsPage />
              }
            ]
          }
        ]
      },
      {
        path: "builder",
        element: <AuthGuard />,
        children: [
          {
            path: "",
            element: <BuilderLayout />,
            children: [
              {
                index: true,
                element: <Navigate replace to="/dashboard/resumes" />
              },
              {
                path: ":id",
                loader: builderLoader,
                element: <BuilderPage />
              }
            ]
          }
        ]
      },
      {
        path: ":username/:slug",
        loader: publicLoader,
        element: <PublicResumePage />
      }
    ]
  }
];

export const router = createBrowserRouter(routes);
