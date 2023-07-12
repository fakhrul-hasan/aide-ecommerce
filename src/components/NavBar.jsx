import React from "react";
import { CiLocationOn, CiDeliveryTruck } from "react-icons/ci";
import { CiDiscount1 } from "react-icons/ci";

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
      <div>Navbar</div>
    </nav>
  );
};

export default NavBar;
