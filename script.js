const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const count = 30;
const apiKey = 'kInet-8G-0HtHy0xDHpL0YgYj-7cVkYLeGuNSzGRCIA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log("ready =", ready);
    }
}

function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log("total images = ", totalImages);
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        const img = document.createElement('img');
        
        let description = photo.description;
        if(!description) {
            description = "No description available."
        }
        
        setAttributes(item, {
            href: photo.links.html,
            target: 'blank',
        });

        setAttributes(img, {
            src: photo.urls.regular,
            alt: description,
            title: description,
        });

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function fetchPhotos() {
    try  {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        alert("The following error occured: " + error);
        console.log(error);
    }
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        fetchPhotos();
    }
})

fetchPhotos();