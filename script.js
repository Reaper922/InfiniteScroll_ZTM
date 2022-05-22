const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

const count = 10;
const apiKey = 'kInet-8G-0HtHy0xDHpL0YgYj-7cVkYLeGuNSzGRCIA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function displayPhotos() {
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);

        let description = photo.description;
        if(!description) {
            description = "No description available."
        }
        img.setAttribute('alt', description);
        img.setAttribute('title', description);

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
        console.log(error);
    }
}

fetchPhotos();