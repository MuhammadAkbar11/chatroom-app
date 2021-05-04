import React from "react";
import Header from "./Header";

const Template = ({ fixed, children, footer }) => {
  const fixedClass = fixed ? "h-100vh " : "min-h-100vh";
  return (
    <div className={`wrapper ${fixedClass}  `}>
      <Header />
      <main>{children}</main>
      {footer && (
        <footer className="footer overflow-hidden ">
          <h6>Footer</h6>
        </footer>
      )}
    </div>
  );
};

export default Template;
