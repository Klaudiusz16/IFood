import React, { useEffect, useState } from "react"
import Helmet from "react-helmet"
import Header from "../Header/Header"
import "./styles.sass"
import SavedRecipes from "./../SavedRecipes/SavedRecipes"
import { useAppDispatch } from "./../../store/hooks"

export default function Layout({ children }) {
  const [isSavedRecipesOpen, setSavedRecipesModal] = useState<boolean>(false)

  return (
    <div className="outside">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Edu+VIC+WA+NT+Beginner&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        ></link>
      </Helmet>{" "}
      <div className="main_container">
        <Header
          isSavedRecipesOpen={isSavedRecipesOpen}
          setSavedRecipesModal={setSavedRecipesModal}
        />
        <div className="page_wrapper">{children}</div>
        <SavedRecipes isSavedRecipesOpen={isSavedRecipesOpen} />
      </div>
    </div>
  )
}
