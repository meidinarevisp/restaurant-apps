Feature("Search Restaurant");

Scenario("Search for a restaurant by name", ({ I }) => {
  I.amOnPage("http://localhost:8080/");
  I.waitForElement("#splash-screen", 5);
  I.click("#main-content");
  I.seeElement("#search-form");

  const searchContent = "Kafe Kita";
  I.fillField("#search-input", searchContent);
  I.click("#search");
  I.see("Kafe Kita");
  I.dontSee("Kafein");
});

Scenario("Search with empty input should display all restaurants", ({ I }) => {
  I.amOnPage("http://localhost:8080/");
  I.waitForElement("#splash-screen", 5);
  I.click("#main-content");
  I.seeElement("#search-form");

  const searchContent = "Kafein";
  I.fillField("#search-input", searchContent);
  I.click("#search");
  I.see("Kafein");

  const searchContent2 = "";
  I.fillField("#search-input", searchContent2);
  I.seeElement(".restaurant");
});

Scenario("Search for a restaurant with case-insensitive input", ({ I }) => {
  I.amOnPage("http://localhost:8080/");
  I.waitForElement("#splash-screen", 5);
  I.click("#main-content");
  I.seeElement("#search-form");
  I.fillField("#search-input", "AmPiRaN KoTa");
  I.click("#search");
  I.see("Ampiran Kota");
  I.dontSee("Kafein");
});

Scenario("Search for a restaurant that does not exist", ({ I }) => {
  I.amOnPage("http://localhost:8080/");
  I.waitForElement("#splash-screen", 5);
  I.click("#main-content");
  I.seeElement("#search-form");

  const searchContent = "Sushi World";
  I.fillField("#search-input", searchContent);
  I.click("#search");
  I.dontSee("Sushi World");
});

Scenario("Search for a restaurant with partial name match", ({ I }) => {
  I.amOnPage("http://localhost:8080/");
  I.waitForElement("#splash-screen", 5);
  I.click("#main-content");
  I.seeElement("#search-form");

  const searchContent = "cafe";
  I.fillField("#search-input", searchContent);
  I.click("#search");
  I.see("Bring Your Phone Cafe");
  I.see("Fairy Cafe");
  I.dontSee("Kafein");
});
