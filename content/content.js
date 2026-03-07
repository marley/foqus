function showOverlay () {
    // Don't inject twice
    if (document.getElementById("foqus-overlay")) return;

    // Create the overlay element
    const overlay = document.createElement("div");
    overlay.className = "foqus-overlay";

    // Add content
    const title = document.createElement("h1");
    title.innerHTML = "Attempting to visit guilty pleasure site";
    title.style.fontSize = "50px";
    title.style.color = "white";
    overlay.appendChild(title);

    // Inject into page
    document.body.appendChild(overlay);
}

showOverlay();