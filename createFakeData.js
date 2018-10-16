const fs = require("fs");
const path = require("path");
const faker = require("faker");
const mkdirp = require("mkdirp");

const baseDir = path.join(__dirname, "/data/");

function createFiles(file, data, callback) {
  return new Promise((res, rej) => {
    fs.writeFile(
      baseDir + file + ".json",
      JSON.stringify(data),
      (error, data) => {
        if (error) rej(callback(error));
        res(callback(error, data));
      }
    );
  });
}

const images = [
  "http://lorempixel.com/100/100/people",
  "http://lorempixel.com/100/100/cats",
  "http://lorempixel.com/100/100/animals"
];
const commentModel = randomNumber => {
  return {
    creater: faker.name.findName(),
    createrLogo: images[randomNumber],
    text: faker.lorem.paragraph()
  };
};
const dataModel = (
  type,
  numberOfComments,
  randomPostImageNumber,
  randomCommentLogoNumber
) => {
  return {
    title: faker.lorem.text(),
    category: type,
    createdAt: faker.date.past(),
    text: faker.lorem.paragraph(),
    creater: faker.name.findName(),
    entity: faker.company.companyName(),
    createrLogo: images[randomPostImageNumber],
    target: faker.commerce.department(),
    comments: Array(numberOfComments)
      .fill(0)
      .map(() => commentModel(randomCommentLogoNumber))
  };
};

function createFakerNumbers() {
  let randomNumber = Math.random();
  if (randomNumber < 0.5) {
    randomNumber = Math.floor(randomNumber);
  } else if (randomNumber > 0.5 && randomNumber < 0.7) { // pure hack
    randomNumber = 2;
  } else {
    randomNumber = Math.ceil(randomNumber);
  }
  return randomNumber;
}

async function createFakeData() {
  const types = ["product", "pitch", "problem", "activity", "challenge"];
  for (let type of types) {
    const data = Array(10)
      .fill(0)
      .map(() => {
        const numberOfComments = Math.floor(Math.random() * 15 + 1);
        return dataModel(
          type,
          numberOfComments,
          createFakerNumbers(),
          createFakerNumbers()
        );
      });
    await createFiles(type, data, (error, data) => {
      if (error) console.log("Error writing files");
      else console.log(`has written ${type}`);
    });
  }
}

function startCreateFakeData() {
  mkdirp(path.resolve(__dirname, "data"), function(err) {
    if (err) console.error(err);
    else createFakeData();
  });
}
