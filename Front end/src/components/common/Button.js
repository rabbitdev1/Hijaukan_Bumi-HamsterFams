import { Link } from "react-router-dom";
import React from "react";
import LoadingLink from "./LoadingLink";

function Button({
  initialValue,
  href,
  state,
  color,
  type,
  iconLeft,
  onClick,
  iconRight,
  className,
  disabled,
}) {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  const commonProps = {
    onClick: handleClick,
    className: ` ${
      type === "fill" ? "px-4" : "p-2"
    } ${className}  rounded-full text-sm h-auto py-2.5 hover:opacity-80  justify-center items-center gap-2 flex select-none no-underline font-inter`,
    disabled,
  };

  const content = (
    <>
      {iconLeft && React.cloneElement(iconLeft, { fill: color })}
      {initialValue && (
        <span className="font-medium line-clamp-1">{initialValue}</span>
      )}
      {iconRight && React.cloneElement(iconRight, { fill: color })}
    </>
  );

  return (
    <div className="inline-flex font-inter">
      {href ? (
        <LoadingLink to={href} state={state} {...commonProps}>
          {content}
        </LoadingLink>
      ) : (
        <button {...commonProps}>{content}</button>
      )}
    </div>
  );
}

export default Button;
