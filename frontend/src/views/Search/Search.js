import React, { useState, useEffect } from "react";
import DocumentMeta from 'react-document-meta';
import ItemsList from "../../components/ItemsList";

export function Search({ search }) {

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const meta = {
    title: `Mercado Libre - Busqueda '${search}'`,
    meta: { name: { keywords: `Mercado Libre, ${search}, ${categories.join(',')}` } }
  };

  useEffect(() => {
    if(search != null){
      fetch(`http://localhost:3001/api/items?q=${search}`)
        .then(response => response.json())
        .then(response => {
          if (!response.error) {
            setItems(response.items);
            setCategories(response.categories);
          }
        })
        .catch(error => {
          console.error(error);
        });
      }
  }, [search]);

  return (JSON.stringify(items) === '{}') ? null :  (
    <>
      <DocumentMeta {...meta} />
        { categories.map(category => (
           ` / ${category}`
        ))}
      <ItemsList items={items} />
    </>
  );
}
