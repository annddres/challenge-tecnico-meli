import React from "react";
import "./ItemDetail.scss";

export function ItemDetail({ item }) {

  return (
    <article>
      <div className={"item-detail-container"}>
        <div className={"item-detail-img-container"}>
          <img src={item.picture} alt={item.title} />
        </div>
        <div className={"item-detail-info"}>
          <p className={"item-detail-condition-sold"}>
            {`${item.condition === "new" ? "Nuevo" : "Usado"} - ${
              item.sold_quantity
            } vendidos`}
          </p>
          <h1 className={"item-detail-title"}>{item.title}</h1>
          <h2 className={"item-detail-price"}>
            {item.price.amount}
              <span className={"item-price-decimals"}>
                {item.price.decimals}
              </span>
          </h2>
          <button className={"item-detail-buy"} tabIndex="4 ">
            Comprar
          </button>
        </div>
      </div>
      <div className={"item-detail-description"}>
        <p className={"item-detail-description-title"}>
          Descripci&oacute;n del producto
        </p>
        <p className={"item-detail-description-text"}>{item.description}</p>
      </div>
    </article>
  );
}
