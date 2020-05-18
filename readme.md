# Infinite Scroll Frontend Challenge
Build an image viewer with infinite scrolling, similar to Pinterest.
https://clever-euclid-4ce9a6.netlify.app

## Break down:
There were two major components for solving this problem:
* **-Fetching random images and appending them to the DOM**
For this I used https://unsplash.com/developers API to retrieve random images, They have a huge selection of beautiful images, the API was easy to use and just needs an API key, they allow for unlimited calls, and it was free.

I put the image fetch call in a function that would give me back 20 images in a JSON file. I itereated through that data and destructured the object in order to get just the image url property from each object. In the same iteration, I used **new Image()** which is a image constructor taht creates a new HTMLImageElement instance (functionally similar as using document.createElement('img')), and then appended that to the DOM.

* **-Load more images when user scrolls to the bottom of the page**
This was the fun part. I had to figure out how I would know when the user reaches the end of the page. In order to do this I called for some data in DOM.

`document.body`:
- `scrollHeight` property returns the entire height of an element in pixels, including padding, but not the border, scrollbar or margin.
- `offsetHeight` property returns the viewable height of an element in pixels, including padding, border and scrollbar, but not the margin.

`document.documentElement`:
- `clientHeight` property returns the viewable height of an element in pixels, including padding, but not the border, scrollbar or margin.
- `scrollHeight` property returns the entire height of an element in pixels, including padding, but not the border, scrollbar or margin.
- `offsetHeight` property returns the viewable height of an element in pixels, including padding, border and scrollbar, but not the margin.

With this information and I am looking for the height of the page and will use `math.max` in order to pick out the biggest pixel number. This will be the document height and therefore the scrolling number we will have to reach to load more images.

Now we had to dynamically get the pixel number of where the user is currently at. To do this I can call on `window.pageYOffset` which returns the number of pixels the document is currently scrolled along the vertical axis. I put this in a conditional to make sure return `window.pageYOffset` only if it is not undefined. If it is undefined I called `Element.scrollTop` property which gets or sets the number of pixels that an element's content is scrolled vertically as a fallback.

Now from I have everything I need to put everything together. First thing I did was call the get images function to load the first batch of images. Then calling the event listener window.onscroll, I created a conditional that checks if the scroll pixel number the user is equal to the max height of the page everytime the user scrolls. When this condition is true it will then call the get image function again.
