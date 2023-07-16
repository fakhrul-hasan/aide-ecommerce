"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CiCircleChevLeft, CiCircleChevRight, CiUser } from "react-icons/ci";
import { BsClipboard } from "react-icons/bs";
import { MdOutlineContentCopy, MdKeyboardArrowDown } from "react-icons/md";

const SideDrawer = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`relative py-4 h-[100vh] bg-gray-400 transition-all duration-300 ease-in ${
        isOpen ? "w-10 px-0" : "w-80 px-4"
      }`}
    >
      <button className="absolute top-3 right-2" onClick={toggleDrawer}>
        {isOpen ? (
          <CiCircleChevRight className="text-xl" />
        ) : (
          <CiCircleChevLeft className="text-xl" />
        )}
      </button>
      <h2 className={`font-medium ${isOpen && "hidden"}`}>Assignment</h2>
      {isOpen ? (
        <div className="flex flex-col mt-6 gap-4">
          <details className="dropdown">
            <summary className="w-full flex items-center justify-center gap-2"><BsClipboard /></summary>
            <ul className="p-2 rounded-box shadow dropdown-content z-[1] bg-gray-400 w-52 left-10">
              <li>
                <a>Sub Menu-1</a>
              </li>
              <li>
                <a>Sub Menu-3</a>
              </li>
            </ul>
          </details>
          <Link href="#" className="flex items-center justify-center">
            <CiUser />
          </Link>
          <Link href="#" className="flex items-center justify-center">
            <MdOutlineContentCopy />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col mt-6 gap-4">
          <details className="dropdown">
            <summary className="w-full flex items-center gap-2"><BsClipboard /> All Employees <MdKeyboardArrowDown /></summary>
            <ul className="p-2 rounded-box inline-block">
              <li>
                <a>Sub Menu-1</a>
              </li>
              <li>
                <a>Sub Menu-3</a>
              </li>
            </ul>
          </details>
          <Link href="/addEmployee" className="flex items-center gap-2">
            <CiUser /> Add Employee
          </Link>
          <Link href="/products" className="flex items-center gap-2">
            <MdOutlineContentCopy /> All Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default SideDrawer;
