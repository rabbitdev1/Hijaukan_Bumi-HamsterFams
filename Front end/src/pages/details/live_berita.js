import CryptoJS from "crypto-js";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as FAktaIcon } from "../../assets/icon/ic_fakta.svg";
import { ReactComponent as HoaxIcon } from "../../assets/icon/ic_hoax.svg";
import LoadingLink from "../../components/common/LoadingLink";
import ConditionalRender from "../../components/ui/ConditionalRender";
import { apiClient } from "../../utils/api/apiClient";
import BrandSlider from "../homepages/BrandSlider";
import BeritaSummarySection from "../homepages/BeritaSummarySection";

function LiveBeritaPAges() {
  const isWebSetting = localStorage.getItem("isWebSetting");
  const parseWebSetting = JSON.parse(isWebSetting);
  const location = useLocation();
  const navigate = useNavigate();

  const [articleUpdate, setArticleUpdate] = useState([]);
  const [count, setCount] = useState({});

  const [articleDetailLoading, setArticleDetailLoading] = useState(true);

  useEffect(() => {
    fetchDataArticleUpdate();
    fetchCountArticle();
  }, [location]);

  const fetchCountArticle = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const sha256Hash = CryptoJS.MD5(year + "-" + month + "-" + day).toString();

    const params = new URLSearchParams();
    params.append("api_key", sha256Hash);

    try {
      const response = await apiClient({
        baseurl: "count_articles",
        method: "POST",
        apiKey: sha256Hash,
        body: params,
      });
      if (response?.statusCode === 200) {
        setCount(response.result.data)
      } else {
        setCount({})
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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
  return (
    <div className="flex flex-col gap-3 flex-1 ">
      <div className="bg-[#24a186] flex flex-col items-center px-5 pt-5 pb-40 ">
        <span className="text-lg font-bold text-darkColor">
          Live Berita
        </span>
        <span className="text-base text-darkColor">Home / Live Berita</span>
      </div>
      <div className="flex flex-col gap-3 flex-1 lg:container lg:mx-auto xl:max-w-screen-xl -mt-36 p-3">
        <div className="flex flex-1 flex-col bg-lightColor p-3 rounded-md shadow-inner">
          <ConditionalRender
            productsData={articleUpdate}
            isLoading={articleDetailLoading}
            model={"emptyData"}
          >
            {articleUpdate?.slice(0, 20).map((item, index) => {
              const updatedDate = new Date(item.updated_at);
              const month = updatedDate.toLocaleString("id-ID", {
                month: "short",
              });
              const day = String(updatedDate.getDate())?.padStart(2, "0");

              return (
                <LoadingLink
                  key={index}
                  to={"/detail/" + item?.slug}
                  className=" flex flex-1 flex-col text-lightColor bg-lightColor hover:bg-[#f3f3f3] no-underline "
                >
                  <div className="flex flex-row  p-2 gap-2 rounded-md">
                    <div className="flex flex-col">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="h-full object-cover aspect-[2/1] w-20 rounded-md bg-red-200"
                        effect="blur"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <span className="text-md line-clamp-2">{item.title}</span>
                      <span className="text-xs line-clamp-1">{item.updated_at}</span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div
                        className={`${item.status_article === "Fakta" ? "bg-[#2BC155]" : "bg-[#ff3420]"} flex flex-col w-8 aspect-square rounded-full mt-2 p-1`}
                      >
                        {item.status_article === "Fakta" ? (
                          <FAktaIcon
                            className="w-full h-full"
                            fill={"#2BC155"}
                          />
                        ) : (
                          <HoaxIcon
                            className="w-full h-full"
                            fill={"#ff3420"}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </LoadingLink>
              );
            })}
          </ConditionalRender>
        </div>
        <BrandSlider />
        <BeritaSummarySection count={count} />
      </div>
    </div>
  );
}

export default LiveBeritaPAges;
