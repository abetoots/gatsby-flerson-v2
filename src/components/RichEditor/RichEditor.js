import React, { useMemo, useCallback } from "react"
import PropTypes from "prop-types"
import "./RichEditor.scss"

//Components
import Toolbar from "./Toolbar/Toolbar"
import BlockButton from "./BlockButton/BlockButton"
import MarkButton from "./MarkButton/MarkButton"
import H1 from "@Images/h1.inline.svg"
import H2 from "@Images/h2.inline.svg"
import H3 from "@Images/h3.inline.svg"
import H4 from "@Images/h4.inline.svg"

//Misc
// Import the Slate editor factory.
import { createEditor } from "slate"
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react"
import { toggleMark } from "./MarkButton/MarkButton"
import isHotkey from "is-hotkey"

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
}

const RichEditor = props => {
  //Custom element nodes that handle the format applied by our BlockButtons
  const renderElement = useCallback(props => <Element {...props} />, [])
  //Custom leaf nodes that handle the format applied by our MarkButtons
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  // Create a Slate editor object that won't change across renders.
  const editor = useMemo(() => withReact(createEditor()), [])

  return (
    <div className="RichEditor">
      <label
        className="RichEditor__label"
        id={props.label.toLowerCase().replace(/\s/g, "-")}
      >
        {props.label}
      </label>
      <div className="RichEditor__editorWrap">
        <Slate
          editor={props.editor || editor}
          value={props.state}
          onChange={value => props.stateHandler(value)}
        >
          <Toolbar>
            <MarkButton format="bold" icon="bold" />
            <MarkButton format="italic" icon="italic" />
            <MarkButton format="underline" icon="underline" />
            <BlockButton format="heading-one">
              <H1 />
            </BlockButton>
            <BlockButton format="heading-two">
              <H2 />
            </BlockButton>
            <BlockButton format="heading-three">
              <H3 />
            </BlockButton>
            <BlockButton format="heading-four">
              <H4 />
            </BlockButton>
            <BlockButton format="quote" icon="quote-left" />
            <BlockButton format="numbered-list" icon="list-ol" />
            <BlockButton format="bulleted-list" icon="list-ul" />
          </Toolbar>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck
            aria-labelledby={props.label.toLowerCase().replace(/\s/g, "-")}
            onKeyDown={event => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault()
                  const mark = HOTKEYS[hotkey]
                  toggleMark(editor, mark)
                }
              }
            }}
          />
        </Slate>
      </div>
    </div>
  )
}

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "quote":
      return <blockquote {...attributes}>{children}</blockquote>
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>
    case "heading-three":
      return <h3 {...attributes}>{children}</h3>
    case "heading-four":
      return <h4 {...attributes}>{children}</h4>
    case "list-item":
      return <li {...attributes}>{children}</li>
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

RichEditor.propTypes = {
  editor: PropTypes.object,
  label: PropTypes.string,
  state: PropTypes.array.isRequired,
  stateHandler: PropTypes.func.isRequired,
}

export default RichEditor
