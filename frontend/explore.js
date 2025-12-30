document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("placesContainer");
  const searchInput = document.getElementById("searchInput");
  const filterBtns = document.querySelectorAll(".filter-btn");

  let allPlaces = [];

  /* ---------- LOAD FROM BACKEND ---------- */
  async function loadPlaces() {
  try {
    const res = await fetch("http://localhost:5000/api/places");
    allPlaces = await res.json();
    window.allPlaces = allPlaces;

    // ⭐ THIS LINE IS CRITICAL
    localStorage.setItem("allPlaces", JSON.stringify(allPlaces));


    renderPlaces(allPlaces);
  } catch (err) {
    console.error("Failed to load places", err);
  }
}


  /* ---------- RENDER ---------- */
  function renderPlaces(places) {
  container.innerHTML = "";

  places.forEach(place => {
    const card = document.createElement("div");
    card.className = "dest-card";

    // 🔑 attach FULL object safely
    card.dataset.place = JSON.stringify(place);

    card.innerHTML = `
      <img src="${place.image || "https://via.placeholder.com/300"}">
      <h3>${place.title}</h3>
      <p>${place.description}</p>
      <small>${place.location || ""}</small>
      <button class="view-btn">View Details</button>
      <button class="save-btn">❤️</button>
    `;

    container.appendChild(card);
  });
  attachSaveListeners()
  attachViewListeners();
}


  /* ---------- VIEW DETAILS ---------- */
  function attachViewListeners() {
  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.onclick = (e) => {
      const card = e.target.closest(".dest-card");

      // ✅ FULL object, zero loss
      const place = JSON.parse(card.dataset.place);

      localStorage.setItem("selectedPlace", JSON.stringify(place));
      window.location.href = "place-details.html";
    };
  });
}



  /* ---------- SAVE SYSTEM ---------- */
  function attachSaveListeners() {
  document.querySelectorAll(".save-btn").forEach(btn => {
    btn.onclick = (e) => {
  const card = e.target.closest(".dest-card");

  // ✨ trigger animation
  btn.classList.add("pop");
  setTimeout(() => btn.classList.remove("pop"), 350);

  const place = {
    title: card.querySelector("h3").innerText,
    description: card.querySelector("p").innerText,
    image: card.querySelector("img").src,
    location: card.dataset.location || "",
    info: card.dataset.info || "",
    reach: card.dataset.reach || "",
    bestTime: card.dataset.bestTime || "",
    gallery: card.dataset.gallery
      ? JSON.parse(card.dataset.gallery)
      : []
  };

  let saved = JSON.parse(localStorage.getItem("savedPlaces")) || [];

  const exists = saved.some(p => p.title === place.title);

  if (exists) {
    saved = saved.filter(p => p.title !== place.title);
    btn.textContent = "❤️";
  } else {
    saved.push(place);
    btn.textContent = "💖";
  }

  localStorage.setItem("savedPlaces", JSON.stringify(saved));
};

  });
}


  /* ---------- SEARCH ---------- */
  searchInput?.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase();
    const filtered = allPlaces.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
    renderPlaces(filtered);
  });

  /* ---------- FILTER ---------- */
  filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    const filtered =
      filter === "all"
        ? allPlaces
        : allPlaces.filter(p => p.category?.toLowerCase() === filter);

    renderPlaces(filtered);
  });
});


  /* ---------- INIT ---------- */
  loadPlaces();
});


