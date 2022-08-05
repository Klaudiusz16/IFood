import { CircularProgress, Grow } from "@mui/material"
import React, { useEffect, useState } from "react"
import RecipeItem from "./RecipeItem"
import CloseIcon from "@mui/icons-material/Close"
import "./styles.sass"

export default function Recipes({
  isOpen,
  closeRecipies,
  recipes,
  isFetching,
  updateSearchValue,
}: {
  isOpen: boolean
  closeRecipies: Function
  recipes
  isFetching: boolean
  updateSearchValue: Function
}) {
  useEffect(() => {}, [])

  if (isFetching)
    return (
      <div className="loading">
        <CircularProgress className="loading_circele" />
      </div>
    )

  if (recipes?.results) {
    return (
      <Grow in={isOpen}>
        <div className="recipes_container">
          <button
            className="close_recipes_btn"
            onClick={() => {
              closeRecipies()
              updateSearchValue("")
            }}
          >
            <CloseIcon />
          </button>
          <div className="recipes_list">
            {recipes.results.length ? (
              recipes.results.map(recipe => {
                const { id, image, title } = recipe
                return (
                  <div>
                    <RecipeItem
                      key={id}
                      imageSrc={image}
                      label={title}
                      id={id}
                      closeRecipies={closeRecipies}
                    />
                  </div>
                )
              })
            ) : (
              <p className="no_matching_foods"> no matching foods </p>
            )}
          </div>
        </div>
      </Grow>
    )
  } else {
    return null
  }
}
