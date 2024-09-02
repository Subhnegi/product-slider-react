# product-slider-react
**ProductSlider Component**
The ProductSlider component is a versatile image slider designed for React  applications. It allows you to display a set of images in a customizable carousel format. You can enable magnification, navigation buttons, and adjust various styling options.
this component can be used in e-commerce applications to display products and mockups.

![screenshot](https://i.ibb.co/wgyyfzd/sc.png)

**Installation**
To use the ProductSlider component in your project, follow these steps:

Install the package via npm or yarn:

```
npm install product-slider-component
```
### or

```
yarn add product-slider-component

```
Import the component into your React application:
```
import { ProductSlider } from 'product-slider-react';
```
if you just want to use magnifier for any image 
```
import { Magnifier } from 'product-slider-react';
```

**Usage**

The ProductSlider component accepts the following props:

```
width (optional): The width of the slider (default: “700px”).
height (optional): The height of the slider (default: “100%”).
magnify (optional): Enable image magnification (default: true).
images: An array of image objects with an img property containing the image URL.*upto 14 images if tilePostion is "bottom" else 10*
magnifierSize (optional): Size of the magnifier (default: 200).
zoomLevel (optional): Zoom level for the magnified image (default: 3).
MagnifierBorderRadius (optional): Border radius for the magnifier (default: “50”).
prevIcon (optional): Custom icon for the previous button (default: “<”).
nextIcon (optional): Custom icon for the next button (default: “>”).
buttonBg (optional): Background color for navigation buttons (default: “#b8b7b4”).
imgBg (optional): Background color for the main image (default: “#b8b7b4”).
imgRadius (optional): Border radius for the main image (default: “20px”).
tileRadius (optional): Border radius for thumbnail tiles (default: “10px”).
tilePosition (optional): Position of thumbnail tiles (“bottom” | “right” | “left”, default: “bottom”).
```

**Example usage**:

```
<ProductSlider
  width="800px"
  height="60vh"
  images={[
    { img: 'image1.jpg' },
    { img: 'image2.jpg' },
    // Add more images...
  ]}
  // Other props...
/>
```

# Magnifier
The Magnifier component is used internally by the ProductSlider component for image magnification. You can also use it independently if needed.

**Props for Magnifier:**
```
imgUrl: The URL of the image to magnify.
magnifierSize (optional): Size of the magnifier (default: 200).
zoomLevel (optional): Zoom level for the magnified image (default: 3).
BorderRadius (optional): Border radius for the magnifier (default: “50”).
```

**Example usage:**
```
<Magnifier
  imgUrl="image.jpg"
  magnifierSize={150}
  zoomLevel={2}
  BorderRadius="30"
/>
```
**License**
This component is released under the MIT License. Feel free to use it in your projects!

**Message**: 
this is the initial version of our component! While it may have a few quirks, rest assured—we’re actively working to resolve them. If you’d like to explore the code, visit our GitHub repository. Your feedback and assistance in solving the issues are most welcome.
