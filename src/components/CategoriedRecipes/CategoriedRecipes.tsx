import { Button, CircularProgress, Grow } from "@mui/material"
import React, { useEffect, useState } from "react"
import "./styles.sass"
import RecipeItem from "./../Recipes/RecipeItem"
import { CopyAll } from "@mui/icons-material"
import CloseIcon from "@mui/icons-material/Close"
import Filter from "./Filter/Filter"

export default function CategoriedRecipes() {
  const category = window?.location.pathname.split("/")[2]

  const [recipes, updateRecipes] = useState<any>([])

  const [isFetching, updatedFetchState] = useState<boolean>(false)

  const getRecipies = async () => {
    updatedFetchState(true)
    console.log(queryLink)
    const response = await fetch(queryLink)
    const data = await response.json()
    updateRecipes(data)
    updatedFetchState(false)
  }

  const [filter, updateFilter] = useState<{
    isOpen: boolean
    diet: string
    intolerances: string[]
    maxReadyTime: number
  }>({
    isOpen: false,
    diet: "All",
    intolerances: [],
    maxReadyTime: 0,
  })

  const queryLink = `https://api.spoonacular.com/recipes/complexSearch?apiKey=b56f77b65b064308a1233fb1ffa91c2a&query=${
    category.includes("_") ? category.split("_").join(" ") : category
  }&number=100${filter.diet != "All" ? "&diet=" + filter.diet : ""}${
    filter.intolerances.length
      ? "&intolerances=" +
        filter.intolerances.map((intol, i) => (i ? `+${intol}` : intol))
      : ""
  }${filter.maxReadyTime ? "&maxReadyTime=" + filter.maxReadyTime : ""}`

  useEffect(() => {
    getRecipies()
  }, [])

  return (
    <div className="categoried_recipes_container">
      <Filter
        filter={filter}
        updateFilter={updateFilter}
        getRecipies={getRecipies}
      />
      <Button
        onClick={() => {
          const cpyFilter = filter
          cpyFilter.isOpen = !cpyFilter.isOpen
          console.log(cpyFilter)
          updateFilter({ ...cpyFilter })
        }}
        sx={{
          backgroundColor: "var(--lightOrange)",
          color: "white",
          width: "100px",
          height: "50px",
          marginBottom: "30px",
          "&:hover": { backgroundColor: "var(--lightOrange)" },
        }}
      >
        Filter
      </Button>
      {recipes?.results ? (
        <ul className="recipes_list">
          {recipes.results.length ? (
            recipes.results.map(recipe => {
              const { id, image, title } = recipe
              return (
                <RecipeItem
                  key={id}
                  imageSrc={image}
                  label={title}
                  id={id}
                  closeRecipies={null}
                />
              )
            })
          ) : (
            <p className="no_matching_foods"> no matching foods </p>
          )}
        </ul>
      ) : (
        <div className="loading">
          <CircularProgress className="loading_circele" />
        </div>
      )}
    </div>
  )
}
