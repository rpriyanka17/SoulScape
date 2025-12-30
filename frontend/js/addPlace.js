document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addPlaceForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 🖼️ Gallery handling (comma-separated → array)
    const galleryInput = document.getElementById("placeGallery")?.value || "";
    const gallery = galleryInput
      .split(",")
      .map(url => url.trim())
      .filter(url => url !== "");

    const place = {
      title: document.getElementById("placeTitle").value.trim(),
      location: document.getElementById("placeLocation").value.trim(),
      description: document.getElementById("placeDescription").value.trim(),
      info: document.getElementById("placeInfo")?.value.trim() || "",
      category: document.getElementById("placeCategory").value,

      // 🧠 Fallback image to prevent broken UI
      image:
        document.getElementById("placeImage").value.trim() ||
        "https://via.placeholder.com/400x250?text=SoulScape",

      // ✨ Optional but render-ready
      gallery: gallery,           // always array
      reach: document.getElementById("placeReach")?.value.trim() || "",
      bestTime: document.getElementById("placeTime")?.value.trim() || "",

      createdAt: new Date().toISOString()
    };

    // ❗ Required fields check
    if (!place.title || !place.location || !place.description) {
      alert("Please fill all required fields ⚠️");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(place)
      });

      if (!res.ok) {
        alert("Failed to add place ❌");
        return;
      }

      alert("Place added successfully 🌿");
      window.location.href = "explore.html";

    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  });
});
