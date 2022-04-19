## Guiding Principle

MarkButtons trigger formatting changes on the "text" node level. Slate understands formatting as "marks". 

To **"mark"** text nodes, we use the default helpers in the Editor interface, Editor.addMark & Editor.removeMark. 

Marking adds a custom property to the leaf text nodes in the current selection. If the selection is currently collapsed, the marks will be added to the `editor.marks` property instead, and applied when text is inserted next.

As mentioned above, marking a text node `bold` does nothing but only add a custom property `bold` to the leaf text nodes. You need to handle those custom properties yourself. These are given to you in the `leaf` (ex: `leaf.bold`) property of Leaf nodes. 