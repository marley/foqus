const OVERRIDE_LIMIT_DEFAULT = 5;

function addTitleSection(parent, refs) {
	const title = document.createElement("h1");
	title.className = "foqus-overlay-title";
	title.textContent = "This is a danger zone.";
	parent.appendChild(title);
	refs.title = title;
}

function addMainSection(parent, urlArray) {
	if (urlArray && urlArray.length > 0) {
		const main = document.createElement("div");
		
		const subtitle = document.createElement("h2");
		subtitle.className = "foqus-overlay-subtitle";
		subtitle.textContent = "Your chosen alternatives:";
		main.appendChild(subtitle);

		const ul = document.createElement("ul");
		ul.className = "foqus-overlay-suggested-sites";
		urlArray.forEach((suggestedSiteUrl) => {
			const li = document.createElement("li");
			const suggestedSite = document.createElement("a");
			suggestedSite.setAttribute("href", suggestedSiteUrl);
			suggestedSite.textContent = suggestedSiteUrl;
			li.appendChild(suggestedSite);
			ul.appendChild(li);
		});

		main.appendChild(ul);
		parent.appendChild(main);
	}
}

function getOverrideMinutes(value) {
	const n = value != null ? Math.floor(Number(value)) : null;
	if (n == null || Number.isNaN(n) || n < 1) return OVERRIDE_LIMIT_DEFAULT;
	return Math.min(120, n);
}

function addButtonSection(parent, refs, minutes) {
	const container = document.createElement("div");
	container.className = "foqus-overlay-button-container";

	const button = document.createElement("button");
	button.className = "foqus-overlay-button";
	button.textContent = `unblock for ${minutes} minute${minutes === 1 ? "" : "s"}`;
	button.addEventListener("click", () => grantUnblock(minutes));
	container.appendChild(button);

	parent.appendChild(container);
	refs.buttonContainer = container;
}

function grantUnblock(minutes) {
	const overlay = document.getElementById("foqus-overlay");
	if (!overlay) return;

	const host = normalizeHost(location.hostname);
	if (host) {
		const expiry = Date.now() + minutes * 60 * 1000;
		chrome.storage.local.get("overrideUntilByHost", (result) => {
			const map = result.overrideUntilByHost || {};
			chrome.storage.local.set({
				overrideUntilByHost: { ...map, [host]: expiry }
			});
		});
	}

	if (overlay._foqusGradient) {
		overlay._foqusGradient.destroy();
		overlay._foqusGradient = null;
	}
	overlay.remove();

	setTimeout(() => {
		chrome.storage.local.get("visit", (result) => {
			if (result.visit) maybeShowOverlay(result.visit);
		});
	}, minutes * 60 * 1000);
}
function showOverlay(urlsToVisit) {
	if (document.getElementById("foqus-overlay")) return;

	chrome.storage.local.get(["overrideLimitMinutes", "preferReducedMotion"], (result) => {
		const minutes = getOverrideMinutes(result.overrideLimitMinutes);
		const preferReducedMotion = result.preferReducedMotion === true;

		const overlay = document.createElement("div");
		overlay.id = "foqus-overlay";
		overlay.className = "foqus-overlay" + (preferReducedMotion ? " foqus-overlay--reduced-motion" : "");

		const content = document.createElement("div");
		content.className = "foqus-overlay-content";

		const refs = {};
		overlay._foqusRefs = refs;

		addTitleSection(content, refs);
		addMainSection(content, urlsToVisit);
		addButtonSection(content, refs, minutes);

		overlay.appendChild(content);
		document.body.appendChild(overlay);

		if (preferReducedMotion) {
			const staticBg = document.createElement("div");
			staticBg.className = "foqus-gradient-static";
			overlay.insertBefore(staticBg, overlay.firstChild);
		} else if (typeof FoqusGradient !== "undefined") {
			overlay._foqusGradient = new FoqusGradient(overlay);
		}
	});
}

function normalizeHost(hostname) {
	if (!hostname || typeof hostname !== "string") return "";
	return hostname.toLowerCase().replace(/\.$/, "");
}

function pruneExpiredHosts(map) {
	const now = Date.now();
	const pruned = {};
	for (const [host, until] of Object.entries(map || {})) {
		if (until > now) pruned[host] = until;
	}
	return pruned;
}

function isOverrideActiveForHost(overrideUntilByHost, host) {
	const until = overrideUntilByHost?.[host];
	return until != null && Date.now() < until;
}

function maybeShowOverlay(urlsToVisit) {
	const host = normalizeHost(location.hostname);
	if (!host) {
		showOverlay(urlsToVisit);
		return;
	}

	chrome.storage.local.get(["overrideUntilByHost", "overrideLimitMinutes"], (result) => {
		const map = result.overrideUntilByHost || {};
		const pruned = pruneExpiredHosts(map);
		if (Object.keys(pruned).length !== Object.keys(map).length) {
			chrome.storage.local.set({ overrideUntilByHost: pruned });
		}

		if (isOverrideActiveForHost(pruned, host)) {
			const delay = pruned[host] - Date.now();
			setTimeout(() => maybeShowOverlay(urlsToVisit), Math.max(delay, 0));
			return;
		}

		showOverlay(urlsToVisit);
	});
}

chrome.storage.local.get("visit", function(result) {
	if (result.visit) {
		maybeShowOverlay(result.visit);
	}
});
