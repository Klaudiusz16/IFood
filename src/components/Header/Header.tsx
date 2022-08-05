import { Button, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import SaveIcon from "@mui/icons-material/Save"
import {
  SearchRounded,
  SettingsBackupRestoreOutlined,
} from "@mui/icons-material"
import "./styles.sass"
import { navigate } from "gatsby"
import Recipes from "./../Recipes/Recipes"
import CloseIcon from "@mui/icons-material/Close"

export default function Header({
  isSavedRecipesOpen,
  setSavedRecipesModal,
}: {
  isSavedRecipesOpen: boolean
  setSavedRecipesModal: Function
}) {
  const [searchValue, updateSearchValue] = useState<string>("")

  const [isRecipesOpen, setRecipesState] = useState<boolean>(false)

  const queryLink = `https://api.spoonacular.com/recipes/complexSearch?apiKey=b56f77b65b064308a1233fb1ffa91c2a&query=${searchValue}&number=100`

  const [recipes, updateRecipes] = useState([])

  const [isFetching, updatedFetchState] = useState<boolean>(false)

  const getRecipies = async () => {
    setRecipesState(true)
    updatedFetchState(true)
    const response = await fetch(queryLink)
    const data = await response.json()
    updateRecipes(data)
    updatedFetchState(false)
  }

  useEffect(() => {
    if (!searchValue.length) setRecipesState(false)
  }, [searchValue])

  return (
    <div
      className="header"
      onKeyDown={e => {
        if (e.key === "Enter") {
          getRecipies()
        }
      }}
    >
      <div className="searchbar_wrapper">
        <div className="row">
          <h1 className="app_name" onClick={() => navigate("/")}>
            I-food
          </h1>
          <TextField
            placeholder="Find a meal"
            onChange={e => updateSearchValue(e.target.value)}
            value={searchValue}
            sx={{
              input: {
                color: "rgb(143, 108, 91)",
                backgroundColor: "rgb(253, 200, 173)",
                borderRadius: "10px",
              },
              "& Fieldset": {
                border: "none",
              },

              "&.Mui-focused Fieldset": {
                borderRadius: "15px",
                backgroundColor: "rgb(253, 200, 173)",
              },
            }}
          />
        </div>
        <Button
          onClick={() => {
            getRecipies()
          }}
          sx={{
            transform:
              searchValue.trim().length > 2
                ? "translateX(0)"
                : "translateX(100%)",
            transition: " transform 0.2s ease-in-out",
            position: "absolute",
            top: "10px",
            right: "0px",
            color: "white",
          }}
        >
          <SearchRounded />
        </Button>
      </div>
      <Button
        onClick={() =>
          isSavedRecipesOpen
            ? setSavedRecipesModal(false)
            : setSavedRecipesModal(true)
        }
        sx={{
          color: "white ",
          "@media (min-width: 1024px)": {
            display: "none",
          },
        }}
      >
        {isSavedRecipesOpen ? <CloseIcon /> : <SaveIcon />}
      </Button>
      {isRecipesOpen ? (
        <div className="searched_recipies">
          <Recipes
            recipes={recipes}
            isOpen={isRecipesOpen}
            closeRecipies={() => setRecipesState(false)}
            isFetching={isFetching}
            updateSearchValue={updateSearchValue}
          />
        </div>
      ) : null}
    </div>
  )
}
