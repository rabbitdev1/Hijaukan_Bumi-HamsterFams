import React, { useState } from "react";
import { ReactComponent as QuestionIcon } from "../../assets/icon/ic_question-circle.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Input from "../common/Input";
import ConditionalRender from "../ui/ConditionalRender";

import ModalContent from "../ui/Modal/ModalContent";

const InputFormComponent = ({
  inputForms,
  productLoading,
  setInputForms,
  productData,
  isBantuan,
}) => {
  const [ishelp, setIsHelp] = useState(false);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputForms];
    newInputs[index].value = value;
    setInputForms(newInputs);
  };
  return (
    <div
      className="flex flex-col rounded-lg shadow-inner bg-cardLight"
      id={"input_detail"}
    >
      <div className="flex flex-row items-center gap-1 rounded-md  bg-gradient-to-bl from-[#24a186] to-[#ffdc05] text-darkColor">
        <div className=" items-center justify-start flex  bg-[#24a186] clip-path-number p-3 h-12 w-16 ">
          <span className="font-bold text-xl italic">2</span>
        </div>
        <span className="text-base px-1 font-medium line-clamp-1">
          Masukan Detil Akun
        </span>
        {isBantuan === "" ? null : (
          <button
            onClick={() => {
              setIsHelp(true);
            }}
          >
            <QuestionIcon className={"w-5 h-5"} fill={"#ffffff"} />
          </button>
        )}
      </div>
      <ConditionalRender
        productsData={inputForms}
        isLoading={productLoading}
        model={"emptyForm"}
      >
        <div
          className={`grid grid-cols-1 ${
            inputForms.length === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2"
          } gap-3  p-3 pt-2`}
        >
          {inputForms.map((input, index) => (
            <Input
              key={index}
              id={input.title}
              label={input.title}
              name={input.title}
              value={input.value === undefined ? "" : input.value}
              onChange={(value) => {
                const inputValue = value;
                if (inputValue.length <= 200) {
                  handleInputChange(index, inputValue);
                }
              }}
              type={input.type}
              options={input.options}
              bgcolor={"bg-[#edeeee]"}
              placeholder={`${input.placeholder}`}
            />
          ))}
        </div>
      </ConditionalRender>

      {productData?.info_form && (
        <div className="flex flex-row gap-2 rounded-lg p-2 items-center border-t border-[#21212158] ">
          <span className="opacity-60 text-xs flex-1 m-2">
            {productData?.info_form}
          </span>
        </div>
      )}

      <ModalContent
        children={
          <LazyLoadImage
            src={isBantuan}
            alt={isBantuan}
            className=" object-contain w-full  rounded-lg"
            effect="blur"
          />
        }
        active={ishelp}
        onClose={() => setIsHelp(false)}
      />
    </div>
  );
};

export default InputFormComponent;
