import React from "react";
import "./Header.scss";

import { Link } from "gatsby";

//Components
import Logo from "@Components/bits/Logo/Logo";
import Button from "@Components/bits/Button/Button";

//Misc
import logo from "@Images/flerson-logo.svg";

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
