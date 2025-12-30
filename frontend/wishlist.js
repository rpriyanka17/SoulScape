const allPlaces = [
    {
        id: 101,
        name: "Phoenix Mall",
        category: "Shopping Mall",
        rating: 4.6,
        location: "Chennai",
        image: "img/mall.jpg",
    },
    {
        id: 102,
        name: "VGP Marine Kingdom",
        category: "Aquarium",
        rating: 4.3,
        location: "Chennai",
        image: "img/aqua.jpg",
    },
    {
        id: 103,
        name: "Marina Beach",
        category: "Beach",
        rating: 4.7,
        location: "Chennai",
        image: "img/marina.jpg",
    }
];

let saved = JSON.parse(localStorage.getItem("wishlist")) || [];

const container = document.getElementById("wishlist-container");

saved.forEach(id => {
    const p = allPlaces.find(pl => pl.id == id);
    if (p) {
        container.innerHTML += `
            <div class="card">
                <img src="${p.image}" />
                <h3>${p.name}</h3>
                <p>${p.category}</p>
                <p>⭐ ${p.rating}</p>
                <button onclick="removeFromWishlist(${p.id})">Remove ❌</button>
                <button onclick="window.location.href='place.html?id=${p.id}'">View Details</button>
            </div>
        `;
    }
});
