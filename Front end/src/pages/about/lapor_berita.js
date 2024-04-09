import React, { useEffect, useState } from "react";

import BrandSlider from "../homepages/BrandSlider";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

function LaporBeritaPAges() {
  const [webSetting, setWebSetting] = useState();

  const [pelapor, setPelapor] = useState("");
  const [tipepelapor, settipePelapor] = useState("");
  const [namapelapor, setnamaPelapor] = useState("");
  const [nomorpelapor, setnomorPelapor] = useState("");
  const [descpelapor, setdescPelapor] = useState("");

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const isWebSetting = localStorage.getItem("isWebSetting");
      setWebSetting(JSON.parse(isWebSetting));
    }
  }, []);
  const isDataValid = () => {
    return pelapor && tipepelapor && namapelapor && nomorpelapor && descpelapor;
  };
  const generateWhatsAppLink = () => {
    const baseURL =
      "https://api.whatsapp.com/send/?phone=" + webSetting?.nomor || "0";
    const message = `
          *Formulir Laporan * 
          Pelapor : ${pelapor}
          Tipe Laporan : ${tipepelapor}
          Nama : ${namapelapor}
          Nomor WhatsApp : ${nomorpelapor}
          Deskripsi : ${descpelapor}
        `;

    const encodedMessage = encodeURIComponent(message.trim());
    const finalURL = `${baseURL}&text=${encodedMessage}&type=phone_number&app_absent=0`;

    return finalURL;
  };

  return (
    <div className="flex flex-col gap-3 flex-1 ">
      <div className="bg-[#24a186] flex flex-col items-center px-5 pt-5 pb-40 ">
        <span className="text-lg font-bold text-darkColor">Lapor Berita</span>
        <span className="text-base text-darkColor">Home / Lapor Berita</span>
      </div>
      <div className="flex flex-col gap-3 flex-1 lg:container lg:mx-auto xl:max-w-screen-xl -mt-36 p-3">
        <div className="flex flex-1 md:flex-row flex-col gap-3 bg-lightColor p-3 rounded-md shadow-inner">
          <div className="flex flex-1 flex-col gap-2 justify-start items-start">
          <img
              alt="ornamen_1"
              src={require("../../assets/image/people.png")}
              className="w-full aspect-square object-contain  pointer-events-none"
            />
          </div>
          <div className="flex basis-7/12 flex-col gap-2">
            <div className="flex flex-col">
              <h5 className=" font-bold ">Formulir Laporan Berita</h5>
              <span className="text-sm opacity-70  ">
                Silakan masukan laporan anda
              </span>
            </div>
            <Input
              id={"name"}
              label={"Kategori Laporan"}
              value={pelapor}
              onChange={(value) => {
                const inputValue = value;
                setPelapor(inputValue);
              }}
              type={"select"}
              options={
                '[{"value": "Individu","text": "Individu"},{"value": "Perusahaan","text": "Perusahaan"}]'
              }
              bgcolor={"bg-[#edeeee]"}
              placeholder={`Pilih laporan`}
            />
            <Input
              id={"name"}
              label={"Jenis Laporan"}
              value={tipepelapor}
              onChange={(value) => {
                const inputValue = value;
                settipePelapor(inputValue);
              }}
              type={"select"}
              options={
                '[{"value": "Laporkan Berita", "text": "Laporkan Berita"}] '
              }
              bgcolor={"bg-[#edeeee]"}
              placeholder={`Pilih tipe laporan`}
            />
            <Input
              id={"name"}
              label={"Nama Pelapor"}
              value={namapelapor}
              onChange={(value) => {
                const inputValue = value;
                setnamaPelapor(inputValue);
              }}
              type={"text"}
              options={[]}
              bgcolor={"bg-[#edeeee]"}
              placeholder={`Masukan Nama`}
            />
            <Input
              label="Nomor Whatsapp"
              id="phone"
              value={nomorpelapor}
              type="tel"
              placeholder={"Masukan Nomor Whatsapp"}
              onChange={(event) => setnomorPelapor(event)}
            />
            <Input
              id={"description"}
              label={"Deskripsi"}
              value={descpelapor}
              onChange={(value) => {
                const inputValue = value;
                setdescPelapor(inputValue);
              }}
              type={"textarea"}
              bgcolor={"bg-[#edeeee]"}
              placeholder={`Masukan Deskripsi`}
            />
            <Button
              initialValue="Kirim Laporan"
              type="fill"
              className="bg-[#24a186] text-darkColor flex-1"
              onClick={() => {
                if (isDataValid()) {
                  const link = generateWhatsAppLink();
                  window.open(link, "_blank");
                } else {
                  alert("Harap isi semua data sebelum mengirim pesan!");
                }
              }}
            />
          </div>
        </div>
        <BrandSlider />
      </div>
    </div>
  );
}

export default LaporBeritaPAges;
