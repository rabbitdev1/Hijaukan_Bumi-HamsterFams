import React, { useEffect, useState } from "react";
import Button from "../common/Button";

import { ReactComponent as Ic_menu } from "../../assets/icon/btn_menus.svg";

import {
  isSideBar,
  searchAction,
} from "../../components/store/actions/todoActions";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { OverlayTrigger, Popover } from "react-bootstrap";
import LoadingLink from "../common/LoadingLink";

const Header = () => {
  const [status, setStatus] = useState(null);
  const isWebSetting = localStorage.getItem("isWebSetting");
  const parseWebSetting = JSON.parse(isWebSetting);
  const isProfile = localStorage.getItem("isProfile");
  const [showOverlay, setShowOverlay] = useState(false);
  const [tab, setTab] = useState("/");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };
  const profileData = JSON.parse(isProfile);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedStatus = localStorage.getItem("isLogin");
      setStatus(storedStatus);
    }
  }, []);

  useEffect(() => {
    const formatPathname = (pathname) => {
      if (pathname === "/") {
        return "Home";
      }
      return pathname.replace("/", "").replace(/^\w/, (c) => c.toUpperCase());
    };

    setTab(formatPathname(location.pathname));
  }, [location]);

  return (
    <div className="flex flex-row flex-1 transition duration-300 ease-in-out ">
      <header className="lg:container lg:mx-auto xl:max-w-screen-xl flex flex-row flex-1 ">
        <div className="flex flex-row gap-3 mx-auto flex-1 w-full justify-between  p-3">
          <div
            onClick={() => {
              setShowOverlay(false);
            }}
            className="md:hidden inline-flex "
          >
            <button
              onClick={() => {
                dispatch(isSideBar(true));
              }}
              className=" w-7"
            >
              <Ic_menu
                className={`w-full h-full`}
                fill={"#212121"}
              />
            </button>
          </div>
          <div className="flex flex-row items-center">
            <div
              className="flex flex-col"
              onClick={() => {
                setShowOverlay(false);
              }}
            >
              <LoadingLink
                to="/"
                className=" sm:flex hidden  flex-row items-center gap-3 h-full justify-start"
              >
                <img
                  src={require('../../assets/image/logo.png')}
                  className="h-8 w-auto flex object-contain "
                />
              </LoadingLink>
            </div>
            <LoadingLink to="/">
              <img
                src={require('../../assets/image/logo.png')}
                alt="Logo"
                onClick={() => {
                  setShowOverlay(false);
                }}
                className=" w-auto h-6 object-contain flex sm:hidden"
              />
            </LoadingLink>
            <div className="sm:w-10 w-0"/>
          </div>
          <div className="flex flex-col justify-center items-start flex-1">
            <div className="md:inline-flex hidden flex-row items-center gap-3 flex-1 ">
              {[
                { title: "Home", link: "/" },
                { title: "About", link: "/about" },
                { title: "Live Berita", link: "/live-berita" },
                { title: "Lapor Berita", link: "/lapor-berita" },
              ].map((item, index) => (
                <LoadingLink
                  to={item.link}
                  key={index}
                  className={" no-underline "}
                >
                  <span
                    className={`flex text-sm hover:text-[#24a186] ${item.title === tab ? "text-[#24a186]" : "text-lightColor/70 dark:text-darkColor/70"} dark:hover:text-[#24a186]  `}
                  >
                    {item.title}
                  </span>
                </LoadingLink>
              ))}
            </div>
          </div>
          <div className="flex flex-row gap-2  justify-end ">
            <div className="flex-row gap-2 inline-flex">
              <Button
                initialValue="Telegram Bot"
                type="fill"
                color={"#ffffff"}
                className="bg-[#24a186] text-darkColor"
               onClick={() => {
                const link = 'https://t.me/HijaukanBumi_bot';
                window.open(link, "_blank");
               }}
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
