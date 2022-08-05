import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Define a type for the slice state
interface SavedRecpesState {
  id: string
  img: string
  name: string
}

const savedRecipes = JSON.parse(
  window?.localStorage.getItem("saved_recipes") || ""
)

interface InitStateInterface {
  savedRecipes: SavedRecpesState[]
}

const initialState: InitStateInterface = {
  savedRecipes: savedRecipes,
}

export const savedRecipesSlice = createSlice({
  name: "savedRecipes",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<SavedRecpesState>) => {
      const updatedRecipies = [...state.savedRecipes, action.payload]

      window.localStorage.setItem(
        "saved_recipes",
        JSON.stringify(updatedRecipies)
      )
      state.savedRecipes = updatedRecipies
    },
    remove: (state, action: PayloadAction<{ id: string }>) => {
      const updatedRecipies = state.savedRecipes.filter(
        recipe => recipe.id != action.payload.id
      )
      window.localStorage.setItem(
        "saved_recipes",
        JSON.stringify(updatedRecipies)
      )
      state.savedRecipes = updatedRecipies
    },
  },
})

export const { add, remove } = savedRecipesSlice.actions
export default savedRecipesSlice.reducer
