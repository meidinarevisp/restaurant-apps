const sharp = require("sharp");

sharp("src/public/images/heros/hero-image_2.jpg")
  .resize(1200)
  .toFile("src/public/images/heros/hero-image_2-large.jpg", (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
  });

sharp("src/public/images/heros/hero-image_2.jpg")
  .resize(600)
  .toFile("src/public/images/heros/hero-image_2-small.jpg", (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
  });
