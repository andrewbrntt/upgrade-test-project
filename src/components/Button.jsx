import clsx from "clsx";
import React, { forwardRef } from "react";

const styles = {
  primary: "text-white bg-blue-700 hover:bg-blue-600 hover:border-blue-600",
  secondary: "text-blue-700 bg-white",
};

const Button = forwardRef(
  ({ variant = "primary", className, ...props }, forwardRef) => {
    return (
      <button
        className={clsx(
          "border rounded py-2 px-4 border-blue-700 focus:ring focus:ring-blueberry-700",
          variant === "primary" ? styles.primary : styles.secondary,
          className
        )}
        ref={forwardRef}
        {...props}
      />
    );
  }
);

export default Button;
