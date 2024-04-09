import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ConditionalRender from '../../components/ui/ConditionalRender';
import { ReactComponent as RowIcon } from "../../assets/icon/ic_row.svg";

function TigaLangkahSection({ data, loading, }) {
  const [tab, setTab] = useState(0);

  return (
    <div className="flex md:flex-row flex-col-reverse p-3 items-center gap-3  overflow-clip">
      <div className="flex flex-col gap-3 flex-1 w-full">
        <div className="flex flex-col gap-2 ">
          <span className="text-sm  text-[#24a186]">Cara Kerja</span>
          <span className="md:text-3xl text-2xl ">3 Langkah Menjadi <br />
            Peduli <b className="text-[#24a186]">Lingkungan</b>
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <ConditionalRender
            productsData={data}
            isLoading={loading}
            model={"emptyData"}>
            {data.map((item, index) => {
              return (
                <button onClick={() => { setTab(index) }}
                  key={index} className="flex gap-2 flex-row p-3 items-center bg-lightColor rounded-md shadow-inner">
                  <div className="flex flex-col w-12 h-full">
                    <div className={`flex flex-col gap-2 w-full items-center justify-center aspect-square rounded-lg ${index === 0 ? 'bg-[#24a186]/10' : index === 1 ? 'bg-[#2B3DC7]/10' : index === 2 ? 'bg-[#3DCD65]/10' : 'bg-[#24a186]/10'}`}>
                      <span className={`text-lg font-bold ${index === 0 ? 'text-[#24a186]' : index === 1 ? 'text-[#2B3DC7]' : index === 2 ? 'text-[#3DCD65]' : 'text-[#24a186]'}`}>{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center flex-1 h-full items-start">
                    <span className="text-lg font-bold">{item.title}</span>
                    {tab === index && <span className="text-sm opacity-70 text-left">{item.desc}</span>}
                  </div>
                  <div className={`flex w-4 h-4 transform ${tab === index ? ' rotate-0' : ' -rotate-90'}`} >
                    <RowIcon className="w-full h-full" />
                  </div>
                </button>
              )
            })}
          </ConditionalRender>
        </div>
      </div>
      <div className="flex flex-1 pt-10 w-full aspect-square max-h-96 relative">
        <div className="flex flex-col z-10 rounded-xl w-full h-full">
          <iframe width="100%" height="100%"
            src="https://www.youtube.com/embed/b3zJqv8sV0A"
            title="Infografis : HOAX" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write;  encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
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
            src={require("../../assets/image/ornament_2.png")}
            className="w-full h-full object-contain  pointer-events-none"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default TigaLangkahSection;
