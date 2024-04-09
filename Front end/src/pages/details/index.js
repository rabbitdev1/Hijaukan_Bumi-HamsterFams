import CryptoJS from "crypto-js";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import DOMPurify from "dompurify";
import { ReactComponent as CalenderIcon } from "../../assets/icon/ic_calender.svg";
import { ReactComponent as FAktaIcon } from "../../assets/icon/ic_fakta.svg";
import { ReactComponent as HoaxIcon } from "../../assets/icon/ic_hoax.svg";
import { apiClient } from "../../utils/api/apiClient";
import formatTanggal from "../../utils/helpers/formatTime";
import ArticleUpdateSection from "../homepages/ArticleUpdateSection";
import BrandSlider from "../homepages/BrandSlider";
import LoadingLink from "../../components/common/LoadingLink";
import Button from "../../components/common/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";

function DetailBerita() {
  const isWebSetting = localStorage.getItem("isWebSetting");
  const parseWebSetting = JSON.parse(isWebSetting);
  const location = useLocation();
  const navigate = useNavigate();

  const [articleUpdate, setArticleUpdate] = useState([]);
  const [detailArticles, setdetailArticles] = useState([]);
  const [tags, setTag] = useState([]);

  const [articleUpdateLoading, setArticleUpdateLoading] = useState(true);
  const [articleDetailLoading, setArticleDetailLoading] = useState(true);

  useEffect(() => {
    fetchDataArticleUpdate();
    const formatPathname = (pathname) => {
      return pathname?.replace("/detail", "")?.replace("/", "");
    };
    fetchDataArticleDetail(formatPathname(location.pathname));
  }, [location]);

  const fetchDataArticleDetail = async (slug) => {
    setArticleUpdateLoading(true);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const sha256Hash = CryptoJS.MD5(year + "-" + month + "-" + day).toString();

    const params = new URLSearchParams();
    params.append("api_key", sha256Hash);
    params.append("slug", slug);

    try {
      const response = await apiClient({
        baseurl: "detail_articles",
        method: "POST",
        apiKey: sha256Hash,
        body: params,
      });
      setArticleUpdateLoading(false);
      if (response?.statusCode === 200) {
        setdetailArticles(response.result.data);
        let arrayKata = response?.result?.data?.tags.split(",");
        setTag(arrayKata);
      } else {
        navigate("/");
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setdetailArticles([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataArticleUpdate = async () => {
    setArticleDetailLoading(true);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const sha256Hash = CryptoJS.MD5(year + "-" + month + "-" + day).toString();

    const params = new URLSearchParams();
    params.append("api_key", sha256Hash);

    try {
      const response = await apiClient({
        baseurl: "update_articles",
        method: "POST",
        apiKey: sha256Hash,
        body: params,
      });
      setArticleDetailLoading(false);
      if (response?.statusCode === 200) {
        setArticleUpdate(response.result.data);
      } else {
        setArticleUpdate([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const sanitizedHtmlContent = DOMPurify.sanitize(
    detailArticles?.content_raw
      ?.replace(/\\n/g, "")
      ?.replace(/\\/g, "")
      ?.replace(/\/\//g, "/")
  );
  return (
    <div className="flex flex-col gap-3 flex-1 ">
      <div className="bg-[#24a186] flex flex-col items-center px-5 pt-5 pb-40 ">
        <span className="text-lg font-bold text-darkColor">
          Verifikasi Berita
        </span>
        <span className="text-base text-darkColor">Home / Berita</span>
      </div>
      <div className="flex flex-col gap-3 flex-1 lg:container lg:mx-auto xl:max-w-screen-xl -mt-36 p-3">
        <div className="flex flex-1 md:flex-row flex-col-reverse gap-3">
          <div className="flex basis-4/12  xl:basis-3/12 flex-col">
            <div className="flex flex-col bg-lightColor p-3 gap-3 rounded-md shadow-inner">
              <div className="flex flex-col items-center ">
                <div className="flex h-32 w-32 bg-red-400 rounded-full">
                  <img
                    alt={detailArticles?.source?.toUpperCase()}
                    src={require("../../assets/image/profile.png")}
                    className="object-cover"
                  />
                </div>
                <span className="text-base font-bold mt-3">
                  {detailArticles?.source?.toUpperCase()}
                </span>
                <span className="text-sm">
                  {" "}
                  TIM CEK FAKTA {detailArticles?.source?.toUpperCase()}
                </span>
              </div>
              <div className="border-b-[1px] border-[#cecece]" />
              <div className="flex flex-col gap-2">
                <span className="text-base">
                  Terverifikasi dari Situs <b>{detailArticles?.source}</b>
                </span>
                <span className="text-sm ">{detailArticles?.summary}</span>
                {detailArticles?.source_url && (
                  <Button
                    initialValue="Link Sumber"
                    type="fill"
                    color={"#ffffff"}
                    className="bg-[#24a186] text-darkColor w-full"
                    onClick={() => {
                      const cleanedUrl = detailArticles?.source_url.replace(
                        /\\/g,
                        ""
                      );
                      window.open(cleanedUrl, "_blank");
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col bg-lightColor p-3 gap-5 rounded-md shadow-inner">
            <div className="flex sm:flex-row flex-col-reverse flex-1 gap-2">
              <div className="flex flex-1 flex-col gap-2">
                <span className="sm:text-3xl text-xl font-bold line-clamp-4">
                  {detailArticles?.title}
                </span>
                <span className="text-sm opacity-70">
                  Informasi ini dipetik dari sumber yang terpercaya,{" "}
                  <b>{detailArticles?.source}</b>, <br /> yang merilisnya pada
                  tanggal{" "}
                  <b> {formatTanggal(detailArticles?.published_date)}</b>.{" "}
                </span>
                <div className="flex flex-1 flex-row gap-3 mt-3">
                  <div className="flex flex-row gap-2 items-center">
                    <CalenderIcon className="w-10 h-10" fill={"#2BC155"} />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">
                        {formatTanggal(detailArticles?.created_at)}
                      </span>
                      <span className="text-xs opacity-70 ">Dibuat</span>
                    </div>
                  </div>

                  <div className="flex  flex-row gap-2 items-center">
                    <CalenderIcon className="w-10 h-10" fill={"#8653C7"} />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">
                        {formatTanggal(detailArticles?.updated_at)}
                      </span>
                      <span className="text-xs opacity-70">Diupdate</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-2 items-start basis-3/12 sm:justify-end">
                <div
                  className={`flex flex-col justify-center h-10 rounded-full ${detailArticles.status_article === "Fakta" ? "bg-[#2BC155]" : "bg-[#ff3420]"}  px-4`}
                >
                  <span className="text-md font-bold line-clamp-1 text-darkColor">
                    {detailArticles?.status_article}
                  </span>
                </div>
                <div
                  className={`flex flex-col  h-10 w-10 p-1 rounded-full ${detailArticles.status_article === "Fakta" ? "bg-[#2BC155]" : "bg-[#ff3420]"} `}
                >
                  {detailArticles.status_article === "Fakta" ? (
                    <FAktaIcon className="w-full h-full" fill={"#2BC155"} />
                  ) : (
                    <HoaxIcon className="w-full h-full" fill={"#ff3420"} />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3">
              <LazyLoadImage
                src={detailArticles?.image_url}
                alt={detailArticles?.title}
                height={"100%"}
                className="w-full h-full object-contain aspect-[2/1] max-h-96"
                effect="blur"
              />
              <div
                className="text-base "
                dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
              />
            </div>
            <div className="flex relative overflow-x-scroll no-scrollbar h-7 my-1">
              <div className="flex flex-row absolute items-center top-0 left-0 right-0 gap-2 bottom-0">
                <span className="text-sm font-bold">Tag:</span>
                {tags?.map((tag, index) => (
                  <div
                    key={index}
                    className="flex flex-row p-1 px-3 items-center justify-center rounded-full border-1 border-darkColor/20"
                  >
                    <span className="text-xs truncate">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ArticleUpdateSection
          articleUpdate={articleUpdate}
          articleUpdateLoading={articleDetailLoading}
          type={"2"}
        />
        <BrandSlider />
      </div>
    </div>
  );
}

export default DetailBerita;
