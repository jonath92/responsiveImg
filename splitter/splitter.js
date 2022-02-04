const sharp = require('sharp');
const fs = require('fs');
const utils = require('./utils');

const imagePath = utils.imagePath ? utils.imagePath : './assets/images/';
const outputPath = utils.thumbsPath ? utils.thumbsPath : './assets/images/thumbs/';
const files = fs.readdirSync(imagePath);

// Create output folder if it doesn't exist
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
    console.log("outputPath " + outputPath + " created successfully.");
}

console.log("files = ", files);
console.log("utils = ", utils);

const getImageMetadata = async (imagePath) => {
    return sharp(imagePath).metadata();
}

files.map(async (item) => {
    const baseFileName = item.split('.')[0];
    const imageMetadata = await getImageMetadata(imagePath + item);

    //convert to webp
    sharp(imagePath + item)
        .toFormat(utils.preferredFormat ? utils.preferredFormat : 'webp')
        .toFile(outputPath + baseFileName + '.' + utils.preferredFormat);

    utils.sizes.map(size => {
        console.log("id = ", size.id);
        console.log("size = ", size);
        if (size.id == 'xs') {
            // only resize for xs
            sharp(imagePath + item)
                .resize(size.width, size.height)
                .toFormat(utils.preferredFormat)
                .toFile(outputPath + baseFileName + '_' + size.id + '.' + utils.preferredFormat, (err, info) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(info);
                });
        } else {
            sharp(imagePath + item)
                .extract({
                    width: Math.round((1 - size.left - size.right) * imageMetadata.width), height: Math.round((1 - size.top - size.bottom) * imageMetadata.height),
                    left: Math.round(size.left * imageMetadata.width),
                    top: Math.round((size.top) * imageMetadata.height)
                })
                .resize(size.width, size.height)
                .toFormat(utils.preferredFormat)
                .toFile(outputPath + baseFileName + '_' + size.id + '.' + utils.preferredFormat);
        }
    })
})