import React, { useEffect, useState } from "react"
import { Button, CircularProgress } from "@mui/material"
import { StaticImage } from "gatsby-plugin-image"
import SaveIcon from "@mui/icons-material/Save"
import "./styles.sass"
import CheckIcon from "@mui/icons-material/Check"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import PeopleIcon from "@mui/icons-material/People"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { navigate } from "gatsby"
import { useAppSelector } from "../../store/hooks"
import { useAppDispatch } from "./../../store/hooks"
import { add, remove } from "../../store/savedRecipesSlice"

export default function RecipeView() {
  const recipeID = window?.location.pathname.split("/")[2]

  const queryLink = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=b56f77b65b064308a1233fb1ffa91c2a`

  const [isFetching, updatedFetchState] = useState<boolean>(false)

  const [recipeData, updateRecipeData]: any = useState(null)

  const getRecipies = async () => {
    const response = await fetch(queryLink)
    const data = await response.json()
    updateRecipeData(data)
    updatedFetchState(false)
    console.log(data)
  }

  const savedRecipes = useAppSelector(state => state.savedRecipes.savedRecipes)

  const isSaved = savedRecipes.find(recipe => recipe.id == recipeID)

  useEffect(() => {
    updatedFetchState(true)
    getRecipies()
  }, [])

  const dispatch = useAppDispatch()

  if (recipeData)
    return (
      <div className="recipe_view_container">
        <Button
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            left: "20px",
            top: "20px",
            color: "var(--lightOrange)",
            backgroundColor: "white",
            zIndex: "10",
          }}
        >
          <ArrowBackIcon />
        </Button>
        <div className="image_wrapper">
          <img src={recipeData.image} alt={recipeData.title} />
          <div className="image_filter">
            <p className="food_title">{recipeData.title}</p>
          </div>

          <Button
            onClick={() => {
              if (isSaved) {
                dispatch(remove({ id: recipeID }))
              } else {
                dispatch(
                  add({
                    id: recipeID,
                    name: recipeData.title,
                    img: recipeData.image,
                  })
                )
              }
            }}
            sx={{
              position: "absolute",
              right: "10px",
              top: "10px",
              backgroundColor: isSaved ? "gray" : "var(--lightOrange)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              color: "white",
              cursor: "pointer",
              overflow: "hidden",
              zIndex: "4",
              maxWidth: "40px",
              maxHeight: "40px",
              minWidth: "40px",
              minHeight: "40px",
              "&:hover": {
                backgroundColor: "var(--lightOrange)",
              },
            }}
          >
            <SaveIcon />
          </Button>
        </div>
        <ol className="dish_types">
          {recipeData.dishTypes.map(type => (
            <li className="dish_type_item" key={type}>
              <CheckIcon />
              <p>{type}</p>
            </li>
          ))}
        </ol>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: recipeData.summary }}
        />
        <ul className="about_preparing">
          <li className="about_preparing_item">
            <AccessTimeIcon />
            <p>{recipeData.readyInMinutes} minutes</p>
          </li>
          <li className="about_preparing_item">
            <PeopleIcon />
            <p>{recipeData.servings} servings</p>
          </li>
        </ul>
        <ul className="ingredients">
          {recipeData.extendedIngredients.map(ingredient => (
            <li className="ingredients_item" key={ingredient.original}>
              <ArrowForwardIosIcon className="ingredient_arrow" />
              <p>{ingredient.original}</p>
            </li>
          ))}
        </ul>
        <ul className="instruction_steps">
          <p className="caption">Preparing</p>
          {recipeData.analyzedInstructions[0].steps.map(step => (
            <li className="instruction_step" key={step.number}>
              <p className="step">{step.number}.</p>
              <p>{step.step}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  else
    return (
      <div className="loading">
        <CircularProgress className="loading_circele" />
      </div>
    )
}
