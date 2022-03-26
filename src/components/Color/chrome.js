import PropTypes from "prop-types";
import React, { useState } from "react";
import { ChromePicker } from "react-color";

import Swatch from "./swatch/swatch";

const ChromeSwatchPicker = ({ color, onChangeComplete }) => {
  const [showPicker, setShowPicker] = useState(false);

  const clickSwatchHandler = (e) => {
    e.stopPropagation();
    setShowPicker((prevState) => !prevState);
  };

  return (
    <>
      <Swatch color={color.hex} handleClick={clickSwatchHandler} />
      {showPicker ? (
        <div style={{ position: "absolute", zIndex: "2", right: "0" }}>
          <div
            style={{
              position: "fixed",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            }}
            onClick={() => setShowPicker(false)}
            onKeyDown={(e) => (e.key === "Enter" ? setShowPicker(false) : null)}
            tabIndex={0}
            role="button"
            aria-label="chrome picker"
          ></div>
          <ChromePicker disableAlpha color={color} onChangeComplete={onChangeComplete} />
        </div>
      ) : null}
    </>
  );
};

ChromeSwatchPicker.propTypes = {
  color: PropTypes.object.isRequired,
  onChangeComplete: PropTypes.func.isRequired,
};

export default ChromeSwatchPicker;
