import Typography from "typography"
import theme from "typography-theme-us-web-design-standards"
//no need, import google fonts/npm typefaces through gatsby-browser
delete theme.googleFonts

//Override theme
theme.headerFontFamily = ["Dosis", "Arial", "sans-serif"]
theme.bodyFontFamily = ["Open Sans", "Helvetica", "sans-serif"]

//init
const typography = new Typography(theme)

//Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

// Export helper functions
export const { scale, rhythm, options } = typography
export default typography
