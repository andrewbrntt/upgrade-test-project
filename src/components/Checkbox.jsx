import clsx from "clsx";
import React, { forwardRef } from "react";

const Checkbox = forwardRef(({ children, error, ...props }, forwardRef) => {
  return (
    <div className="flex flex-col mb-5">
      <div className="flex items-center">
        <input
          className={clsx("cursor-pointer", error && "border-red-500")}
          ref={forwardRef}
          type="checkbox"
          {...props}
        />
        {children}
      </div>
      {error && <span className="mt-1 text-red-500">{error}</span>}
    </div>
  );
});

export default Checkbox;
