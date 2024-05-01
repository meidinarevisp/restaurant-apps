Feature("Customer Review");

Scenario("Adding a new review", async ({ I }) => {
  I.amOnPage("http://localhost:8080/");
  I.waitForElement("#splash-screen", 5);
  I.click("#main-content");
  I.seeElement(".restaurant");
  I.click(locate(".restaurant-name").first());
  I.waitForElement(".restaurant-detail", 5);
  I.seeElement("#review-form");

  const reviewerName = "John Doe";
  const reviewContent = "Great food and atmosphere!";
  I.fillField("#reviewer-name", reviewerName);
  I.fillField("#review-content", reviewContent);
  I.click("Submit");
  I.see("Review Added Successfully!", ".swal2-title");
  I.see(reviewContent, "#customer-reviews");
});

Scenario(
  "Adding a new review with empty reviewer name or review content",
  async ({ I }) => {
    I.amOnPage("http://localhost:8080/");
    I.waitForElement("#splash-screen", 5);
    I.click("#main-content");
    I.seeElement(".restaurant");
    I.click(locate(".restaurant-name").first());
    I.waitForElement(".restaurant-detail", 5);
    I.seeElement("#review-form");

    const reviewContent = "Great food and atmosphere!";
    I.fillField("#review-content", reviewContent);
    I.click("Submit");
    I.see("Invalid Input", ".swal2-title");
  }
);
