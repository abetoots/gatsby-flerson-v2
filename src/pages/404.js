import React from "react"

import NotFound404 from "../components/NotFound404/NotFound404"
import SEO from "../components/seo"
import Layout from "../components/layout"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <NotFound404 />
  </Layout>
)

export default NotFoundPage
