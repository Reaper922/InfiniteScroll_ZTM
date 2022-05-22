// Unsplash API
const count = 10;
const apiKey = 'kInet-8G-0HtHy0xDHpL0YgYj-7cVkYLeGuNSzGRCIA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
    try  {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

getPhotos();