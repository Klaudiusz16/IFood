import React from "react"
import { navigate } from "@reach/router"
import SaveIcon from "@mui/icons-material/Save"

export default function RecipeItem({
  imageSrc,
  label,
  id,
  closeRecipies,
}: {
  imageSrc: string
  label: string
  id: number
  closeRecipies: Function | null
}) {
  return (
    <div
      className="recipe_item"
      onClick={e => {
        if (closeRecipies) closeRecipies()
        if (!(e.target as HTMLDivElement).closest(".add_to_cart"))
          navigate("/recipe/" + id)
      }}
    >
      <div className="image_wrapper">
        <img src={imageSrc} alt={label} />
      </div>
      <p className="food_item_caption">{label}</p>
    </div>
  )
}
