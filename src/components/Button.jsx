import clsx from "clsx";
import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const styles = {
  primary: "text-white bg-blue-700 hover:bg-blue-600 hover:border-blue-600",
  secondary: "text-blue-700 bg-white",
};

// Standard button component with loading and two variants
const Button = forwardRef(
  ({ className, cta, loading, variant = "primary", ...props }, forwardRef) => {
    return (
      <button
        className={clsx(
          "relative border rounded py-2 px-4 border-blue-700 focus:ring focus:ring-blue-700",
          variant === "primary" ? styles.primary : styles.secondary,
          className
        )}
        ref={forwardRef}
        {...props}
      >
        <span className={clsx(loading && "opacity-0")}>{cta}</span>
        {loading && (
          <span className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span
              role="status"
              className="inline-block align-bottom rounded-full border-2 border-current border-r-transparent border-b-transparent animate-spin w-4 h-4"
            />
          </span>
        )}
      </button>
    );
  }
);

Button.propTypes = {
    className: PropTypes.string,
    cta: PropTypes.string,
    loading: PropTypes.bool,
    variant: PropTypes.string
};
export default Button;
