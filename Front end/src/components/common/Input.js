import React, { useState } from "react";
// import { ReactComponent as EyeIcon } from "../../assets/icon/ic_eye.svg";
// import { ReactComponent as EyeSlashIcon } from "../../assets/icon/ic_eye-slash.svg";
import PhoneInput from "react-phone-number-input";

function Input({
  label,
  icon,
  id,
  value,
  options,
  color,
  type,
  disabled,
  placeholder,
  onChange,
  OnSubmit,
  OnSubmit1,
  className,
}) {
  const [isPassword, setIsPassword] = useState(false);

  const handlePhoneInputChange = (inputValue) => {
    if (inputValue?.startsWith("+0")) {
      inputValue = "+62" + inputValue.slice(2);
    }

    onChange(inputValue);
  };

  let parsedOptions = [];
  try {
    parsedOptions = JSON.parse(options);
  } catch (error) {
    // Handle JSON parsing error here
  }

  return type === "tel" ? (
    <div className="flex flex-col gap-2 w-full">
      {label && <span className=" text-base font-bold">{label}</span>}
      <div className="flex flex-row gap-2 bg-[#ffffff] items-center p-2.5 rounded-lg border-1 border-gray-300  ">
        <PhoneInput
          placeholder={placeholder}
          value={value}
          className="h-7 flex-1 text-sm text-[#021D39] w-full"
          defaultCountry="ID"
          countries={["ID"]}
          onChange={handlePhoneInputChange}
        />
      </div>
    </div>
  ) : type === "select" ? (
    <div className="flex flex-col gap-2 w-full">
      {label && <span className=" text-base font-bold">{label}</span>}
      <div className="flex flex-row gap-2 bg-[#ffffff] items-center p-2.5 rounded-lg border-1 border-gray-300  ">
        <select
          onChange={(event) => onChange(event.target.value)}
          className="h-7 flex-1 text-sm text-[#212121]"
        >
          <option value="" disabled selected>
            {placeholder}
          </option>
          {parsedOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  ) : type === "promo" ? (
    <div className="flex flex-col gap-2 w-full">
      {label && <span className=" text-base font-bold">{label}</span>}
      <div className="flex flex-row bg-[#ffffff] border-1 border-gray-300 items-center pl-2.5 rounded-lg relative ">
        {icon &&
          React.cloneElement(icon, { className: "h-5 w-6", fill: color })}
        <input
          type={"text"}
          id={id}
          className="h-7  text-sm m-2.5 flex-1 w-full text-[#021D39]"
          name={label}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          style={{ outline: "none" }}
          onChange={(event) => onChange(event.target.value)}
        />
        {disabled && (
          <div className="flex bg-[#2b85ec] absolute bottom-0 right-[41px] p-1 px-2 rounded-tl-xl">
            <span className=" text-[10px] font-bold">PROMO TERPASANG</span>
          </div>
        )}
        {!disabled ? (
          <button
            onClick={() => OnSubmit()}
            className="flex  justify-center items-center px-3 bg-[#24a186] h-12 rounded-tr-lg p-2 rounded-br-lg"
          >
            <span className="text-darkColor text-sm font-bold">Reedem</span>
          </button>
        ) : (
          <button
            onClick={() => OnSubmit()}
            className="flex  justify-center items-center px-3 bg-[#24a186] h-12 rounded-tr-lg p-2 rounded-br-lg"
          >
            <span className=" text-sm font-bold text-[#212121]">X</span>
          </button>
        )}
      </div>
    </div>
  ) : type === "jumlah_joki" ? (
    <div className="flex flex-col gap-2 w-full">
      {label && <span className=" text-base font-bold">{label}</span>}
      <div className="flex flex-row bg-[#ffffff] items-center pl-2.5 rounded-lg border-1 border-gray-300 ">
        {icon &&
          React.cloneElement(icon, { className: "h-5 w-6", fill: color })}
        <input
          type={"text"}
          id={id}
          className="h-7  text-sm m-2.5 flex-1 w-full text-[#021D39]"
          name={label}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          style={{ outline: "none" }}
          onChange={(event) => onChange(event.target.value)}
        />
        <div className="flex flex-row">
          {parseInt(value) > 1 && (
            <button
              onClick={() => OnSubmit()}
              className={`flex text-darkColor flex-row w-full items-center justify-center h-12 px-3 rounded-l-lg bg-[#2380EA] space-x-3`}
            >
              <span className="text-lg font-bold">-</span>
            </button>
          )}
          <button
            onClick={() => OnSubmit1()}
            className={`flex text-darkColor  flex-row w-full  items-center justify-center h-12 px-3 rounded-r-lg bg-[#2380EA] space-x-3`}
          >
            <span className="text-lg font-bold">+</span>
          </button>
        </div>
      </div>
    </div>
  ) : type === "textarea" ? (
    <div className="flex flex-col gap-2 w-full">
      {label && <span className=" text-base font-bold">{label}</span>}
      <div
        className={`flex flex-row gap-2 bg-[#ffffff] items-center p-2.5 ${className} rounded-lg border-1 border-gray-300 `}
      >
        {icon &&
          React.cloneElement(icon, { className: "h-5 w-6", fill: color })}
        <textarea
          id={id}
          className="h-full flex-1 w-full text-sm text-[#021D39] min-h-[150px]"
          name={label}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          style={{ outline: "none" }}
          onChange={(event) => onChange(event.target.value)}
          rows="5"
        />
      </div>
    </div>
  ) : type === "search" ? (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <span className=" text-base font-bold text-left">{label}</span>
      )}
      <div
        className={`flex flex-row gap-2 bg-[#ffffff] items-center p-2.5 ${className} rounded-lg border-1 border-gray-300 `}
      >
        {icon &&
          React.cloneElement(icon, { className: "h-5 w-6", fill: color })}
        <input
          type={type === "password" && isPassword ? "text" : type}
          id={id}
          className="h-7 flex-1 w-full text-sm text-lightColor bg-transparent"
          name={label}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          style={{ outline: "none" }}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <span className=" text-base font-bold text-left">{label}</span>
      )}
      <div
        className={`flex flex-row gap-2 bg-[#ffffff] items-center p-2.5 ${className} rounded-lg border-1 border-gray-300 `}
      >
        {icon &&
          React.cloneElement(icon, { className: "h-5 w-6", fill: color })}
        <input
          type={type === "password" && isPassword ? "text" : type}
          id={id}
          className="h-7 flex-1 w-full text-sm text-[#021D39] bg-transparent"
          name={label}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          style={{ outline: "none" }}
          onChange={(event) => onChange(event.target.value)}
          onFocus={(e) =>
            e.target.addEventListener(
              "wheel",
              function (e) {
                e.preventDefault();
              },
              { passive: false },
            )
          }
        />
        {/* {type === "password" && (
          <button onClick={() => setIsPassword(!isPassword)}>
            {isPassword ? (
              <EyeIcon className="h-7 w-6" fill="#666666" />
            ) : (
              <EyeSlashIcon className="h-7 w-6" fill="#666666" />
            )}
          </button>
        )} */}
      </div>
    </div>
  );
}

export default Input;
