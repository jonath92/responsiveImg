const sharp = require("sharp");
const fs = require("fs");
const utils = require("./utils");

const imagePath = utils.imagePath ? utils.imagePath : "./assets/images/";
const outputPath = utils.thumbsPath
  ? utils.thumbsPath
  : "./assets/images/thumbs/";
const files = fs.readdirSync(imagePath);

// Create output folder if it doesn't exist
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

const getImageMetadata = async (imagePath) => {
  return sharp(imagePath).metadata();
};

const cropImage = (baseFileName, imagePath, imageMetadata, item, size) => {
  sharp(imagePath + item)
    .extract({
      width: Math.round((1 - size.left - size.right) * imageMetadata.width),
      height: Math.round((1 - size.top - size.bottom) * imageMetadata.height),
      left: Math.round(size.left * imageMetadata.width),
      top: Math.round(size.top * imageMetadata.height),
    })
    .toFormat(utils.preferredFormat)
    .toFile(
      outputPath + baseFileName + "_" + size.id + "." + utils.preferredFormat
    );
};

files.map(async (item) => {
  const baseFileName = item.split(".")[0];
  const imageMetadata = await getImageMetadata(imagePath + item);

  //convert to webp
  sharp(imagePath + item)
    .toFormat(utils.preferredFormat ? utils.preferredFormat : "webp")
    .toFile(outputPath + baseFileName + "." + utils.preferredFormat);

  utils.sizes.map((size) => {
    cropImage(baseFileName, imagePath, imageMetadata, item, size);
  });
});
