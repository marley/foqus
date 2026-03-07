function addTitleSection(parent, refs) {
	const title = document.createElement("h1");
	title.className = "foqus-overlay-title";
	title.innerHTML = "This is a danger zone.";
	parent.appendChild(title);
	refs.title = title;

	const countdown = document.createElement("div");
	countdown.className = "foqus-overlay-countdown";
	countdown.hidden = true;
	parent.appendChild(countdown);
	refs.countdown = countdown;
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

function formatTime(seconds) {
	const m = Math.floor(seconds / 60);
	const s = seconds % 60;
	return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function addButtonSection(parent, refs) {
	const container = document.createElement("div");
	container.className = "foqus-overlay-button-container";

	const button = document.createElement("button");
	button.className = "foqus-overlay-button";
	button.innerHTML = "I'll go anyway";
	button.addEventListener("click", () => startCountdown(refs));
	container.appendChild(button);

	parent.appendChild(container);
	refs.buttonContainer = container;
	refs.initialButton = button;
}

function startCountdown(refs) {
	const overlay = refs.title.closest("#foqus-overlay");
	if (!overlay) return;

	refs.title.innerHTML = "5 minutes starts now";
	refs.initialButton.remove();
	refs.initialButton = null;

	refs.countdown.hidden = false;
	let remaining = 5 * 60;

	function tick() {
		refs.countdown.textContent = formatTime(remaining);
		if (remaining <= 0) {
			clearInterval(refs.countdownInterval);
			refs.countdownInterval = null;
			showAccessButton(refs);
			return;
		}
		remaining--;
	}
	tick();
	refs.countdownInterval = setInterval(tick, 1000);
}

function showAccessButton(refs) {

	const accessBtn = document.createElement("button");
	accessBtn.className = "foqus-overlay-button";
	accessBtn.innerHTML = "access distraction site";
	accessBtn.addEventListener("click", () => {
		const overlay = refs.title.closest("#foqus-overlay");
		if (refs.countdownInterval) {
			clearInterval(refs.countdownInterval);
		}
		overlay?.remove();
	});
	refs.buttonContainer.appendChild(accessBtn);
}
function showOverlay(urlsToVisit) {
	if (document.getElementById("foqus-overlay")) return;

	const overlay = document.createElement("div");
	overlay.id = "foqus-overlay";
	overlay.className = "foqus-overlay";

	const refs = {};
	overlay._foqusRefs = refs;

	addTitleSection(overlay, refs);
	addMainSection(overlay, urlsToVisit);
	addButtonSection(overlay, refs);

	document.body.appendChild(overlay);
}

chrome.storage.local.get("visit", function(result) {
	if (result.visit) {
		showOverlay(result.visit);
	}
});
