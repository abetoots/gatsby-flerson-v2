This component provides the following:

## Styles API

Heavily inspired by Material-UI's styling solution.

Difference:

- Problem: Material UI styling always **MERGES** custom classes. This makes it hard to _build_ on top of reusable components as you'll always get some default styles you might not want.

  - Styles API provides a way to define which classes to merge and which classes to replace.
  - This provides flexibility so that some components won't "lock" you in to their specific styles.

- Styles API does **NOT** create your stylesheets for you. It is built so you can use it with any styling solution. This means, for my case, I can keep using css modules or sass stylesheets. You can also use it with any CSS-in-JS solution if you want.

## Component Styles

This component exposes these styles to `props.classes`:

<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Target Element</th>
      <th>Override behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>root</td>
      <td>The root form element</td>
      <td>replace</td>
    </tr>
    <tr>
      <td>submit</td>
      <td>The default submit button</td>
      <td>replace</td>
    </tr>
    <tr>
      <td>_focused</td>
      <td>The modifier that gets added whenever the form captures a focus event from it's children</td>
      <td>replace</td>
    </tr>
  </tbody>
</table>

Example usage:

    <Form classes={{root: 'Mui-Styles-something'}}/>

will override the root form element. The root class is replaced. 

## Component API Type: Composable

Composable components follow my opinionated guidelines:

- Reusable & meant to be 'composed' in other components. Use `props.children`

  Children allowed types:

  - `<Status/>`
  - `<Button/>`
  - `<Input/>`

  Children have access to `<Form>`'s:

  - `props.success`
  - `props.error`
  - `props.loading`

- Clear and defined functionality
- FLEXIBLE structure
- Always provide reasonable defaults
