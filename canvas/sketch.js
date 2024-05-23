/* 
   Group: Koro-Sensei
    Iterate through all pixels and generate different colors by mapping noise values to rgba.
    Go slightly towards red (125 - 255, see line 29),
    Change offsets and mapping value space for interesting effects.
    Add additional white forms to create Batik effect.
    Sources: 
    - Daniel Shiffman, The Nature of Code, Buch Example I.6: 2D Perlin noise, https://natureofcode.com/book/introduction/
   -  Shiffman, Youtube: The Coding Train, 11.3: The Pixel Array
*/

function setup() {
  //initials
  createCanvas(400, 400);
  noLoop();
  pixelDensity(1);
  //work with pixels
  loadPixels();
  let offset = 0.01;
  let xoff = 0;
  // Updating pixels with perlin noise
  for (let y = 0; y < height; y++) {
    let yoff = 0;
    for (let x = 0; x < width; x++) {
      //get index every 4 componets of each pixel
      let index = (x + y * width) * 4;
      //set pixels rgba
      //map to rgb value space
      //constants to have different perlin noise values for rgba each loop
      pixels[index + 0] = map(noise(xoff, yoff), 0, 1, 125, 255);
      pixels[index + 1] = map(noise(xoff + 10, yoff + 10), 0, 1, 0, 255);
      pixels[index + 2] = map(noise(xoff + 20, yoff + 20), 0, 1, 0, 255);
      pixels[index + 3] = map(noise(xoff, yoff), 0, 1, 120, 255);
      //increment slowly for smoother results => noise values change slightly
      // increment offsets based on noise value to create paint like texture
      noise(xoff, yoff) > 0.4 ? (yoff += offset * 2) : (yoff += offset);
    }
    noise(xoff, yoff) > 0.4 ? (xoff += offset * 2) : (xoff += offset);
  }
  updatePixels();
  //additional forms
  additionalForms();
}

function additionalForms() {
  //based on noise value, add points or lines to canvas
  for (let j = 0; j < width; j++) {
    for (let i = 0; i < height; i++) {
      let n = noise(i * 0.05, j * 0.05);
      let alpha = map(n, 0, 1, 200, 255);
      stroke(255, alpha);
      fill(255, alpha);
      if (n > 0.7) {
        point(j, i);
      }
      if (n > 0.85) {
        line(i, j, i, i);
        ellipse(i, j, 2, 8);
      }
    }
  }
}
