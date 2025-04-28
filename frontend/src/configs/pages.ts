import React from "react";

const Login = React.lazy(() => import("../pages/Login"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const DataToddler = React.lazy(() => import("../pages/DataToddler"));
const DataClassification = React.lazy(
  () => import("../pages/DataClassification")
);

const PAGES = {
  Login,
  Dashboard,
  DataToddler,
  DataClassification,
};

export default PAGES;
