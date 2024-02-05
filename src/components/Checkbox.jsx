import clsx from "clsx";
import React, { forwardRef } from "react";

// Standard checkbox component with error styling
// Usually I would add a label to the input but for this specific use case, a link is not accessible when part of a label so opted for no label
// Assumption: safe to not use label for checkbox and render text instead
const Checkbox = forwardRef(({ children, error, isRequired, ...props }, forwardRef) => {
  return (
    <div className="flex flex-col mb-5">
      <div className="flex items-center">
        <input
          className={clsx("cursor-pointer", error && "outline outline-red-700 focus:outline-none focus:ring focus:ring-red-700")}
          ref={forwardRef}
          type="checkbox"
          {...props}
            required={isRequired}
        />
        {children}
      </div>
      { error && (
        <span className="mt-1 text-rose-700 font-bold" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

export default Checkbox;
