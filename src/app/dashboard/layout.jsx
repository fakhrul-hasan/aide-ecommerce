import SideDrawer from "@/components/SideDrawer";
import React from "react";

const DashboardLayout = ({ children }) => {
    
  return (
    <html lang="en">
      <body className="flex">
        <SideDrawer />
        {children}
      </body>
    </html>
  );
};

export default DashboardLayout;
