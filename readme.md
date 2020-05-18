# Infinite Scroll Frontend Challenge
Build an image viewer with infinite scrolling, similar to Pinterest.

## Break down:
There were two major components for solving this problem:

### Fetching random images and appending them to the DOM
For this I used https://unsplash.com/developers API to retrieve random images, The API was easy to use and just needs an API key, they allow for unlimited calls, and it was free.

I put the image fetch call in a function `getTwentyRandomImages()` that returned 20 images in a JSON file. I itereated through that data and destructured the object in order to get just the image url property from each object. In the same iteration, I used `new Image()` which is a image constructor that creates a new HTMLImageElement instance (functionally similar as using `document.createElement('img')`), and then appended that to the DOM.

### Load more images when user scrolls to the bottom of the page
This was the fun part. I had to figure out how I would know when the user reaches the end of the page. In order to do this I called for some data in DOM.

`document.body`:
- `scrollHeight` property returns the entire height of an element in pixels, including padding, but not the border, scrollbar or margin.
- `offsetHeight` property returns the viewable height of an element in pixels, including padding, border and scrollbar, but not the margin.

`document.documentElement`:
- `clientHeight` property returns the viewable height of an element in pixels, including padding, but not the border, scrollbar or margin.
- `scrollHeight` property returns the entire height of an element in pixels, including padding, but not the border, scrollbar or margin.
- `offsetHeight` property returns the viewable height of an element in pixels, including padding, border and scrollbar, but not the margin.

With this information and I am able to make a function called `getDocumentHeight()` which looking for the biggest height of the page and will use `math.max` in order to pick out the highest pixel number.

Now we had to dynamically get the pixel number of the scroll height the user is currently at. To do this I created a function `getScrollTop()` that calls a conditional that returns `window.pageYOffset` (returns the number of pixels the document is currently scrolled along in the vertical axis) if it is not undefined. If it is, I called `Element.scrollTop` property which gets or sets the number of pixels that an element's content is scrolled vertically as a fallback.

Now I have everything I need to create an infinite scroll. First thing to do is call  `getTwentyRandomImages()` to load the first batch of images. Then calling the event listener `window.onscroll`, I created a conditional that checks `getScrollTop()` (user scroll height) is less than `getDocumentHeight()` (max document height) then it will return. Otherwise the user has reache dthe bottom of the page and we call `getTwentyRandomImages()` again.

Result: https://clever-euclid-4ce9a6.netlify.app
