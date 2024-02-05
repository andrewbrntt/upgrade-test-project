import clsx from "clsx";
import React, { forwardRef } from "react";

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

export default Input;
