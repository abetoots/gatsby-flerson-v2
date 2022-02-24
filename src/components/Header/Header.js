import "./Header.scss";

import Button from "@Components/bits/Button/Button";
//Components
import Logo from "@Components/bits/Logo/Logo";
//Misc
import logo from "@Images/flerson-logo.svg";
import { Link } from "gatsby";
import React from "react";

const Header = () => {
  return (
    <header className="Header">
      <Link to="/">
        <Logo
          classes={{ image: "Header__logo" }}
          src={logo}
          alt="React WP GraphQl Logo"
        />
      </Link>
      <Link to="/post-job">
        <Button classes={{ root: "Header__postJobButton" }}>Post A Job</Button>
      </Link>
    </header>
  );
};

export default Header;
