//Components
import Button from "@Components/Button/Button";
import { exposeStyles } from "@Shared/api/styles";
//Misc
import useDebounce from "@Shared/hooks/useDebounce";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

import * as styles from "./Search.module.scss";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  merge: {
    root: styles.Search,
    input: styles.Search__input,
  },
  replace: {
    button: styles.Search__button,
  },
});

//Component API Type: Mid Level (see Opinions.md)
const Search = ({ enableAutoSearch, handleAutoSearch, ...props }) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);
  //Default styles
  const { Search__wrap, Search__label, Search__buttonIcon, _hidden, _focused = "_focused" } = styles;

  const parent = useRef(null);
  const inputWrapRef = useRef(null);

  const debouncedInputVal = useDebounce(props.state, props.ms);

  //The auto search API call.
  useEffect(() => {
    if (enableAutoSearch) {
      handleAutoSearch(debouncedInputVal);
    }
  }, [debouncedInputVal, enableAutoSearch, handleAutoSearch]);

  const focusHandler = (e) => {
    if (e.type === "focus") {
      e.target.classList.add(_focused);
      inputWrapRef.current.classList.add(_focused);
    } else {
      e.target.classList.remove(_focused);
      inputWrapRef.current.classList.remove(_focused);
    }
  };

  const inputChangedHandler = (e) => {
    props.stateHandler(e.target.value);
  };

  return (
    <form className={classes.root} onSubmit={props.handleSubmit} ref={parent}>
      <label id={props.label.toLowerCase().replace(/\s/g, "-")} className={`${Search__label} ${props.showLabel ? "" : _hidden}`}>
        {props.label}
      </label>
      <div ref={inputWrapRef} className={Search__wrap}>
        <input
          aria-labelledby={props.label.toLowerCase().replace(/\s/g, "-")}
          className={classes.input}
          value={props.state}
          onChange={inputChangedHandler}
          placeholder={props.placeholder}
          onFocus={focusHandler}
          onBlur={focusHandler}
          disabled={props.disabled}
        />
        <Button classes={{ root: classes.button }} type="submit" aria-label="Search button">
          <div className={Search__buttonIcon}>{props.buttonIcon}</div>
        </Button>
      </div>
    </form>
  );
};

Search.defaultProps = {
  enableAutoSearch: true,
  ms: 400,
};

Search.propTypes = {
  buttonIcon: PropTypes.element,
  disabled: PropTypes.bool,
  enableAutoSearch: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  handleAutoSearch: PropTypes.func,
  label: PropTypes.string.isRequired,
  ms: PropTypes.number,
  placeholder: PropTypes.string,
  showLabel: PropTypes.bool,
  state: PropTypes.string.isRequired,
  stateHandler: PropTypes.func.isRequired,
};

export default Search;
