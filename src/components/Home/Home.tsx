import React from "react"
import CategoryItem from "../Category/CategoryItem"
import { StaticImage } from "gatsby-plugin-image"
// @ts-ignore
import mainCourseIcon from "../../images/main_course.svg"
// @ts-ignore
import sideDish from "../../images/side_dish.svg"
// @ts-ignore
import dessert from "../../images/dessert.svg"
// @ts-ignore
import salad from "../../images/salad.svg"
// @ts-ignore
import bread from "../../images/bread.svg"
// @ts-ignore
import breakfast from "../../images/breakfast.svg"
// @ts-ignore
import beverage from "../../images/beverage.svg"
// @ts-ignore
import soup from "../../images/soup.svg"
// @ts-ignore
import sauce from "../../images/sauce.svg"
// @ts-ignore
import fingerfood from "../../images/fingerfood.svg"
// @ts-ignore
import snack from "../../images/soup.svg"
// @ts-ignore
import drink from "../../images/drink.svg"
import "./styles.sass"

const categories = [
  { label: "main_course", image: mainCourseIcon, href: "main_course" },
  { label: "side_dish", image: sideDish, href: "side_dish" },
  { label: "dessert", image: dessert, href: "dessert" },
  { label: "salad", image: salad, href: "salad" },
  { label: "bread", image: bread, href: "bread" },
  { label: "breakfast", image: breakfast, href: "breakfast" },
  { label: "soup", image: soup, href: "soup" },
  { label: "beverage", image: beverage, href: "beverage" },
  { label: "sauce", image: sauce, href: "sauce" },
  { label: "fingerfood", image: fingerfood, href: "fingerfood" },
  { label: "snack", image: snack, href: "snack" },
  { label: "drink", image: drink, href: "drink" },
]

export default function Home() {
  return (
    <div className="home">
      <div className="categories">
        <ul className="categories_list">
          {categories.map(category => {
            return (
              <CategoryItem
                key={category.label}
                label={category.label}
                image={category.image}
                href={category.href}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}
