import React from "react";
import "./ItemsList.scss";

export function ItemsList({ items, categories }) {
  return (
    
    <>

    <ol className={"breadcrumb"}>
      {categories &&
        categories.map(category => (
          <li className={"breadcrumb-item"} key={category}>
            {category}
          </li>
        ))}
    </ol>

    <ol className={"items-list"}>
      {items.map(item => (
      
        <li className={"items-list-item"}>
          <a href={`/items/${item.id}`}>
            <img src={item.picture} alt={item.title} />
          </a>
          <div className={"item-data"}>
            <p className={"item-price"}>
              {item.price.amount}
                <span className={"item-price-decimals"}>{item.price.decimals}</span>
            </p>
            {item.free_shipping ? (
              <span className={"item-free-shipping"}>Env&iacute;o Gratis!</span>
            ) : null}
            <a href={`/items/${item.id}`}
              className={"item-title"}>
              <p>{item.title}</p>
            </a>
          </div>
          <p className={"item-condition"}>
            {item.condition === "new" ? "Nuevo" : "Usado"}
          </p>
        </li>
      
      ))}
    </ol>

    </>
  );
}
