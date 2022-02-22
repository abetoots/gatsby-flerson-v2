import escapeHtml from "escape-html"
import { Text } from "slate"
import { jsx } from "slate-hyperscript"

//takes an editor node and recursively converts the children to HTML/text. Useful for saving to a database
export const serialize = (node, called = 0) => {
  if (Text.isText(node)) {
    return escapeHtml(node.text)
  }

  const children = node.children.map(n => serialize(n, called++)).join("")

  switch (node.type) {
    case "quote":
      return `<blockquote><p>${children}</p></blockquote>`
    case "paragraph":
      //we need to check if the paragraph is empty so we can return a line <br/> instead
      if (node.children.length === 1) {
        if (Text.isText(node.children[0])) {
          if (node.children[0].text.trim() === "") {
            //If only called once, then this paragraph is actually the only node in the tree
            //and the text node is empty meaning the user actually left it blank. We return an empty
            //string to provide a way to do conditionals based on if the editor is "empty"
            if (called === 1) {
              return ""
            } else {
              return "<br/>"
            }
          }
        }
      }
      return `<p>${children}</p>`
    case "link":
      return `<a href="${escapeHtml(node.url)}">${children}</a>`
    default:
      return children
  }
}

//takes in html elements and recursively converts them to trees of slate nodes/content
export const deserialize = el => {
  if (el.nodeType === 3) {
    return el.textContent
  } else if (el.nodeType !== 1) {
    return null
  }

  const children = Array.from(el.childNodes).map(deserialize)

  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children)
    case "BR":
      return "\n"
    case "BLOCKQUOTE":
      return jsx("element", { type: "quote" }, children)
    case "P":
      return jsx("element", { type: "paragraph" }, children)
    case "A":
      return jsx(
        "element",
        { type: "link", url: el.getAttribute("href") },
        children
      )
    default:
      return el.textContent
  }
}
