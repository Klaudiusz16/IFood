import React, { useState } from "react"

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grow,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import "./styles.sass"

function Filter({
  filter,
  updateFilter,
  getRecipies,
}: {
  filter: {
    isOpen: boolean
    diet: string
    intolerances: string[]
    maxReadyTime: number
  }
  updateFilter: Function
  getRecipies: Function
}) {
  return (
    <Grow in={filter.isOpen}>
      <div className="filter_modal">
        <Button
          onClick={() => {
            const cpyFilter = filter
            cpyFilter.isOpen = false
            updateFilter({ ...cpyFilter })
          }}
          sx={{
            color: "var(--lightOrange)",
            position: "absolute",
            top: "5px",
            right: "5px",
          }}
        >
          <CloseIcon />
        </Button>
        <FormControl
          sx={{
            width: "200px",
            fieldset: {
              borderColor: "var(--lightOrange) !important",
            },
            label: {
              color: "var(--lightOrange) !important",
            },
          }}
        >
          <InputLabel id="demo-simple-select-label">Diet</InputLabel>
          <Select
            labelId="diet"
            id="diet_select"
            value={filter.diet}
            label="Diet"
            onChange={e => {
              const cpyFilter = filter
              cpyFilter.diet = e.target.value
              updateFilter({ ...cpyFilter })
            }}
            sx={{
              borderColor: "var(--lightOrange) !important",
            }}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Ketogenic"}>Ketogenic</MenuItem>
            <MenuItem value={"Vegetarian"}>Vegetarian</MenuItem>
            <MenuItem value={"Lacto-Vegetarian"}>Lacto-Vegetarian</MenuItem>
            <MenuItem value={"Ovo-Vegetarian"}>Ovo-Vegetarian</MenuItem>
            <MenuItem value={"Vegan"}>Vegan</MenuItem>
            <MenuItem value={"Pescetarian"}>Pescetarian</MenuItem>
            <MenuItem value={"Primal"}>Primal</MenuItem>
          </Select>
        </FormControl>
        <div className="intolerances">
          <h2 className="caption">Intolerances</h2>
          {[
            "Dairy",
            "Egg",
            "Gluten",
            "Soy",
            "Sulfite",
            "Wheat",
            "Grain",
            "Peanut",
            "Seafood",
            "Sesame",
            "Shellfish",
          ].map(intolerance => (
            <FormControlLabel
              sx={{ width: "110px" }}
              key={intolerance}
              onChange={e => {
                const cpyFilter = filter
                if (filter.intolerances.includes(intolerance)) {
                  cpyFilter.intolerances = [
                    ...cpyFilter.intolerances.filter(
                      item => item != intolerance
                    ),
                  ]
                } else {
                  cpyFilter.intolerances = [
                    ...cpyFilter.intolerances,
                    intolerance,
                  ]
                }
                updateFilter({ ...cpyFilter })
              }}
              control={
                <Checkbox
                  sx={{
                    color: "var(--lightOrange) !important",
                    fill: "var(--lightOrange) !important",
                  }}
                />
              }
              label={intolerance}
            />
          ))}
        </div>
        <TextField
          id="outlined-number"
          label="Max Ready Time (min)"
          type="number"
          value={filter.maxReadyTime}
          InputProps={{ inputProps: { min: 0 } }}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            fieldset: {
              borderColor: "var(--lightOrange) !important",
            },
            label: {
              color: "var(--lightOrange) !important",
            },
          }}
          onChange={e => {
            const cpyFilter = filter
            cpyFilter.maxReadyTime = Number(
              (e.target as HTMLInputElement).value
            )
            updateFilter({ ...cpyFilter })
          }}
        />
        <Button
          onClick={() => {
            const cpyFilter = filter
            cpyFilter.isOpen = false
            getRecipies()
            updateFilter({ ...cpyFilter })
          }}
          sx={{
            backgroundColor: "var(--lightOrange)",
            color: "white",
            borderRadius: "5px",
            position: "initial",
            "&:hover": { backgroundColor: "var(--lightOrange)" },
          }}
        >
          Let's filtr
        </Button>
      </div>
    </Grow>
  )
}

export default Filter
