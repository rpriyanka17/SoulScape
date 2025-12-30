// Get ID from URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Load all dynamic places (same object from explore page)
const allPlaces = [
    {
        id: 101,
        name: "Phoenix Mall",
        category: "Shopping Mall",
        rating: 4.6,
        location: "Chennai",
        image: "img/mall.jpg",
        desc: "The largest shopping mall with cinema, food court and branded stores.",
        timing: "10 AM - 10 PM",
        price: "Free entry"
    },
    {
        id: 102,
        name: "VGP Marine Kingdom",
        category: "Aquarium",
        rating: 4.3,
        location: "Chennai",
        image: "img/aqua.jpg",
        desc: "India's largest walkthrough aquarium with marine animals.",
        timing: "9 AM - 7 PM",
        price: "₹699"
    },
    {
        id: 103,
        name: "Marina Beach",
        category: "Beach",
        rating: 4.7,
        location: "Chennai",
        image: "img/marina.jpg",
        desc: "Famous beach for morning sunrise, food stalls and walks.",
        timing: "Open 24 hours",
        price: "Free"
    }
];

// Find place by ID
const place = allPlaces.find(p => p.id == id);

// Insert into HTML
if (place) {
    document.getElementById("place-img").src = place.image;
    document.getElementById("place-title").textContent = place.name;
    document.getElementById("place-rating").textContent = place.rating;
    document.getElementById("place-desc").textContent = place.desc;
    document.getElementById("place-category").textContent = place.category;
    document.getElementById("place-location").textContent = place.location;
    document.getElementById("place-timing").textContent = place.timing;
    document.getElementById("place-price").textContent = place.price;
}
