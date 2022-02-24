import "./textarea.scss"

import PropTypes from "prop-types"
import React from "react"

const TextArea = props => {
  return (
    <textarea
      className="Textarea"
      {...props.elementConfig}
      value={props.state}
      onChange={event => props.stateHandler(event.target.value)}
      onFocus={props.focusHandler}
      onBlur={props.focusHandler}
      aria-labelledby={props.ariaLabelledBy}
    />
  )
}

TextArea.propTypes = {
  ariaLabelledBy: PropTypes.string,
  elementConfig: PropTypes.object,
  focusHandler: PropTypes.func.isRequired,
  initialValue: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  stateHandler: PropTypes.func.isRequired,
}

export default TextArea
