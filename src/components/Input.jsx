import clsx from "clsx";
import React, { forwardRef } from "react";

// Standard input component with error styling
const Input = forwardRef(({ error, ...props }, forwardRef) => {
  return (
    <div className="flex flex-col mb-5">
      <input
        className={clsx(
          "border border-black h-11 px-3",
          error && "border-red-500"
        )}
        ref={forwardRef}
        {...props}
      />
      {error && (
        <span className="mt-1 text-red-500" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

export default Input;
