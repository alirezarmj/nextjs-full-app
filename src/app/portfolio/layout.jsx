import React from "react";
import styles from "./page.module.css";

const Layout = ({ children }) => {
  return (
    <div>
      <h1 className="lg:text-[100px] text-[50px] ">Our Works</h1>
      {children}
    </div>
  );
};

export default Layout;
