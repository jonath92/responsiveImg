const sizes = [
  { id: "xs", left: 0, top: 0, right: 0, bottom: 0 },
  { id: "md", left: 0.1, top: 0.25, right: 0.1, bottom: 0.2 },
  { id: "lg", left: 0.1, top: 0.25, right: 0.1, bottom: 0.2 },
  { id: "xl", left: 0.1, top: 0.25, right: 0.1, bottom: 0.2 },
];

const preferredFormat = "webp";

const imagePath = "./src/images/";
const thumbsPath = "./src/output/";

/*
    Original Image
    --------------------------------------
    |         ↑                          |
    |         top                        |
    |         ↓                          |
    | ← left →----------------- ← right →|
    |         |               |          |    
    |         |    cropped    |          |
    |         |     image     |          |
    |         |               |          |
    |         -----------------          |
    |                          ↑         |      
    |                          bottom    |      
    |                          ↓         |      
    --------------------------------------

    Example: 
    Original Image [origWidth x origHeight] = 5000x4000
    Top = 0.25
    Left = 0.2
    Right = 0.1
    Bottom = 0.1

    CroppedImage = 3500x2600

    CroppedImageResized [width x height] = 1200x660
*/

module.exports = { sizes, preferredFormat, imagePath, thumbsPath };
