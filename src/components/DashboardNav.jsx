import UseAuth from "@/hooks/useAuth";
import Link from "next/link";
import { CiBellOn, CiDark, CiUser } from "react-icons/ci";

const DashboardNav = () => {
    const {logOut} = UseAuth();
    return (
        <div className="navbar bg-base-100 navbar-end w-full">
  <div className="flex-1 justify-end">
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <CiDark className="text-lg" />
        </div>
      </label>
    </div>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <CiBellOn className="text-lg" />
        </div>
      </label>
    </div>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="rounded-full">
          <CiUser className="text-lg" />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><Link href='/'>Home</Link></li>
        <li><a>Profile</a></li>
        <li><a>Settings</a></li>
        <li><a onClick={logOut}>Sign Out</a></li>
      </ul>
    </div>
  </div>
</div>
    );
};

export default DashboardNav;