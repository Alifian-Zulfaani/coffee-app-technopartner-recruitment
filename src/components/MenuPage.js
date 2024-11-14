import React, { useEffect, useState, useRef } from "react";
import { getMenuData } from "../services/apiService";
import "../styles/menuPage.css";

const MenuPage = ({ token }) => {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState("");
  const categoryRefs = useRef([]); // Array to store refs for each category section

  useEffect(() => {
    if (token) {
      getMenuData(token)
        .then((response) => {
          // Menggunakan result.categories dari response API
          setMenu(response.result.categories);
        })
        .catch((err) => setError("Failed to load menu data."));
    }
  }, [token]);

  const handleScrollToCategory = (index) => {
    if (categoryRefs.current[index]) {
      categoryRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (menu.length === 0) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="menu-page">
      <div className="menu-container">
        <header className="menu-header">
          <h1>MENU</h1>
          <div className="tab-menu">
            {menu.map((category, index) => (
              <button
                key={index}
                className="tab"
                onClick={() => handleScrollToCategory(index)}
              >
                {category.category_name}
              </button>
            ))}
          </div>
        </header>

        {menu.map((category, index) => (
          <section
            key={index}
            ref={(el) => (categoryRefs.current[index] = el)}
            className="menu-section"
          >
            <h2 className="section-title">{category.category_name}</h2>
            {category.menu.map((item, idx) => (
              <div key={idx} className="menu-item">
                <img src={item.photo} alt={item.name} className="item-photo" />
                <div className="item-info">
                  <p className="item-name">{item.name}</p>
                  <p className="item-description">{item.description}</p>
                </div>
                <p className="item-price">Rp {item.price.toLocaleString()}</p>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
