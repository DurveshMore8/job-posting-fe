"use client";

import { FunctionComponent } from "react";
import "./style.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const pathname = usePathname();

  const adminNav = [
    {
      name: "Dashboard",
      route: "/admin/dashboard",
    },
    {
      name: "Job Category",
      route: "/admin/job-category",
    },
    {
      name: "Job Listing",
      route: "/admin/job-listing",
    },
    {
      name: "Logout",
      route: "/login",
    },
  ];

  const patientNav = [
    {
      name: "Job List",
      route: "/candidate/job-list",
    },
    {
      name: "Job Applied",
      route: "/candidate/job-applied",
    },
    {
      name: "Logout",
      route: "/login",
    },
  ];

  return (
    pathname !== "/" &&
    pathname.split("/")[1] !== "login" &&
    pathname.split("/")[2] !== "signup" && (
      <nav className="navbar">
        <h2 className="navbar-head">Job Listing</h2>
        <ul className="navbar-list">
          {pathname.split("/")[1] === "admin"
            ? adminNav.map((admin, index) => {
                return (
                  <li key={index} className="navbar-list-item">
                    <Link href={admin.route}>{admin.name}</Link>
                  </li>
                );
              })
            : patientNav.map((patient, index) => {
                return (
                  <li key={index} className="navbar-list-item">
                    <Link href={patient.route}>{patient.name}</Link>
                  </li>
                );
              })}
        </ul>
      </nav>
    )
  );
};

export default Navbar;
