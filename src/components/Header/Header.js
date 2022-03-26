import "./Header.scss";

import Button from "@Components/Button/Button";
//Components
import Logo from "@Components/Logo/Logo";
//Misc

import { Link } from "gatsby";
import React from "react";

const Header = () => {
  return (
    <header className="Header">
      <Link to="/">
        <Logo classes={{ image: "Header__logo" }} />
      </Link>
      <Link to="/post-job">
        <Button classes={{ root: "Header__postJobButton" }}>Post A Job</Button>
      </Link>
    </header>
  );
};

export default Header;
