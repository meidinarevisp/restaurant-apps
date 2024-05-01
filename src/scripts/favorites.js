import "regenerator-runtime";
import { getAllFavorites } from "./utils";
import "../styles/main.scss";
import "./components/Navbar";
import "./components/Footer";
import "./components/HeroRestaurant";
import "./components/page-favorites/RestaurantFavorites";

async function displayFavoriteRestaurants() {
  try {
    const favoritesSection = document.querySelector(".favorites");

    if (!favoritesSection) {
      console.log("Favorites section not found.");
      return;
    }

    favoritesSection.innerHTML = "";

    console.log("Fetching favorite restaurants...");
    const favorites = await getAllFavorites();
    console.log("Favorite restaurants:", favorites);

    if (favorites.length === 0) {
      favoritesSection.textContent = "No favorite restaurants yet.";
      favoritesSection.style.display = "flex";
      favoritesSection.style.justifyContent = "center";
      favoritesSection.style.alignItems = "center";
      return;
    }

    favorites.forEach((restaurant) => {
      const restaurantElement = document.createElement("div");
      restaurantElement.classList.add("restaurant");

      const name = document.createElement("a");
      name.href = `./detail.html?id=${restaurant.id}`;
      name.textContent = restaurant.name;

      const image = document.createElement("img");
      image.src = `https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}`;
      image.alt = restaurant.name;

      const description = document.createElement("p");
      const maxLength = 100;

      if (restaurant.description.length > maxLength) {
        description.textContent =
          restaurant.description.substring(0, maxLength) + "...";
      } else {
        description.textContent = restaurant.description;
      }

      const city = document.createElement("h4");
      city.textContent = `${restaurant.city}`;

      const ratingData = generateStarRating(restaurant.rating);
      const rating = document.createElement("h3");
      rating.classList.add("star-rating");
      rating.textContent = `${ratingData.stars} (${ratingData.numericRating})`;

      restaurantElement.appendChild(image);
      restaurantElement.appendChild(name);
      restaurantElement.appendChild(rating);
      restaurantElement.appendChild(description);
      restaurantElement.appendChild(city);
      favoritesSection.appendChild(restaurantElement);
    });
  } catch (error) {
    console.error("Error displaying favorite restaurants:", error);
  }
}

function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStars;

  const stars =
    "★".repeat(fullStars) + "☆".repeat(halfStars) + "☆".repeat(emptyStars);

  const numericRating = rating.toFixed(1);

  return { stars, numericRating };
}

document.addEventListener("DOMContentLoaded", async () => {
  const mainContent = document.getElementById("main-content");
  if (mainContent) {
    mainContent.addEventListener("click", (event) => {
      event.preventDefault();
      const exploreContentSection = document.getElementById("explore-content");
      if (exploreContentSection) {
        const headerHeight = document.querySelector("header").offsetHeight;

        window.scrollTo({
          top: exploreContentSection.offsetTop - headerHeight,
          behavior: "smooth",
        });
      }
    });
  }
});

window.addEventListener("DOMContentLoaded", displayFavoriteRestaurants);
