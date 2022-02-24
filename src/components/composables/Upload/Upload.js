//Misc
import { exposeStyles } from "@Shared/api/styles";
import PropTypes from "prop-types";
import React, { useRef } from "react";

import Choose from "./Controls/choose";
import Remove from "./Controls/remove";
//Components
import Preview from "./Preview/Preview";
import * as styles from "./Upload.module.scss";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  replace: {
    root: styles.Upload,
    label: null,
  },
});

//Component API Type: Composable (see Opinions.md)
const Upload = (props) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);

  const uploadInputRef = useRef(null);

  const fileInputHandler = (event) => {
    //Return when user doesn't select anything
    if (event.target.files.length === 0) {
      return;
    }

    if (
      props.maxMbSize &&
      event.target.files[0].size / 1024 > props.maxMbSize * 1024
    ) {
      alert(`File size cannot be larger than ${props.maxMbSize} MB`);
      return;
    }

    if (props.state.preview) {
      //TODO link to explanation
      //Cleanup the previous preview's file URL as the previous URL is still valid and attackers
      //can use that URL to gain access to your file
      URL.revokeObjectURL(props.state.preview);
    }

    //Make a state copy then merge new values
    const file = event.target.files[0];
    props.stateHandler({
      ...props.state,
      file: file,
      preview: URL.createObjectURL(file),
    });
  };

  //Preview box
  let preview;

  //Controls
  let render;

  if (props.render) {
    //Distribute some of parent's props to the children
    //https://reactjs.org/docs/react-api.html#reactchildren
    //https://reactjs.org/docs/react-api.html#cloneelement
    render = props.render(props.state, props.stateHandler, uploadInputRef);
  } else {
    //The default preview provided
    preview = <Preview state={props.state} placeholder={props.placeholder} />;
    //The default controls provided
    render = (
      <>
        <Choose state={props.state} inputRef={uploadInputRef} />
        <Remove state={props.state} stateHandler={props.stateHandler} />
      </>
    );
  }

  //End controls

  let description;
  if (props.description) {
    description = (
      <span
        className={styles.Upload__description}
        style={{ fontStyle: "italic" }}
      >
        {props.description}
      </span>
    );
  }

  return (
    <div>
      <label
        id={props.label.toLowerCase().replace(/\s/g, "-")}
        className={classes.label}
      >
        {props.label}
      </label>
      {description}
      <div className={classes.root}>
        {preview}
        {render}
      </div>
      <input
        className={styles.Upload__input}
        {...props.elementConfig}
        onChange={fileInputHandler}
        ref={uploadInputRef}
        aria-labelledby={props.label.toLowerCase().replace(/\s/g, "-")}
      />
    </div>
  );
};

Upload.defaultProps = {
  showDefaultPreview: true,
};

Upload.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  description: PropTypes.string,
  elementConfig: PropTypes.shape({
    type: PropTypes.string.isRequired,
    accept: PropTypes.string.isRequired,
  }).isRequired,
  handleUpload: PropTypes.func,
  inputRef: PropTypes.object,
  label: PropTypes.string.isRequired,
  maxMbSize: PropTypes.number,
  render: PropTypes.func,
  showDefaultPreview: PropTypes.bool,
  state: PropTypes.exact({
    file: PropTypes.object,
    preview: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  stateHandler: PropTypes.func.isRequired,
};

export default Upload;
