import { Button, Grow } from "@mui/material"
import React from "react"
import "./styles.sass"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppSelector } from "../../store/hooks"
import { useAppDispatch } from "./../../store/hooks"
import { remove } from "../../store/savedRecipesSlice"
import { navigate } from "gatsby"

export default function SavedRecipes({
  isSavedRecipesOpen,
}: {
  isSavedRecipesOpen: boolean
}) {
  const recipes: {
    id: string
    img: string
    name: string
  }[] = useAppSelector(state => state.savedRecipes.savedRecipes)

  const dispatch = useAppDispatch()

  return (
    <div className={`saved_recipes ${!isSavedRecipesOpen ? "hidden" : ""} `}>
      <h2 className="caption">Your Saved Recipes</h2>
      <ul className="save_recipes_list">
        {recipes.length ? (
          recipes.map(recipe => (
            <li
              className="saved_recipe_item"
              key={recipe.id}
              onClick={() => navigate("/recipe/" + recipe.id)}
            >
              <div className="saved_recipe_image_wrapper">
                <img src={recipe.img} alt={recipe.name} />
              </div>
              <p className="saved_recipe_name">{recipe.name}</p>
              <Button onClick={() => dispatch(remove({ id: recipe.id }))}>
                <DeleteIcon sx={{ color: "var(--lightOrange)" }} />
              </Button>
            </li>
          ))
        ) : (
          <p className="no_recipes">No recipes saved</p>
        )}
      </ul>
    </div>
  )
}
