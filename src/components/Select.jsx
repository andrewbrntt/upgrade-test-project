import clsx from "clsx";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

const Select = forwardRef(
  ({ error, options, placeholder, ...props }, forwardRef) => {
    return (
      <div className="flex flex-col mb-5">
        <div className="relative max-w-[300px]">
          <select
            className={clsx(
              "border border-black h-11 px-3 w-full",
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
          {!options && (
            <span className="flex absolute top-1/2 right-4 -translate-x-1/2 -translate-y-1/2">
              <span
                role="status"
                className="inline-block align-bottom rounded-full border-2 border-current border-r-transparent border-b-transparent animate-spin w-4 h-4"
              />
            </span>
          )}
        </div>
        {error && <span className="mt-1 text-red-500">{error}</span>}
      </div>
    );
  }
);

Select.propTypes = {
  error: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
};

export default Select;
