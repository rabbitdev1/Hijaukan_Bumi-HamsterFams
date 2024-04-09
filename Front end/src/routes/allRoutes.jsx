import React, { useEffect, useState } from "react";
import { apiClient } from "../utils/api/apiClient";
import { useNavigate, useParams } from "react-router";

import Homapages from "../pages/homepages";
import Details from "../pages/details";

import NotFoundPage from "../components/layout/NotFoundPage";
import LiveBeritaPAges from "../pages/details/live_berita";
import AboutPages from "../pages/about/about";
import SearchingPAges from "../pages/details/searching";
import LaporBeritaPAges from "../pages/about/lapor_berita";

const userRoutes = [
  // { path: "/login", component: <Homapages /> },
];
const nonUserRoutes = [
  { path: "/", component: <Homapages /> },
  { path: "/detail/:slug", component: <Details /> },
  { path: "live-berita", component: <LiveBeritaPAges /> },
  { path: "/about", component: <AboutPages /> },
  { path: "/search", component: <SearchingPAges /> },
  { path: "/lapor-berita", component: <LaporBeritaPAges /> },
];

const authRoutes = [
  // { path: "/login", component: <LoginPages /> },
];

export { userRoutes, authRoutes, nonUserRoutes };
