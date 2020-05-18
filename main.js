const container = document.querySelector(".container")

const getDocumentHeight = () => {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
    );
};

const getTwentyRandomImages = () => {
  fetch(
    'https://api.unsplash.com/photos/random?count=20&client_id=sZYT5OrnZb8AidmeQgYXkAcYnK0kdD9oPVQ2yeoGFP0'
  )
    .then((response) => response.json())
    .then((data) => {
      let urlArray = data.map(({urls}) => urls.small)
      console.log(urlArray)

      urlArray.forEach((url) => {
        const img = new Image
        img.src = url
        img.className = "image"
        container.appendChild(img)
      })
    })
}

function getScrollTop() {
  // window.pageYOffset return the number of pixels page is scrolled to
  return window.pageYOffset !== undefined
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop
}

// first batch of images
getTwentyRandomImages()

// if getScrollTop is bigger then document height then get another batch of images
window.onscroll = () => {
  if (getScrollTop() < getDocumentHeight() - window.innerHeight) return
  getTwentyRandomImages()
}
