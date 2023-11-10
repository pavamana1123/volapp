const sharp = require('sharp');

// Increase the pixel limit
sharp.limitInputPixels(false);

function addTextToImage(inputImagePath, outputImagePath, text, positionXInInch, positionYInInch, maxWidthInInch) {
    // Set the resolution
    const resolution = 300;

    // Set the font size
    const fontSize = 20;

    // Calculate position in pixels
    const positionXInPixel = Math.round(positionXInInch * resolution);
    const positionYInPixel = Math.round(positionYInInch * resolution);

    // Calculate max width in pixels
    const maxWidthInPixel = Math.round(maxWidthInInch * resolution);

    console.log('Starting to process the image...');

    // Load the image
    sharp(inputImagePath)
        .resize({ width: maxWidthInPixel })
        .toBuffer()
        .then(resizedImage => {
            console.log('Image resized successfully.');

            // Add text to the resized image
            sharp(resizedImage)
                .composite([
                    {
                        input: Buffer.from(`<svg><text x="0" y="${fontSize}" font-size="${fontSize}" fill="black">${text}</text></svg>`),
                        top: positionYInPixel,
                        left: positionXInPixel
                    }
                ])
                .toFile(outputImagePath)
                .then(() => {
                    console.log(`Text added successfully. Output image saved to: ${outputImagePath}`);
                })
                .catch(err => {
                    console.error('Error adding text:', err);
                });
        })
        .catch(err => {
            console.error('Error resizing image:', err);
        });
}

// Example usage
const inputImagePath = './image/front.png';
const outputImagePath = './out/1.png';
const text = 'This is a sample text that might be longer than 2 inches and should break into the next line.';
const positionX = 50; // X position in pixels
const positionY = 50; // Y position in pixels
const maxWidth = 300; // Maximum width in pixels

addTextToImage(inputImagePath, outputImagePath, text, positionX, positionY, maxWidth);
