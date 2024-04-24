import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashUsers from '../components/DashUsers';

import DashContact from "../components/ContactUs/DashContact.Manager";
import ContactUser from "../components/ContactUs/DashContact.User";

import DashboardComp from '../components/DashboardComp';

export default function Dashboard() {
  const userEmail = 'user@example.com';
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        
        <DashSidebar />
      </div>
     
      {tab === "profile" && <DashProfile />}
      {tab === 'users' && <DashUsers />}

      {tab === 'ContactManager' && <DashContact />}
      {tab === 'ContactUser' && <ContactUser userEmail={userEmail} />}
      {tab === 'dash' && <DashboardComp />}

    </div>
  );
}
