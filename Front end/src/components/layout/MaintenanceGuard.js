import Lottie from "lottie-react";
import { useSelector } from "react-redux";

import animationToManyRequesteData from "../../assets/lottie/tomanyrequest.json";
import { useEffect, useState } from "react";

export const MaintenanceGuard = ({ children }) => {
  const isMaintenanceMode = useSelector(
    (state) => state.todoReducer.isMaintenanceMode,
  );
  const isToManyRequestMode = useSelector(
    (state) => state.todoReducer.isToManyRequestMode,
  );
  const [webSetting, setWebSetting] = useState();

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const isWebSetting = localStorage.getItem("isWebSetting");
      setWebSetting(JSON.parse(isWebSetting));
    }
  }, []);

  return isMaintenanceMode ? (
    <div className="flex bg-[#F7FBFA] min-w-full min-h-screen items-center justify-center flex-col p-4 font-inter">
      <div className="gap-3 flex flex-col items-center container max-w-6xl">
        <img
          src={require('../../assets/image/not_found.png')}
          alt="other"
          className=" w-1/2 aspect-square object-cover flex max-w-xs"
        />
        <span className="text-3xl font-bold text-center text-[#333333]">
          MAINTENANCE
        </span>
        <span className="text-base  text-center text-[#666666]">
          Kami akan segera kembali
        </span>
      </div>
    </div>
  ) : isToManyRequestMode ? (
    <div className="flex bg-[#F7FBFA] min-w-full min-h-screen items-center justify-center flex-col p-4 font-inter">
      <div className="gap-3 flex flex-col items-center container max-w-6xl">
        <Lottie
          animationData={animationToManyRequesteData}
          loop={true}
          autoplay={true}
          className="w-[50%] "
        />
        <span className="text-3xl font-bold text-center text-[#333333]">
          ERROR 429
        </span>
        <span className="text-base  text-center text-[#666666]">
          Terlalu banyak permintaan
        </span>
      </div>
    </div>
  ) : (
    children
  );
};
