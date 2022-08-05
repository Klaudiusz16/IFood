import React from "react"
import Layout from "../components/Layout/Layout"
import { Router, RouteComponentProps } from "@reach/router"
import Home from "../components/Home/Home"
import CategoriedRecipes from "../components/CategoriedRecipes/CategoriedRecipes"
import RecipeView from "../components/RecipeView/RecipeView"
import { Provider } from "react-redux"
import { store } from "./../store/store"

export default function index() {
  return (
    <Provider store={store}>
      <Layout>
        <Router>
          <RouterPage path="/" pageComponent={<Home />} />
          <RouterPage
            path="/recipes/:category"
            pageComponent={<CategoriedRecipes />}
          />
          <RouterPage path="/recipe/:id" pageComponent={<RecipeView />} />
        </Router>
      </Layout>{" "}
    </Provider>
  )
}

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent
