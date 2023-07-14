import React from "react";
import { CiDiscount1, CiShoppingCart, CiUser, CiSearch, CiLocationOn, CiDeliveryTruck } from "react-icons/ci";
import { BsListUl } from "react-icons/bs";

const NavBar = () => {
  return (
    <nav>
      <div className="flex gap-8">
        <div className="flex-1">
          <a className="text-xs">Assignment of AIDE</a>
        </div>
        <div className="flex-none flex gap-1 items-center">
        <CiLocationOn className="text-[#008ECC]" />
          <a href="#" className="text-xs">Deliver to <span className="font-medium">423651</span></a>
        </div>
        <div className="flex-none flex gap-1 items-center">
        <CiDeliveryTruck className="text-[#008ECC]" />
          <a href="#" className="text-xs">Track your order</a>
        </div>
        <div className="flex-none flex gap-1 items-center">
        <CiDiscount1 className="text-[#008ECC]" />
          <a href="#" className="text-xs">All Offers</a>
        </div>
      </div>
      <div className="navbar p-0">
  <div className="navbar-start w-1/4">
    <a className="normal-case text-xl cursor-pointer text-[#008ECC] font-medium">Fakhrul Mart</a>
  </div>
  <div className="navbar-center w-1/2 relative">
  <CiSearch className="absolute left-2 text-[#008ECC] text-lg" />
  <input type="text" placeholder="Search essentials, groceries and more..." className="input input-bordered input-info w-5/6 px-8 w-full mr-4" />
  <BsListUl className="absolute right-8 text-[#008ECC] text-lg" />
  </div>
  <div className="navbar-end w-1/4 hidden lg:flex gap-4">
  <div className="flex-none flex gap-1 items-center">
        <CiShoppingCart className="text-[#008ECC] text-lg" />
          <a href="#" className="text-sm font-medium">Cart</a>
        </div>
        <div className="flex-none flex gap-1 items-center">
        <CiUser className="text-[#008ECC] text-lg" />
          <a href="#" className="text-sm font-medium">Sign Up/Sign in</a>
        </div>
        <div className="flex-none flex gap-1 items-center">
        <CiUser className="text-[#008ECC] text-lg" />
          <a href="#" className="text-sm font-medium">Admin</a>
        </div>
  </div>
</div>
    </nav>
  );
};

export default NavBar;
