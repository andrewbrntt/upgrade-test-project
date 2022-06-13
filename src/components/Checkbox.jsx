import clsx from "clsx";
import React, { forwardRef } from "react";

const Checkbox = forwardRef(({ error, ...props }, forwardRef) => {
  return (
    <div className="flex flex-col mb-5">
      <div className="flex items-center">
        <input
          className={clsx("cursor-pointer", error && "border-red-500")}
          ref={forwardRef}
          type="checkbox"
          {...props}
        />
        <span className="ml-2">
          I agree to{" "}
          <a
            className="underline text-blue-500"
            href="https://www.upgrade.com/funnel/borrower-documents/TERMS_OF_USE"
            target="_blank"
          >
            Terms and Conditions
          </a>
          .
        </span>
      </div>
      {error && <span className="mt-1 text-red-500">{error}</span>}
    </div>
  );
});

export default Checkbox;
