import React from "react";
import "./Footer.scss";

const Footer = (props) => (
  <footer className="Footer">
    <div>
      Made with{" "}
      <span role="img" aria-label="icon of red heart">
        ❤️
      </span>{" "}
      by{" "}
      <a href="https://github.com/abetoots" title="Developer profile">
        <small>Abe Suni M. Caymo</small>
      </a>
    </div>
    <div className="Footer__attribution">
      Icons made by{" "}
      <a
        href="https://www.flaticon.com/authors/monkik"
        title="author - monkik"
        rel="noopener noreferrer nofollow"
        target="_blank"
      >
        monkik
      </a>{" "}
      and{" "}
      <a
        href="https://www.flaticon.com/authors/ultimatearm"
        rel="noopener noreferrer nofollow"
        target="_blank"
        title="author - ultimatearm"
      >
        ultimatearm
      </a>{" "}
      from{" "}
      <a
        href="https://www.flaticon.com/"
        title="Flaticon"
        rel="noopener noreferrer nofollow"
        target="_blank"
      >
        www.flaticon.com
      </a>
    </div>{" "}
  </footer>
);

export default Footer;
