  ## Problem: 
  Sometimes we need a focus behavior not provided by the native focus web api. 
  My use case: 
  I needed elements to be focused only when users are tabbing (keyboard only) but not when using the mouse. 

  ## Motivation:
  1) Our app should be fully accessible with the keyboard only
  2) We should never disable focus (or the outline. Note that we are concerned with the UI) BUT, we should be able to declare if the outline/focus only appears on keyboard or 'normally'.

  The HOC in this folder determines if the element it wraps should be focused 'normally' or on keyboard users only
  @Watch: We handle it manually until :focus-visible is supported fully