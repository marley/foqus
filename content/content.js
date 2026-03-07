function showOverlay () {
    // Don't inject twice
    if (document.getElementById("foqus-overlay")) return;

    // Create the overlay element
    const overlay = document.createElement("div");
    overlay.className = "foqus-overlay";

    // Add title
    const title = document.createElement("h1");
    title.className = "foqus-overlay-title";
    title.innerHTML = "This is a danger zone.";
    overlay.appendChild(title);

    // Add button
    const button = document.createElement("button");
    button.className = "foqus-overlay-button";
    button.innerHTML = "I'll go anyway";
    overlay.appendChild(button);

    // Inject into page
    document.body.appendChild(overlay);
}

showOverlay();