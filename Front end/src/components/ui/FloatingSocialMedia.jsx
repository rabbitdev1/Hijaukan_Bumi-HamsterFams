import React, { useEffect, useState } from 'react';

const FloatingSocialMedia = () => {
  const [webSetting, setWebSetting] = useState();

  const generateWhatsAppLink = () => {
    const baseURL =
      "https://api.whatsapp.com/send/?phone=" + webSetting?.nomor|| "0";
    const message = `
          *Selamat Siang, kami dari tim Hijaukan Bumi* 
        `;

    const encodedMessage = encodeURIComponent(message);
    const finalURL = `${baseURL}&text=${encodedMessage}&type=phone_number&app_absent=0`;

    return finalURL;
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const isWebSetting = localStorage.getItem("isWebSetting");
      setWebSetting(JSON.parse(isWebSetting));
    }
  }, []);

  return (
    <div className="fixed bottom-0 right-0 m-4 "
      onClick={() => {
        const link = generateWhatsAppLink();
        window.open(link, "_blank");
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <button className={`'opacity-100'`}>
          <img alt='floating' src={require('../../assets/floating/wa.png')}
            className='w-14 aspect-square' />
        </button>
      </div>
    </div>
  );
};

export default FloatingSocialMedia;
