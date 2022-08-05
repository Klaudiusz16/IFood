import React from "react"
import "./styles.sass"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import { navigate } from "gatsby"

export default function CategoryItem({
  label,
  href,
  image,
}: {
  label: string
  href: string
  image: string
}) {
  return (
    <div className="category_item">
      <div className="category_item_image_wrapper">
        <img src={image} />
      </div>
      <p className="category_item_caption"> {label}</p>
      <div
        className="keyboard_arrow_right_icon_wrapper"
        onClick={() => navigate("/recipes/" + href)}
      >
        <KeyboardArrowRightIcon />
      </div>
    </div>
  )
}
