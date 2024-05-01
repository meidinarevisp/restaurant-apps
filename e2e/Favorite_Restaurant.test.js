Feature("Favorite Restaurant");

Scenario("Like and unlike a Restaurant", ({ I }) => {
  I.amOnPage("http://localhost:8080/");
  I.waitForElement("#splash-screen", 5);
  I.click("#main-content");
  I.seeElement(".restaurant");
  I.click(locate(".restaurant-name").first());
  I.waitForElement(".restaurant-detail", 5);
  I.seeElement("#favorite-button");
  I.click("#favorite-button");
  I.waitForText("Added to Favorites!");
  I.seeElement("#favorite-button");
  I.seeElement(".fas.fa-heart");
  I.amOnPage("http://localhost:8080/favorites.html");
  I.seeElement(".restaurant");
  I.see("Melting Pot");
  I.click("Melting Pot");
  I.seeElement("#favorite-button");
  I.click("#favorite-button");
  I.waitForText("Removed from Favorites!");
  I.seeElement("#favorite-button");
  I.seeElement(".far.fa-heart");
  I.amOnPage("http://localhost:8080/favorites.html");
  I.dontSeeElement(".restaurant");
});
