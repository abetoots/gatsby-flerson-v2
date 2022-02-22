import React from "react";
import PropTypes from "prop-types";
import "./layout.scss";

import "@Shared/utils/fontawesome";
import "@Shared/utils/typography";

//Components
import Header from "@Components/Header/Header";
import Footer from "@Components/Footer/Footer";
import Spinner2 from "@Components/bits/Spinner/spinner2/spinner2";

//Misc
import { exposeStyles } from "@Shared/api/styles";

const useStyles = exposeStyles({
  replace: {
    main: "",
  },
});

const Layout = (props) => {
  const classes = useStyles(props);

  let loading;
  if (props.loading) {
    loading = props.loadingComponent ? (
      props.loadingComponent
    ) : (
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Spinner2 />
      </div>
    );
  }

  let error;
  if (props.error) {
    error = <div>{`${props.error}`}</div>;
  }

  return (
    <>
      <Header />
      <main
        className={classes.main || undefined}
        style={{
          minHeight: "90vh",
          ...props.mainStyle,
        }}
      >
        {error || loading || props.children}
      </main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  mainStyle: PropTypes.object,
};

export default Layout;
