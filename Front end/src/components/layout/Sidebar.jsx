import React, { useEffect, useState } from "react";

import { ReactComponent as AllBerandaIcon } from "../../assets/icon/ic_homapages.svg";
import { ReactComponent as SearchIcon } from "../../assets/icon/ic_search.svg";

import { useLocation, useNavigate } from "react-router-dom";
import LoadingLink from "../common/LoadingLink";

const Sidebar = () => {
  const status = localStorage.getItem("isLogin");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tab, setTab] = useState("/");

  const navigate = useNavigate();
  const location = useLocation();
  const { hostname } = window.location;

  useEffect(() => {
    const formatPathname = (pathname) => {
      return pathname.replace("/", "/").replace(/^\w/, (c) => c.toUpperCase());
    };

    setTab(formatPathname(location.pathname));
  }, [location]);

  return (
    <div className="flex flex-col gap-3 w-full pb-40">
      <div
        className={`flex flex-col bg-cardLight rounded-lg shadow-inner p-2`}
      >
        {[
          { title: "MENU", icon: "" },
          { title: "Beranda", icon: AllBerandaIcon, href: "/", status: true },
          { title: "Pencarian", icon: SearchIcon, href: "/search", status: true },
          { title: "Live Berita", icon: AllBerandaIcon, href: "/live-berita", status: true },
          { title: "Tentang Kami", icon: AllBerandaIcon, href: "/about", status: true },
          { title: "Lapor Berita", icon: AllBerandaIcon, href: "/lapor-berita", status: true },
        ].map((button, index) =>
          button.icon === "" ? (
            <div
              key={index}
              className=" items-center flex gap-2 font-bold w-full p-2 rounded-lg"
            >
              <span className="group-hover:text-[#212121] text-sm line-clamp-1 text-left">
                {button.title}
              </span>
            </div>
          ) : button.status === true ? (
            button.href ? (
              <LoadingLink
                key={index}
                to={button.href}
                state={button?.state}
                onMouseOver={() => {
                  setHoveredIndex(index);
                }}
                onMouseOut={() => {
                  setHoveredIndex(null);
                }}
                className={`${tab === "/me" ? (location.state === button.state ? "text-[#24a186]" : "text-lightColor ") : tab === button.href ? "text-[#24a186]" : "text-lightColor"} hover:bg-[#24a186] no-underline  group items-center flex gap-2 w-full p-2 rounded-lg`}
              >
                {button.icon && (
                  <button.icon
                    className="h-5 w-5"
                    fill={
                      hoveredIndex === index
                        ? "#212121"
                        : tab === "/me"
                          ? location.state === button.state
                            ? "#24a186"
                            : "#000000"
                          : tab === button.href
                            ? "#24a186"
                            : "#000000"
                    }
                  />
                )}
                <span className="group-hover:text-darkColor text-sm line-clamp-1 text-left">
                  {button.title}
                </span>
              </LoadingLink>
            ) : (
              <button
                key={index}
                onClick={button.onClick}
                onMouseOver={() => {
                  setHoveredIndex(index);
                }}
                onMouseOut={() => {
                  setHoveredIndex(null);
                }}
                className={`${tab === "/me" ? (location.state === button.state ? "text-[#24a186]" : "text-lightColor") : tab === button.href ? "text-[#24a186]" : "text-lightColor"} hover:bg-[#24a186] no-underline  group items-center flex gap-2 w-full p-2 rounded-lg`}
              >
                {button.icon && (
                  <button.icon
                    className="h-5 w-5"
                    fill={
                      hoveredIndex === index
                        ? "#212121"
                        : tab === "/me"
                          ? location.state === button.state
                            ? "#24a186"
                            : "#000000"
                          : tab === button.href
                            ? "#24a186"
                            : "#000000"
                    }
                  />
                )}
                <span className="group-hover:text-[#212121] text-sm line-clamp-1 text-left">
                  {button.title}
                </span>
              </button>
            )
          ) : null,
        )}
      </div>
    </div>
  );
};

export default Sidebar;
