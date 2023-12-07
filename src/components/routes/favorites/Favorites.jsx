import React from "react";
import { useSelector } from "react-redux";
import FavoritesItem from "./FavoritesItem";
import styles from "./Favorites.module.scss";


function Favorites() {
  const favoritesItems = useSelector((state) => state.favorites.items);
  const isFavoriteEmpty = favoritesItems.length === 0;

  return (
    <div className={styles.cardsSectionWrapper}>
      <h1 className={styles.cardsSectionHeadline}>Обрані товари</h1>
      <p className={styles.cardsSectionText}>Ваші обрані товари</p>

      {isFavoriteEmpty ? <p className={styles.favoriteEmpty}>Ви ще не додали жодного товару</p>
        : (
          <div className={styles.cardsListWrapper}>
            {favoritesItems.map((item) => (
              <FavoritesItem
                key={item.itemNo}
                item={item}
              />
            ))}
          </div>
        )}
    </div>
  );
}

export default Favorites;

