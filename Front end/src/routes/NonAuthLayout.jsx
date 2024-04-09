import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const NonAuthLayout = (props) => {
  const initialMode = () => {
    const savedMode = localStorage.getItem("isDarkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  };
  const [isDarkMode] = useState(initialMode);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="flex flex-col  bg-lightColor text-lightColor  transition duration-300 ease-in-out  min-h-screen font-inter">
        <div className="grow">
          <div className="flex flex-row min-h-screen">
            <div className="mx-auto w-full flex flex-row gap-3 justify-between items-center">
              {props.children}
            </div>
          </div>
        </div>
        <div id="modal-root" className="z-20"></div>
      </div>
    </React.Fragment>
  );
};

export default NonAuthLayout;
