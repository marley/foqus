function addTitleSection(parent) {
	// Add title
	const title = document.createElement("h1");
	title.className = "foqus-overlay-title";
	title.innerHTML = "This is a danger zone.";
	parent.appendChild(title);

}

function addMainSection(parent, urlArray) {
	if (urlArray && urlArray.length > 0) {
		const main = document.createElement("div");
		
		const subtitle = document.createElement("h2");
		subtitle.className = "foqus-overlay-subtitle";
		subtitle.innerHTML = "Your chosen alternatives:";
		main.appendChild(subtitle);


		const ul = document.createElement("ul");
		ul.className = "foqus-overlay-suggested-sites";
		urlArray.forEach((suggestedSiteUrl) => {
			const li = document.createElement("li");
			const suggestedSite = document.createElement("a");
			suggestedSite.setAttribute("href", suggestedSiteUrl);
			suggestedSite.innerHTML = suggestedSiteUrl;
			li.appendChild(suggestedSite);
			ul.appendChild(li);
		});
		main.appendChild(ul);
		parent.appendChild(main);
	}
}

function addButton(parent) {
	// Add button
	const button = document.createElement("button");
	button.className = "foqus-overlay-button";
	button.innerHTML = "I'll go anyway";
	parent.appendChild(button);
}
function showOverlay (urlsToVisit) {
	// Don't inject twice
	if (document.getElementById("foqus-overlay")) return;

	// Create the overlay element
	const overlay = document.createElement("div");
	overlay.className = "foqus-overlay";

	addTitleSection(overlay);

	addMainSection(overlay, urlsToVisit);

	addButton(overlay);

	// Inject into page
	document.body.appendChild(overlay);
}

chrome.storage.local.get("visit", function(result) {
	if (result.visit) {
		showOverlay(result.visit);
	}
});
