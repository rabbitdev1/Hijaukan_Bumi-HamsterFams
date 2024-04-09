import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

import { motion } from "framer-motion";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { ReactComponent as SearchIcon } from "../../assets/icon/ic_search.svg";
import { ReactComponent as DiscoveyIcon } from "../../assets/icon/ic_discover.svg";

import Input from "../../components/common/Input";
import { apiClient } from "../../utils/api/apiClient";
import BrandSlider from "./BrandSlider";
import LoadingLink from "../../components/common/LoadingLink";
import TigaLangkahSection from "./TigaLangkahSection";
import ArticleUpdateSection from "./ArticleUpdateSection";
import BeritaSummarySection from "./BeritaSummarySection";
import { useNavigate } from "react-router-dom";
import ConditionalRender from "../../components/ui/ConditionalRender";

function Homepages() {
  const isWebSetting = localStorage.getItem("isWebSetting");
  const parseWebSetting = JSON.parse(isWebSetting);

  const [searchData, setSearchData] = useState([]);
  const [TigaLangkahData, setTigaLangkahData] = useState([]);
  const [articleUpdate, setArticleUpdate] = useState([]);
  const [tigaPoinData, setTigaPointData] = useState([]);
  const [randomArticle, setRandomArticle] = useState([]);
  const [count, setCount] = useState({});

  const [TigaLangkahLoading, setTigaLangkahLoading] = useState(true);
  const [tigaPointLoading, setTigaPointLoading] = useState(true);
  const [articleUpdateLoading, setArticleUpdateLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);


  const navigate = useNavigate();
  useEffect(() => {
    fetchDataTigaLangkah();
    fetchDataTigaPoint();
    fetchDataArticleUpdate();
    fetchCountArticle();
  }, []);

  useEffect(() => {
    if (search.length > 3) {
      getSearch(search);
    } else {
      setSearchData([]);
      setShowOverlay(false);
    }
  }, [search]);

  const getSearch = async (keyword) => {
    try {
      const params = new URLSearchParams();
      params.append("query", keyword);

      const response = await apiClient({
        baseurlCostum: true,
        baseurl: "https://backend.cekhoax.id/api/search/suggestion",
        body: params,
        method: "POST",
        customHeaders: {
          "X-Authorization":
            "bK6q6pS5zeNQvkxXPniVoRzGYp5Z4VwUrOCpcA8G8ffNYouYQ04CujQ8KLvhnQRD",
        },
      });
      if (response?.statusCode === 200) {
        setSearchData(response.result.data);
        setShowOverlay(true);
      } else {
        setSearchData([]);
        setShowOverlay(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const getSetSearch = async (slug) => {
    try {
      const params = new URLSearchParams();
      params.append("slug", slug);

      const response = await apiClient({
        baseurlCostum: true,
        baseurl: "https://backend.cekhoax.id/api/article/detail_article",
        body: params,
        method: "POST",
        customHeaders: {
          "X-Authorization":
            "bK6q6pS5zeNQvkxXPniVoRzGYp5Z4VwUrOCpcA8G8ffNYouYQ04CujQ8KLvhnQRD",
        },
      });
      if (response?.statusCode === 200) {
        fetchsetDatabase(response.result.data);
        // setShowOverlay(true);
      } else {
        // setShowOverlay(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchsetDatabase = async (item) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const sha256Hash = CryptoJS.MD5(year + "-" + month + "-" + day).toString();

    const params = new URLSearchParams();
    params.append("api_key", sha256Hash);
    params.append("slug", item?.slug);
    params.append("source", item?.source);
    params.append("source_url", item?.source_url);
    params.append("image_url", item?.image_url);
    params.append("title", item?.title);
    params.append("content_raw", item?.content_raw);
    params.append("fact", item?.fact);
    params.append("summary", item?.summary);
    params.append("tags", item?.tags);
    params.append("reading_time_minutes", item?.reading_time_minutes);
    params.append("view_count", item?.view_count);
    params.append("published_date", item?.published_date);
    params.append("created_at", item?.created_at);
    params.append("updated_at", item?.updated_at);
    params.append("status_article", item?.status_article);

    try {
      const response = await apiClient({
        baseurl: "set_articles",
        method: "POST",
        apiKey: sha256Hash,
        body: params,
      });
      if (response?.statusCode === 200) {
        console.log(response.result.data);
        navigate("/detail/" + item?.slug)
      } else {
        navigate("/detail/" + item?.slug)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataTigaLangkah = async () => {
    setTigaLangkahLoading(true);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const sha256Hash = CryptoJS.MD5(year + "-" + month + "-" + day).toString();

    const params = new URLSearchParams();
    params.append("api_key", sha256Hash);
    params.append("table", "tiga_poin");

    try {
      const response = await apiClient({
        baseurl: "data",
        method: "POST",
        apiKey: sha256Hash,
        body: params,
      });
      setTigaLangkahLoading(false);
      if (response?.statusCode === 200) {
        setTigaLangkahData(response.result.data);
      } else {
        setTigaLangkahData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataTigaPoint = async () => {
    setTigaPointLoading(true);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const sha256Hash = CryptoJS.MD5(year + "-" + month + "-" + day).toString();

    const params = new URLSearchParams();
    params.append("api_key", sha256Hash);
    params.append("table", "tiga_langkah");

    try {
      const response = await apiClient({
        baseurl: "data",
        method: "POST",
        apiKey: sha256Hash,
        body: params,
      });
      setTigaPointLoading(false);
      if (response?.statusCode === 200) {
        setTigaPointData(response.result.data);
      } else {
        setTigaPointData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataArticleUpdate = async () => {
    setArticleUpdateLoading(true);
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
      setArticleUpdateLoading(false);
      if (response?.statusCode === 200) {
        setArticleUpdate(response.result.data);
        const shuffledData = response.result.data.sort(() => Math.random() - 0.5);
        setRandomArticle(shuffledData);
      } else {
        setArticleUpdate([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


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



  return (
    <div className="flex flex-col gap-3 flex-1 lg:container lg:mx-auto xl:max-w-screen-xl">
      <div className="flex sm:flex-row flex-col-reverse p-3 gap-3 overflow-clip">
        <div className="flex flex-1 flex-col gap-3 justify-center ">
          <span className="md:text-4xl text-3xl font-bold" dangerouslySetInnerHTML={{ __html: parseWebSetting?.slogan1?.replace(/,/g, ',<br/>') }}>
          </span>
          <span className="text-sm opacity-70">
            {parseWebSetting?.slogan2}
          </span>

          <OverlayTrigger
            trigger="click"
            placement="bottom-start"
            show={showOverlay}
            onHide={() => setShowOverlay(false)}
            overlay={
              <Popover id="popover-basic">
                <Popover.Header as="h3">Pencarian Populer</Popover.Header>
                <Popover.Body className="p-2">
                  {
                    <div className="flex flex-col w-full">
                      {searchData?.map((item, index) => (
                        <button
                          onClick={() => {
                            setSearch("");
                            getSetSearch(item.slug)
                          }}
                          key={index}
                          className="rounded-lg p-1 flex w-full justify-start hover:bg-[#21212118]  hover:p-2 items-center group space-x-3 transform  ease-out"
                        >
                          <SearchIcon className="h-6 w-6" fill="#212121" />
                          <div className="flex flex-col items-start flex-1">
                            <span className=" group-hover:text-[#1b1b41] text-sm group-hover:font-medium group-hover:transform  ease-out text-left">
                              {item.title}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  }
                </Popover.Body>
              </Popover>
            }
          >
            <div className="flex flex-row gap-2 items-center bg-lightColor ustify-between shadow-inner p-1.5 rounded-full w-full ">
              <Input
                id={1}
                value={search}
                onChange={(value) => {
                  const inputValue = value;
                  setSearch(inputValue);
                }}
                type={"search"}
                color={"#666666"}
                icon={<SearchIcon />}
                className="h-9 border-transparent bg-transparent "
                placeholder={`Cek Kebenaran`}
              />
              <LoadingLink to="/search"
                state={search}
                className="bg-[#24a186] flex items-center justify-center h-9 aspect-square rounded-full z-10">
                <SearchIcon className="h-5 w-5" fill="#ffffff" />
              </LoadingLink>
            </div>
          </OverlayTrigger>
        </div>
        <div className="md:flex hidden flex-col items-center basis-5/12 xl:basis-4/12  relative ">
          <img
              alt="ornamen_1"
              src={require("../../assets/image/people.png")}
              className="w-full h-full object-contain  pointer-events-none"
            />
          <motion.div
            animate={{
              x: [0, -5, 0],
              transition: {
                duration: 10,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 0,
                delay: 0,
              },
            }}
            className="absolute -bottom-12 -left-12 -right-12 -top-12"
          >
            <img
              alt="ornamen_1"
              src={require("../../assets/image/ornament_1.png")}
              className="w-full h-full object-contain  pointer-events-none"
            />
          </motion.div>
          <motion.div
            animate={{
              y: [0, -50, 0],
              transition: {
                duration: 5,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 0,
                delay: 0,
              },
            }}
            className="absolute bottom-0  flex flex-row justify-center max-w-96 w-full items-center   slide-left duration-1000 "
          >
            <LoadingLink
              to={"/detail/" + randomArticle[0]?.slug}
              className=" flex flex-row justify-center  w-full items-center  gap-2 shadow-inner rounded-md bg-lightColor/80 overflow-clip p-3 no-underline text-lightColor ">
              <img
                alt={randomArticle[0]?.title}
                src={randomArticle[0]?.image_url}
                className="flex flex-row basis-4/12 max-w-20 aspect-square object-cover rounded-md" />
              <div className="flex flex-col flex-1">
                <span className="text-base font-bold line-clamp-2">
                  {randomArticle[0]?.title}
                </span>
                <span className="text-sm font-light line-clamp-2">
                  {randomArticle[0]?.summary}
                </span>
              </div>
            </LoadingLink>
          </motion.div>
        </div>
      </div>
      <BrandSlider />
      <TigaLangkahSection
        data={TigaLangkahData}
        loading={TigaLangkahLoading}

      />
      <div className="flex flex-col p-3 gap-3 ">
        <div className="flex flex-col text-center gap-2">
          <span className="md:text-3xl text-2xl text-center">{parseWebSetting?.judul} </span>
          <span className="text-sm opacity-70">Platform kami membantu Anda mengidentifikasi informasi<br />yang salah seputar isu lingkungan dengan cepat dan akurat.</span>
        </div>
        <ConditionalRender
          productsData={tigaPoinData}
          isLoading={false}
          model={"emptyData"}>
          <div className="grid sm:grid-cols-3 grid-cols-2 flex-1 gap-2">
            {tigaPoinData?.map((item, index) => (
              <div className={`flex flex-col bg-lightColor gap-2 rounded-md p-3 ${index === 2 && 'col-span-2 sm:col-span-1'}`} key={index}>
                <div className="flex flex-col w-14 aspect-auto rounded-lg overflow-clip">
                  <DiscoveyIcon className="w-full h-full"
                    fill={index === 0 ? "#24a186" : index === 1 ? "#BF58D9" : "#3BB2F4"} />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold">{item.title}</span>
                  <span className="text-sm opacity-70 text-left">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </ConditionalRender>

      </div>
      <ArticleUpdateSection
        articleUpdate={articleUpdate}
        articleUpdateLoading={articleUpdateLoading}
        type={"1"}
      />

      <BeritaSummarySection count={count} />
    </div>
  );
}

export default Homepages;
