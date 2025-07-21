import React, { useState } from "react";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar_container">
        <div className="navbar_logo">
          <img src={logo} alt="" width={50} height={40} />
        </div>

        <div className={`navbar_links ${isOpen ? "open" : ""}`}>
          <Link to="/stable">stable</Link>
          <Link to="/photo">Photographer</Link>
          <Link to="/school">School</Link>
        </div>

        <button className="menu_icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <IoClose size={24} /> : <FaBars size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
