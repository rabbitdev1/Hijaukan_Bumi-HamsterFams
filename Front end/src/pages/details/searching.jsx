import CryptoJS from "crypto-js";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { ReactComponent as SearchIcon } from "../../assets/icon/ic_search.svg";

import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as FAktaIcon } from "../../assets/icon/ic_fakta.svg";
import { ReactComponent as HoaxIcon } from "../../assets/icon/ic_hoax.svg";
import { ReactComponent as SortIcon } from "../../assets/icon/ic_sort.svg";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import LoadingLink from "../../components/common/LoadingLink";
import ConditionalRender from "../../components/ui/ConditionalRender";
import { apiClient } from "../../utils/api/apiClient";
import BrandSlider from "../homepages/BrandSlider";

function SearchingPAges() {
  const isWebSetting = localStorage.getItem("isWebSetting");
  const parseWebSetting = JSON.parse(isWebSetting);
  const [searchArticles, setsearchArticles] = useState([]);

  const [searchArticlesLoading, setsearchArticlesLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(true);

  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1000);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalData, setTotalData] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
  }, []);

  useEffect(() => {
    setSearch(data)
    fetchDatasearchArticles(data)
  }, [data]);

  useEffect(() => {
    fetchDatasearchArticles(search)
  }, [sort, currentPage]);

 

  const fetchDatasearchArticles = async (search) => {
    setsearchArticlesLoading(true);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const sha256Hash = CryptoJS.MD5(year + "-" + month + "-" + day).toString();

    const params = new URLSearchParams();
    params.append("api_key", sha256Hash);
    params.append("search_title", search ===null ? '' : search);
    params.append("filter", sort ? 'terbaru' : 'terlama');
    params.append("page", currentPage);
    params.append("limit", itemsPerPage);

    try {
      const response = await apiClient({
        baseurl: "search_articles",
        method: "POST",
        apiKey: sha256Hash,
        body: params,
      });
      setsearchArticlesLoading(false);
      if (response?.statusCode === 200) {
        setTotalPages(response?.result?.total_pages);
        setTotalData(response?.result?.total_data);
        setsearchArticles(response.result.data);

      } else {
        setsearchArticles([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((halamanSebelumnya) => halamanSebelumnya + 1);

    console.log(totalPages);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((halamanSebelumnya) => halamanSebelumnya - 1);
    }
  };

  return (
    <div className="flex flex-col gap-3 flex-1 lg:container lg:mx-auto xl:max-w-screen-xl" >
      <div className="flex sm:flex-row flex-col-reverse p-3 gap-3 ">
        <div className="flex flex-1 flex-col gap-3 justify-center ">
        <span className="md:text-4xl text-3xl font-bold" dangerouslySetInnerHTML={{ __html: parseWebSetting?.slogan1?.replace(/,/g, ',<br/>') }}>
          </span>
          <span className="text-sm opacity-70">
          {parseWebSetting?.slogan2}
          </span>

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

              <button onClick={() => {
                setCurrentPage(0);
                fetchDatasearchArticles(search);
              }}
                className="bg-[#24a186] flex items-center justify-center h-9 aspect-square rounded-full z-10">
                <SearchIcon className="h-5 w-5" fill="#ffffff" />
              </button>
            </div>
        </div>
        <div className="md:flex hidden flex-col items-center basis-5/12 xl:basis-4/12  relative">
          <div className="bg-[#B2C3FF] rounded-full w-full aspect-square "></div>
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
        </div>
      </div>


      <div className="flex flex-col gap-3 flex-1 lg:container lg:mx-auto xl:max-w-screen-xl p-3">
        <div className="flex flex-row justify-between gap-2">
          <span className="text-xl font-bold">{totalData} Pencarian Tersedia
          </span>
          <Button
            initialValue={sort ? 'Terbaru' : 'Terlama'}
            type="transparent"
            fill={'#24a186'}
            iconLeft={<SortIcon className={`h-5 w-5 ${sort ? 'rotate-180' : ''}`} />}
            className="inline-flex px-4 py-2 rounded-full text-sm border-1 border-[#24a186] color-[#24a186] gap-2"
            onClick={() => {
              setSort(!sort)
            }}
          />
        </div>
        <div className="flex flex-1 flex-col bg-lightColor p-3 gap-2 rounded-md shadow-inner">
          <ConditionalRender
            productsData={searchArticles}
            isLoading={searchArticlesLoading}
            model={"emptyData"}
          >
            {searchArticles?.slice(0, 20).map((item, index) => {
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
          {searchArticles?.length !== 0 && (
            <div className=" gap-2 flex right-3 justify-center">
              <Button
                disabled={currentPage <= 0}
                initialValue="Sebelumnya"
                type="fill"
                className={`border-[#24a186] border-2 text-[#24a186] dark:border-[#ffffff] h-[40px] dark:text-darkColor :inline-flex rounded-lg ${currentPage <= 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => {
                  handlePreviousPage();
                }}
              />
              <Button
                disabled={
                  searchArticles?.length === 0 || currentPage >= totalPages
                }
                initialValue="Selanjutnya"
                type="fill"
                className={`border-[#24a186] border-2 text-[#24a186] dark:border-[#ffffff] h-[40px] dark:text-darkColor inline-flex rounded-lg ${searchArticles?.length <= 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => handleNextPage()}
              />
            </div>
          )}
        </div>
      </div>
      <BrandSlider />
    </div>
  );
}

export default SearchingPAges;
