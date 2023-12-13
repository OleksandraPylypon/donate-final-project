// import React from "react";
// import styles from "../ProductView.module.scss";

// function ShoesSelector({ updateCartItemSize, id }) {
//   const shoeSizes = [39, 40, 41, 42, 43, 44, 45, 46];

//   const handleSizeChange = (event) => {
//     // eslint-disable-next-line no-unused-vars
//     const selectedSize = event.target.value;
//     updateCartItemSize(id, selectedSize);
//   };

//   return (
//     <div className={styles.selectContainer}>
//       <p className={styles.size}>Розмір:</p>
//       <select className={styles.selectedOption} onChange={handleSizeChange}>
//         {shoeSizes.map((size) => (
//           <option key={size} value={size}>
//             {size}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export default ShoesSelector;

import React, { useState, useEffect } from "react";
import styles from "../ProductView.module.scss";

function ShoesSelector({ updateCartItemSize, id }) {
  const shoeSizes = [39, 40, 41, 42, 43, 44, 45, 46];
  
  // Ініціалізуємо стан для розміру
  const [selectedSize, setSelectedSize] = useState();

  useEffect(() => {
    // Отримання обраного розміру з localStorage або Redux Store
    const currentProducts = JSON.parse(localStorage.getItem("Cart")) || [];
    // eslint-disable-next-line no-underscore-dangle
    const product = currentProducts.find((p) => p._id === id);
    if (product && product.selectedSize) {
      setSelectedSize(product.selectedSize);
    }
  }, [id]);

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSelectedSize(newSize);
    updateCartItemSize(id, newSize);
  };

  return (
    <div className={styles.selectContainer}>
      <p className={styles.size}>Розмір:</p>
      <select className={styles.selectedOption} value={selectedSize} onChange={handleSizeChange}>
        {shoeSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ShoesSelector;
