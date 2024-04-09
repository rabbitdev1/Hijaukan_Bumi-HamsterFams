import React, { useEffect, useState } from "react";

import CryptoJS from "crypto-js";
import Button from "../../components/common/Button";
import { apiClient } from "../../utils/api/apiClient";
import BeritaSummarySection from "../homepages/BeritaSummarySection";
import BrandSlider from "../homepages/BrandSlider";

function AboutPages() {
  const isWebSetting = localStorage.getItem("isWebSetting");
  const parseWebSetting = JSON.parse(isWebSetting);

  
  const [count, setCount] = useState({});

  useEffect(() => {
    fetchCountArticle();
  }, []);

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
    <div className="flex flex-col gap-3 flex-1 ">
      <div className="bg-[#24a186] flex flex-col items-center px-5 pt-5 pb-40 ">
        <span className="text-lg font-bold text-darkColor">About</span>
        <span className="text-base text-darkColor">Home / About</span>
      </div>
      <div className="flex flex-col gap-3 flex-1 lg:container lg:mx-auto xl:max-w-screen-xl -mt-36 p-3">
        <div className="flex flex-1 flex-col bg-lightColor p-3 rounded-md shadow-inner">
          <div
            className="text-base "
            dangerouslySetInnerHTML={{ __html: parseWebSetting?.about }}
          />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <span className="text-2xl font-bold">Tim Pengembang</span>
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 flex-row gap-3">
            {[
              {
                poto:require('../../assets/team/rizal.jpeg'),
                nama: "Rizal sujana",
                npm: "21552011034",
                campus: "Universitas Teknologi Bandung",
                Linkedin: "https://www.linkedin.com/in/rizal-sujana/",
              },
              {
                poto:require('../../assets/image/profile.png'),
                nama: "Asep Sutrisna Suhada Putra",
                npm: "21552011123",
                campus: "Universitas Teknologi Bandung",
                Linkedin: "https://www.linkedin.com/in/",
              },
              {
                poto:require('../../assets/image/profile.png'),
                nama: "Esa Kurniawan Putra",
                npm: "21552011426",
                campus: "Universitas Teknologi Bandung",
                Linkedin: "https://www.linkedin.com/in/",
              },
              {
                poto:require('../../assets/image/profile.png'),
                nama: "Febrina Qoonitah",
                npm: "21552011134",
                campus: "Universitas Teknologi Bandung",
                Linkedin: "https://www.linkedin.com/in/",
              },
              {
                poto:require('../../assets/image/profile.png'),
                nama: "Gilang Nur Rizki",
                npm: "22552011037",
                campus: "Universitas Teknologi Bandung",
                Linkedin: "https://www.linkedin.com/in/",
              },
            ].map((item, index) => (
              <div className="flex flex-1 flex-col bg-lightColor items-center p-3 rounded-md shadow-inner">
                <div className="flex flex-1 flex-col p-4 w-full gap-2">
                  <img
                  alt={item.nama}
                  src={item.poto} className="flex object-cover object-top flex-1 flex-col gap-2 bg-red-200 aspect-square rounded-full" />
                </div>
                <span className="text-lg font-bold text-center">{item.nama}</span>
                <span className="text-lg font-bold ">{item.npm}</span>
                <span className="text-sm mb-2">{item.campus}</span>
                <Button
                  initialValue="Linkedin"
                  type="fill"
                  className="bg-[#24a186] text-darkColor flex-1"
                  onClick={() => {
                    window.open(item.Linkedin, "_blank");
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <BrandSlider />
        <BeritaSummarySection count={count} />
      </div>
    </div>
  );
}

export default AboutPages;
