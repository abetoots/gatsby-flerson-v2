import React from "react"

import Layout from "../components/layout"
import NotFound404 from "../components/NotFound404/NotFound404"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <NotFound404 />
  </Layout>
)

export default NotFoundPage
