import { createBrowserRouter } from "react-router";
import { LandingPage } from "@/app/pages/LandingPage";
import { DoctorSearch } from "@/app/pages/DoctorSearch";
import { BillAudit } from "@/app/pages/BillAudit";
import { LoginPage } from "@/app/pages/LoginPage";
import { Dashboard } from "@/app/pages/Dashboard";
import { Community } from "@/app/pages/Community";
import { About } from "@/app/pages/About";
import { Careers } from "@/app/pages/Careers";
import { Press } from "@/app/pages/Press";
import { Contact } from "@/app/pages/Contact";
import { DoctorDetailsPage } from "@/app/pages/DoctorDetailsPage";

import { Layout } from "@/app/components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "",
        Component: LandingPage,
      },
      {
        path: "doctor-search",
        Component: DoctorSearch,
      },
      {
        path: "bill-audit",
        Component: BillAudit,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "community",
        Component: Community,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "careers",
        Component: Careers,
      },
      {
        path: "press",
        Component: Press,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "doctor-details/:id",
        Component: DoctorDetailsPage,
      },
    ],
  },
]);
