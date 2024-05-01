import {
  addToFavorites,
  removeFromFavorites,
  getAllFavorites,
} from "../src/scripts/utils";

describe("Favorites Functionality", () => {
  test("Add to Favorites", async () => {
    const restaurantDetail = { id: "1", name: "Restaurant A" };
    await addToFavorites(restaurantDetail);
    const favorites = await getAllFavorites();
    expect(favorites).toContainEqual(restaurantDetail);
  });

  test("Remove from Favorites", async () => {
    const restaurantId = "1";
    await removeFromFavorites(restaurantId);
    const favorites = await getAllFavorites();
    expect(favorites).not.toContain(
      (restaurant) => restaurant.id === restaurantId
    );
  });
});
