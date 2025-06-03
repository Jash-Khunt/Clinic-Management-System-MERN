import React, { useEffect, useRef } from "react";
import logo from "../assets/images/logo.png";
import userImg from "../assets/images/avatar-icon.png";
import { BiMenu } from "react-icons/bi";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/doctor", display: "About Doctor" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show_menu");

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-auto h-auto" />
          </Link>

          <nav className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {(!authUser ||
                !["doctor", "receptionist"].includes(authUser.role)) && (
                <>
                  <li>
                    <NavLink
                      to="/home"
                      className={({ isActive }) =>
                        isActive
                          ? "text-primaryColor text-[16px] leading-7 font-[600]"
                          : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/doctor"
                      className={({ isActive }) =>
                        isActive
                          ? "text-primaryColor text-[16px] leading-7 font-[600]"
                          : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                      }
                    >
                      About Doctor
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/services"
                      className={({ isActive }) =>
                        isActive
                          ? "text-primaryColor text-[16px] leading-7 font-[600]"
                          : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                      }
                    >
                      Services
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        isActive
                          ? "text-primaryColor text-[16px] leading-7 font-[600]"
                          : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                      }
                    >
                      Contact
                    </NavLink>
                  </li>
                </>
              )}

              {authUser?.role === "doctor" && (
                <>
                  <li>
                    <NavLink
                      to="/tokens"
                      className={({ isActive }) =>
                        isActive
                          ? "text-primaryColor text-[16px] leading-7 font-[600]"
                          : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                      }
                    >
                      My Tokens
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/visits"
                      className={({ isActive }) =>
                        isActive
                          ? "text-primaryColor text-[16px] leading-7 font-[600]"
                          : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                      }
                    >
                      Visits
                    </NavLink>
                  </li>
                </>
              )}

              {authUser?.role === "receptionist" && (
                <>
                  <li>
                    <NavLink
                      to="/patients"
                      className={({ isActive }) =>
                        isActive
                          ? "text-primaryColor text-[16px] leading-7 font-[600]"
                          : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                      }
                    >
                      Patients
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/ctokens"
                      className={({ isActive }) =>
                        isActive
                          ? "text-primaryColor text-[16px] leading-7 font-[600]"
                          : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                      }
                    >
                      TOKENS
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/billing"
                      className={({ isActive }) =>
                        isActive
                          ? "text-primaryColor text-[16px] leading-7 font-[600]"
                          : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                      }
                    >
                      Billing
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/visits"
                      className={({ isActive }) =>
                        isActive
                          ? "text-primaryColor text-[16px] leading-7 font-[600]"
                          : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                      }
                    >
                      Visits
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            {authUser ? (
              <button
                onClick={handleLogout}
                className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] w-[100px] flex items-center justify-center rounded-[50px]"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] w-[100px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
