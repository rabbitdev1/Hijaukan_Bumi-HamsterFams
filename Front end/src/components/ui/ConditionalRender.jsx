import React, { useEffect, useState } from "react";
import Button from "../common/Button";

const ConditionalRender = ({
  productsData,
  children,
  isLoading = true,
  height = "h-[200px]",
  model,
}) => {
  const [webSetting, setWebSetting] = useState();

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const isWebSetting = localStorage.getItem("isWebSetting");
      setWebSetting(JSON.parse(isWebSetting));
    }
  }, []);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div
        className={`flex flex-col items-center justify-center  ${isLoading ? height : "h-full"} w-full`}
      >
        <div
          role="status"
          className="flex items-center justify-center h-full w-full bg-gray-200  animate-pulse "
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    if (productsData.length === 0) {
      return !isVisible ? (
        <div
          className={`flex flex-col items-center justify-center  ${isLoading ? height : "h-full"} w-full`}
        >
          <div
            role="status"
            className="flex items-center justify-center h-full w-full bg-gray-200   animate-pulse "
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-center  ${isLoading ? height : "h-full"} w-full gap-2`}
        >
          <img
            src={
              model === "emptyData"
                ? require('../../assets/image/empty-box.webp')
                : model === "emptyItem"
                  ? require('../../assets/image/empty-box.webp')
                  : model === "emptyForm"
                    ? require('../../assets/image/empty-box.webp')
                    :require('../../assets/image/empty-box.webp')
            }
            alt="other"
            className=" w-1/2 aspect-square object-cover flex max-w-xs"
          />
          <span className="text-sm ">
            {model === "emptyData"
              ? "Data Tidak Ditemukan"
              : model === "emptyItem"
                ? "Produk belum tersedia..."
                : model === "emptyForm"
                  ? "Form Tidak Ditemukan"
                  : ""}
          </span>
          {model === "emptyItem" && (
            <Button
              initialValue={"Cari Produk Lainnya"}
              type="fill"
              className="bg-[#24a186] text-darkColor flex-1"
              href={"/"}
            />
          )}
        </div>
      );
    } else {
      return <>{children}</>;
    }
  }
};

export default ConditionalRender;
