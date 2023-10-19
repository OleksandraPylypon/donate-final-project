import React, { useState, useEffect } from "react";
import styles from "./AllCategoriesCardList.module.scss"
import CardList from "./CardList";
import shuffleArray from "../../scripts/shuffleArray"
import SliderPrice from "../sliderPrice/SliderPrice";
import { getProducts } from "../../api/getProducts";


export default function CategoriesCardList() {
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState("all");
  const [sliderValue, setSliderValue] = useState([0, 10000]);
  const [tempSliderValue, setTempSliderValue] = useState([0, 10000]);

  const handleChange = (e) => {
      setSelectedValue(e.target.value);
    };

  const applyFilter = () => {
    setSliderValue(tempSliderValue);
  }

  useEffect(() => {
    getProducts().then(data => {
      let newData = [];
      data.forEach(item => {
        const price = item.price ?? 0;
        if (
          selectedValue === "donation" || selectedValue === "lots" || (price >= sliderValue[0] && price <= sliderValue[1])
        ) {
          if (selectedValue === "all") {
            newData.push(item);
          } else if (selectedValue === "donation" && item.category === "Донат") {
            newData.push(item);
          } else if (selectedValue === "lots" && item.category === "Благодійний лот") {
            newData.push(item);
          } else if (selectedValue === "setswear" && item.category === "Комплекти форми") {
            newData.push(item);
          } else if (selectedValue === "outerwear" && item.category === "Одяг верхній") {
            newData.push(item);
          } else if (selectedValue === "footwear" && item.category === "Взуття") {
            newData.push(item);
          }
        }
      });
      let mixedData = shuffleArray([...newData]);
      setItems(mixedData);
    })
  }, [selectedValue, sliderValue]);


  
  return (
    <>
      <div className={styles.filtrationWrapper}>
        <div className={styles.filtration}>
          <div className={styles.filtrationSelectWrapper}>
            <p className={styles.filtrationHeadline}>Оберіть, що вам потрібно:</p>
            <select name="categories" value={selectedValue} onChange={handleChange} className={styles.select}>
              <option value="all" className={styles.option}>Всі</option>
              <option value="donation" className={styles.option}>Донати</option>
              <option value="lots" className={styles.option}>Лоти</option>
              <option value="setswear" className={styles.option}>Комплекти форми</option>
              <option value="outerwear" className={styles.option}>Одяг верхній</option>
              <option value="footwear" className={styles.option}>Взуття</option>
            </select>
          </div>


          {selectedValue !== "all" && selectedValue !== "donation" && selectedValue !== "lots" && (
            <SliderPrice
              tempSliderValue={tempSliderValue} 
              setTempSliderValue={setTempSliderValue} 
              applyFilter={applyFilter}
            />
          )}
        </div>
      </div>

      {selectedValue || selectedValue === "all" ? (

        <CardList items={items}/>

        ) : (
        "Завантаження..."
      )}    
  </>
  );
}