import DashboardNav from "@/components/DashboardNav";
import SideDrawer from "@/components/SideDrawer";
import React from "react";

const DashboardLayout = ({ children }) => {
    
  return (
    <html lang="en">
      <body className="flex">
        <SideDrawer />
        <section>
          <DashboardNav />
        {children}
        </section>
      </body>
    </html>
  );
};

export default DashboardLayout;
