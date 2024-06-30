import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assests/images/logo.png"
import { navRoutes } from "../constants/nav.constants";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Header = () => {
    const [nav, setNav] = useState(false);
    const handleNav = () => {
      setNav(!nav);
    };
  return (
    <div className="flex flex-row items-center justify-between px-3 py-5 bg-[#23034e]">
      {/* Desktop screen menu */}
      <img className="h-10 w-auto" src={logo} alt="React Jobs" />
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">CONTROLWERL</h1>
      <ul className="hidden md:flex text-white font-semibold">
        {navRoutes.map(({ name, route }) => (
          <li key={`${route}-${name}`} className="p-4">
            <Link to={route}>{name}</Link>
          </li>
        ))}
      </ul>
      {/* Mobile screen menu */}
      <div onClick={handleNav} className="block md:hidden text-white">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#23034e] ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <div className="flex m-2">
          <img className="h-10 w-auto" src={logo} alt="React Jobs" />
          <h1 className="w-full text-3xl font-bold text-[#00df9a]">
            CONTROLWERL
          </h1>
        </div>
        <ul className="font-bold pt-4 text-white">
          {navRoutes.map(({ name, route }) => (
            <li
              key={`${route}-${name}`}
              className={`p-4 ${
                route === "/Sign-in" ? "" : "border-b border-gray-600"
              }`}
            >
              <Link to={route} onClick={handleNav}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header
