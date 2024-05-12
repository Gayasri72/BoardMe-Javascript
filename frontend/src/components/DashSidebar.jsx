import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight, HiChartPie, HiOutlineUserGroup,HiOutlineGlobe ,HiBookmark,HiCurrencyDollar,HiLightBulb} from 'react-icons/hi';
import { TbPackageExport } from "react-icons/tb";
import { IoMdContact } from "react-icons/io";
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DashSidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=AddPackage'>
              <Sidebar.Item
                active={tab === 'AddPackage'} 
                icon={TbPackageExport}
                as='div'
              >
                Package
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=users">
              <Sidebar.Item
                active={tab === "users"}
                icon={HiOutlineUserGroup}
                as="div"
              >
                Users
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=ContactManager'>
              <Sidebar.Item
                active={tab === 'ContactManager'}
                icon={IoMdContact}
                as='div'
              >
                Contact Details
              </Sidebar.Item>
            </Link>
          )}

          {!currentUser.isAdmin && (
             <Link to='/dashboard?tab=ContactUser'>
            <Sidebar.Item
              active={tab === 'ContactUser'}
              icon={IoMdContact}
              as='div'
            >
              My reviews
            </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=Ads">
              <Sidebar.Item
                active={tab === "Ads"}
                icon={HiOutlineGlobe }
                as="div"
              >
                All Ads
              </Sidebar.Item>
            </Link>
          )}

          {!currentUser.isAdmin && (
            <Link to="/dashboard?tab=MyAds">
              <Sidebar.Item
                active={tab === "MyAds"}
                icon={HiOutlineGlobe }
                as="div"
              >
                My ads
              </Sidebar.Item>
            </Link>
          )}
{/* not implemented */}
        {!currentUser.isAdmin && (
             <Link to='/dashboard?tab='>
            <Sidebar.Item
              active={tab === ''}
              icon={IoMdContact}
              as='div'
            >
              My Listings
            </Sidebar.Item>
            </Link>
          )}
          {!currentUser.isAdmin && (
             <Link to='/dashboard?tab='>
            <Sidebar.Item
              active={tab === ''}
              icon={HiBookmark}
              as='div'
            >
              My Bookings
            </Sidebar.Item>
            </Link>
          )}
          {!currentUser.isAdmin && (
             <Link to='/dashboard?tab='>
            <Sidebar.Item
              active={tab === ''}
              icon={HiLightBulb}
              as='div'
            >
              My Events
            </Sidebar.Item>
            </Link>
          )}
          {!currentUser.isAdmin && (
             <Link to='/dashboard?tab='>
            <Sidebar.Item
              active={tab === ''}
              icon={HiCurrencyDollar}
              as='div'
            >
              My payments
            </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}