import clsx from "clsx";
import React, { forwardRef } from "react";
import PropTypes from "prop-types";

// Standard input component with error styling
const Input = forwardRef(({ requirements, error, isRequired, ...props }, forwardRef) => {
  return (
    <div className="flex flex-col mb-5">
      <input
        className={clsx(
          "border border-black h-11 px-3",
          error && "border-red-700 focus:outline-none focus:ring focus:ring-red-700"
        )}
        ref={forwardRef}
        {...props}
        required={isRequired}
      />
      { requirements &&
        <span>{requirements}</span>
      }
      { error && (
        <span className="mt-1 text-rose-700 font-bold" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

Input.propTypes = {
    error: PropTypes.string,
    requirements: PropTypes.string,
    children: PropTypes.node,
    isRequired: PropTypes.bool
};

export default Input;
