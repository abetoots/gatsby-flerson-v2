import React from "react"
import "./NotFound404.scss"

//Components
import { Link } from "gatsby"

//Misc
import img from "./404-cat.svg"

const NotFound404 = props => {
  return (
    <div className="NotFound404">
      <img className="NotFound404__image" src={img} alt="Page not found" />
      <p className="NotFound404__message">
        We can't find what you're looking for.
        <Link className="NotFound404__link" to="/">
          Back to Home
        </Link>
      </p>
    </div>
  )
}

export default NotFound404
