import React, { useState, useEffect } from "react";
import ItemsList from "../../components/ItemsList";

export function Search({ search }) {

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    if(search.length !== 0){
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
        { categories.map(category => (
           ` / ${category}`
        ))}
      <ItemsList items={items} />
    </>
  );
}
