import clsx from "clsx";
import React, { forwardRef } from "react";

const Select = forwardRef(
  ({ error, options, placeholder, ...props }, forwardRef) => {
    return (
      <div className="flex flex-col mb-5">
        <select
          className={clsx(
            "border border-black h-11 px-3",
            error && "border-red-500"
          )}
          ref={forwardRef}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options ? (
            options.map((o) => (
              <option key={o} value={o} className="uppercase">
                {o}
              </option>
            ))
          ) : (
            <option value={null} disabled>
              Loading...
            </option>
          )}
        </select>
        {error && <span className="mt-1 text-red-500">{error}</span>}
      </div>
    );
  }
);

export default Select;
