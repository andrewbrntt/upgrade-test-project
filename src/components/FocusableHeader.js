import React, { useEffect, useRef } from 'react'
import PropTypes from "prop-types";
import clsx from "clsx";

const FocusableHeader = ({children, className, ...props}) => {
  const heading = useRef(null)
  useEffect(() => heading.current?.focus(), [])

  return (
    <h1 tabIndex={-1} ref={heading} className={clsx("focus:outline-none", className)} {...props}>
      {children}
    </h1>
  );
}

FocusableHeader.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string
};
export default FocusableHeader