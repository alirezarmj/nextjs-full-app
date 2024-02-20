"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsSun, BsMoon } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  const session = useSession();
  const [nav, setNav] = useState(false);

  return (
    <div className="w-full h-[80px] ">
      <div className="max-w-[1240px] h-full mx-auto">
        <div className="flex  justify-between items-center h-full w-full">
          <div className="flex items-center gap-2 pr-2">
            <Link href="/" className="xl:text-[22px] text-[18px] whitespace-nowrap font-bold">
              Web Developer
            </Link>

            <div className="hidden md:flex  rounded-md duration-150">
              <DarkModeToggle />
            </div>
          </div>

          <ul className=" md:flex items-center lg:gap-6 gap-2 text-2xl hidden ">
            {links.map((link) => (
              <Link key={link.id} href={link.url} className=" hover:text-white duration-500 text-[14px] md:text-lg lg:text-xl">
                {link.title}
              </Link>
            ))}
            {session.status === "authenticated" && (
              <button
                className="p-[5px] border-none bg-[#53c28b] text-white cursor-pointer text-lg  whitespace-nowrap  transition duration-150 px-3 py-1 hover:bg-gray-500  rounded-md hover:text-white/60"
                onClick={signOut}
              >
                Logout
              </button>
            )}
          </ul>
          {/* Mobile Menu */}
          <div className="md:hidden block">
            <RxHamburgerMenu className="cursor-pointer" size={30} onClick={() => setNav((prev) => !prev)} />
          </div>
          <div onClick={() => setNav(!nav)} className={nav ? "bg-black/60 z-10 top-0 left-0 absolute w-full h-screen md:hidden duration-500  ease-in-out" : "hidden"} />
          <div
            onClick={(e) => e.stopPropagation()}
            className={
              nav
                ? "h-screen w-[50%] z-10  left-0 top-0 absolute dark:bg-gray-800 bg-white flex flex-col p-4 md:hidden  duration-500 ease-in-out"
                : "h-screen absolute w-[40%] z-10 md:hidden duration-500  left-[-100%] top-0 "
            }
          >
            {" "}
            {/* ref={boxRef} */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-black text-base  md:text-xl font-bold dark:text-white">Nextjs Meetups </h1>
              <RxCross2 className="cursor-pointer" size={30} onClick={() => setNav((prev) => !prev)} />
            </div>
            <div className="text-pink-600 flex flex-col gap-10 sm:text-lg items-center  text-xs p-6  ">
              <button
                className="hover:bg-gray-500 hover:text-white/60 transition duration-150 px-4 py-2 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                  setNav(false);
                }}
              >
                Home
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/portfolio");
                  setNav(false);
                }}
                className="whitespace-nowrap  transition duration-150 px-4 py-2 hover:bg-gray-500  rounded-md hover:text-white/60"
              >
                Portfolio
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/blog");
                  setNav(false);
                }}
                className="whitespace-nowrap  transition duration-150 px-4 py-2 hover:bg-gray-500  rounded-md hover:text-white/60"
              >
                Blog
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/about");
                  setNav(false);
                }}
                className="whitespace-nowrap  transition duration-150 px-4 py-2 hover:bg-gray-500  rounded-md hover:text-white/60"
              >
                About
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/contact");
                  setNav(false);
                }}
                className="whitespace-nowrap  transition duration-150 px-4 py-2 hover:bg-gray-500  rounded-md hover:text-white/60"
              >
                Contact
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/dashboard");
                  setNav(false);
                }}
                className="whitespace-nowrap  transition duration-150 px-4 py-2 hover:bg-gray-500  rounded-md hover:text-white/60"
              >
                Dashboard
              </button>
              {session.status === "authenticated" && (
                <button
                  className="p-[5px] border-none bg-[#53c28b] text-white cursor-pointer  whitespace-nowrap  transition duration-150 px-4 py-2 hover:bg-gray-500  rounded-md hover:text-white/60"
                  onClick={signOut}
                >
                  Logout
                </button>
              )}
              {/* Dark Mode */}
              <div className="  transition duration-150 ">
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="h-[100px] flex justify-between items-center">
    //   <Link href="/" className="text-[22px] font-bold">
    //     Web Developer
    //   </Link>
    //   <div className="flex items-center gap-[20px]">
    //     <DarkModeToggle />
    //  {links.map((link) => (
    //   <Link key={link.id} href={link.url} className="flex items-center gap-[20px]">
    //     {link.title}
    //  </Link>
    // ))}
    // {session.status === "authenticated" && (
    //   <button className="p-[5px] border-none bg-[#53c28b] text-white cursor-pointer rounded-[3px]" onClick={signOut}>
    //     Logout
    //   </button>
    // )}
    //   </div>
    // </div>
  );
};

export default Navbar;
