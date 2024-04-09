import React, { useState } from "react";
import { ReactComponent as CheckboxIcon } from "../../assets/icon/ic_check_box.svg";
import { ReactComponent as CheckboxUncheckedIcon } from "../../assets/icon/ic_check_box_outline_blank.svg";

function CheckBox({ label, onChange, className }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      <button onClick={handleCheckboxChange}>
        {isChecked ? (
          <CheckboxIcon className="h-5 w-5" fill="#ffffff" />
        ) : (
          <CheckboxUncheckedIcon className="h-5 w-5" fill="#ffffff" />
        )}
      </button>
      <span className={`${className} text-sm`}>{label}</span>
    </div>
  );
}

export default CheckBox;
