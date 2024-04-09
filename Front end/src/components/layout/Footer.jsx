import React, { useEffect, useState } from "react";
import { ReactComponent as InstagramIcon } from "../../assets/socialmedia/Instagram.svg";
import { ReactComponent as TiktokIcon } from "../../assets/socialmedia/TikTok.svg";
import { ReactComponent as FacebookIcon } from "../../assets/socialmedia/facebook.svg";
import { ReactComponent as PlaystoreIcon } from "../../assets/socialmedia/playstore_light.svg";
import { ReactComponent as WAIcon } from "../../assets/socialmedia/whatapps.svg";
import { ReactComponent as MapIcon } from "../../assets/icon/ic_map.svg";
import { ReactComponent as PhoneIcon } from "../../assets/icon/ic_phone.svg";
import { ReactComponent as MailIcon } from "../../assets/icon/ic_mail.svg";

import LoadingLink from "../common/LoadingLink";
import ConditionalRender from "../ui/ConditionalRender";

const Footer = () => {
  const [status, setStatus] = useState(null);
  const [webSetting, setWebSetting] = useState();
  const { hostname } = window.location;

  const [categoryData, setCategoryData] = useState([]);
  const [productLoading, setProductLoading] = useState(true);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const isWebSetting = localStorage.getItem("isWebSetting");
      setWebSetting(JSON.parse(isWebSetting));
    }
    fetchDataProduct();
  }, []);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedStatus = localStorage.getItem("isLogin");
      setStatus(storedStatus);
    }
  }, []);

  const fetchDataProduct = async () => {
    setProductLoading(true);
    // try {
    //   const response = await apiClient({
    //     baseurl: "user/kategori",
    //     method: "GET",
    //     XGORDON: "KATEGORI",
    //   });
    //   setProductLoading(false);
    //   if (response?.statusCode === 200) {
    //     setCategoryData(response.result.data);
    //   } else {
    //     setCategoryData([]);
    //   }
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };


  return (
    <div
      className=" text-darkColor bg-[#1F2131] "
    >
      <div className="flex flex-col lg:container lg:mx-auto xl:max-w-screen-xl transition duration-300 ease-in-out mx-auto w-full justify-between ">
        <div className="flex flex-col px-3">
          <div className="md:h-10 h-6" />
          <span className="font-bold text-xl md:text-3xl" dangerouslySetInnerHTML={{ __html: webSetting?.slogan3?.replace(/,/g, ',<br/>') }}></span>
          <div className="md:h-10 h-6" />

        </div>
      </div>
      <footer className="flex flex-col lg:container lg:mx-auto xl:max-w-screen-xl transition duration-300 ease-in-out mx-auto w-full justify-between ">
        <div className="flex lg:flex-row flex-col">
          <div className="flex flex-col basis-5/12 gap-4 p-3">
            <LoadingLink to="/" className="flex flex-row">
              <img
                src={require('../../assets/image/logo_white.png')}
                className="h-8 w-auto flex object-contain "
              />
            </LoadingLink>
            <p className="text-sm"> {webSetting?.slogan2}</p>
            <div className="flex flex-col gap-3 col-span-2">

              <div className="flex gap-3 overflow-x-scroll no-scrollbar">
                {webSetting?.nomor && (
                  <button
                    className="  "
                    onClick={() => window.open(webSetting?.nomor, "_blank")}
                  >
                    <WAIcon
                      className="h-7 w-7"
                      fill={"#ffffff"}
                    />
                  </button>
                )}
                {webSetting?.facebook && (
                  <button
                    className="  "
                    onClick={() =>
                      window.open(webSetting?.facebook, "_blank")
                    }
                  >
                    <FacebookIcon
                      className="h-7 w-7"
                      fill={"#ffffff"}
                    />
                  </button>
                )}
                {webSetting?.instagram && (
                  <button
                    className="  "
                    onClick={() =>
                      window.open(webSetting?.instagram, "_blank")
                    }
                  >
                    <InstagramIcon
                      className="h-7 w-7"
                      fill={"#ffffff"}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1 no-underline px-3 py-3">
            <div className="flex flex-1 flex-col">
              <span className="font-bold text-lg mb-2">Akses Cepat</span>
              <LoadingLink to="/" className="no-underline text-darkColor">
                <span className="text-sm">Home</span>
              </LoadingLink>
              <LoadingLink to="/search" className="no-underline text-darkColor">
                <span className="text-sm">Pencarian</span>
              </LoadingLink>
              <LoadingLink to="/about" className="no-underline text-darkColor">
                <span className="text-sm">Tentang Kami</span>
              </LoadingLink>
              <LoadingLink to="/live-berita" className="no-underline text-darkColor">
                <span className="text-sm">Live Berita</span>
              </LoadingLink>
              <LoadingLink to="/lapor-berita" className="no-underline text-darkColor">
                <span className="text-sm">Lapor Berita</span>
              </LoadingLink>
            </div>
            <div className="flex flex-1 flex-col">
              <span className="font-bold text-lg mb-2">Resources</span>
              <a onClick={() => {
                const link = 'https://t.me/HijaukanBumi_bot';
                window.open(link, "_blank");
              }} className="no-underline text-darkColor cursor-pointer">
                <span className="text-sm">Telegram BOT</span>
              </a>
            </div>
            <div className="flex flex-1 flex-col sm:col-span-1 col-span-2">
              <span className="font-bold text-lg mb-2">Hubungi Kami</span>
              <LoadingLink to="/" className="no-underline gap-2 mb-2 text-darkColor flex flex-row items-start">
                <div className="flex flex-row flex-1 gap-2">
                  <PhoneIcon
                    className="h-6 w-auto"
                    fill={"#ffffff"}
                  />
                  <span className="text-sm flex-1">{webSetting?.nomor}</span>
                </div>
              </LoadingLink>
              <a onClick={() => { window.location.href = 'mailto:' + webSetting?.mail }}
                className="no-underline gap-2 text-darkColor flex flex-row items-start cursor-pointer">
                <div className="flex flex-row flex-1 gap-2">
                  <MailIcon
                    className="h-6 w-auto"
                    fill={"#ffffff"}
                  />
                  <span className="text-sm flex-1">{webSetting?.mail}</span>
                </div>
              </a>

              <span className="font-bold text-lg mb-2 mt-3">
                Lokasi Kami
              </span>
              <a onClick={() => {
                var fullAddress = (webSetting?.alamat);
                window.location.href = 'https://www.google.com/maps/search/' + fullAddress;
              }}
                className="no-underline gap-2 mb-2 text-darkColor flex flex-row items-start cursor-pointer">
                <div className="flex flex-row flex-1 gap-2">
                  <MapIcon
                    className="h-6 w-auto"
                    fill={"#ffffff"}
                  />
                  <span className="text-sm flex-1">{webSetting?.alamat}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-t-[1px] border-[#ffffff18] ">
          <div className="flex flex-row gap-2 py-3 justify-between opacity-70">
            <div className=" h-full px-2 flex items-center ">
              <span className="text-xs">
                <span className="font-bold text-[#ff772b]">
                  {webSetting?.judul}
                </span>  -   © 2024 All Rights Reserved{" "}
              </span>
            </div>
            <div className=" h-full px-2 flex items-center ">
              <span className="text-xs">
                Made with ♥ by HamsterFams
              </span>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
