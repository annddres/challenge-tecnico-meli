import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import ItemDetail from "../../components/ItemDetail";

export function Product() {

  const params = useParams();
  const id = params.id;
  const [item, setItem] = useState({});
  const [category, setCategory] = useState({});

  const meta = {
    title: `Mercado Libre - ${item.title}`,
    description: item.description,
    meta: { name: { keywords: `Mercado Libre, ${item.title}, ${category}` } }
  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/items/${id}`)
      .then(response => response.json())
      .then(response => {
        if (!response.error) {
          setItem(response.item);
          setCategory(response.category);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  return (JSON.stringify(item) === '{}') ? null : (
    <>
    <DocumentMeta {...meta} />
    <p>{category}</p>
    <div className="detail-view">
      <ItemDetail item={item} />
    </div>
    </>
  );
}
