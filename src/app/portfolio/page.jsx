import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

const Portfolio = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.selectTitle}>Choose a gallery</h1>
      <div className="lg:flex-row flex  flex-col items-center lg:items-center  justify-center  gap-4">
        <Link href="/portfolio/illustrations" className={`${styles.item} hover:text-[#53c28b]`}>
          <span className="absolute  right-[10px] bottom-[10px] text-[30px] lg:text-[40px] font-bold ">Illustrations</span>
        </Link>
        <Link href="/portfolio/websites" className={`${styles.item} hover:text-[#53c28b]`}>
          <span className="absolute  right-[10px] bottom-[10px] text-[30px] lg:text-[40px] font-bold ">Websites</span>
        </Link>
        <Link href="/portfolio/applications" className={`${styles.item} hover:text-[#53c28b]`}>
          <span className="absolute  right-[10px] bottom-[10px] text-[30px] lg:text-[40px] font-bold ">Application</span>
        </Link>
      </div>
    </div>
  );
};

export default Portfolio;
