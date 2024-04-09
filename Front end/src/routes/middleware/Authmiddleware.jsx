import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Sidebar from "../../components/layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import LoadingLink from "../../components/common/LoadingLink";
import {
  isSideBar,
} from "../../components/store/actions/todoActions";
import FloatingSocialMedia from "../../components/ui/FloatingSocialMedia";

const Authmiddleware = (props) => {
  const [hideHeader, setHideHeader] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const setSideBar = useSelector((state) => state.todoReducer.isSideBar);
  const dispatch = useDispatch();

  const [webSetting, setWebSetting] = useState();

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const isWebSetting = localStorage.getItem("isWebSetting");
      setWebSetting(JSON.parse(isWebSetting));
    }
  }, []);

  useEffect(() => {
    const header = document.querySelector("header");
    setHeaderHeight(header.offsetHeight);
    const checkScreenSize = () => {
      // setIsLargeScreen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", checkScreenSize);
    checkScreenSize();
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleScroll = () => {
    const headerScrollPoint = document.getElementById("headerscroll");
    setHideHeader(window.scrollY >= headerScrollPoint?.offsetTop || 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <React.Fragment>
      <div
        onClick={() => dispatch(isSideBar(false))}
        className={`w-full h-screen z-20 ${setSideBar ? "translate-x-0 bg-[#021D3968] " : "-translate-x-full bg-[#021D3900] "} transition-transform duration-300 ease-in-out fixed `}
      >
        <div
          className={`flex flex-col relative gap-3  bg-lightColor  text-lightColor  items-start shadow-md w-full p-3 max-w-[280px] h-screen ${setSideBar ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out `}
        >
          <div className="flex flex-col w-full overflow-y-scroll">
            <div>
              <LoadingLink
                to="/"
                className={`flex-1 max-w-[280px] w-full items-center px-3 py-2.5 flex `}
              >
                <img
                  src={require('../../assets/image/logo.png')}
                  alt="logo"
                  className="h-10 w-auto flex object-contain "
                />
              </LoadingLink>
            </div>
            <div className=" flex flex-col flex-1 w-full">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-lightColor border-lightColor text-lightColor transition duration-300 ease-in-out min-h-screen font-inter">
        <header
          className={`fixed z-10 top-0 w-full shadow-md ${hideHeader ? "bg-lightColor " : ""} transition-all duration-500`}
        >
          <Header />
        </header>
        <div
          className="flex z-0 flex-col w-full h-full flex-1 "
          style={{ paddingTop: `${headerHeight + 5}px` }}
        >
          <div id="headerscroll"></div>
          <div className="grow ">{props.children}</div>
        </div>
        <Footer />

        <div id="modal-root" className="z-20"></div>
        <FloatingSocialMedia />
      </div>
    </React.Fragment>
  );
};

export default Authmiddleware;
