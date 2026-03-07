// listen to page navigation and respond accordingly

function toMatchPattern(url) {
	try {
			const { protocol, hostname } = new URL(url);
			return `${protocol}//${hostname}/*`;
	} catch {
			return null;
	}
}

function registerListener(urls) {
	// Remove the old listener before adding a new one
	if (chrome.webRequest.onBeforeRequest.hasListener(callback)) {
		chrome.webRequest.onBeforeRequest.removeListener(callback);
	}

	const patterns = urls.map(toMatchPattern).filter(Boolean); // checks that url is parsable
  if (patterns.length === 0) return; // return if url not parsable
	
	chrome.webRequest.onBeforeRequest.addListener(
		callback,
		{ urls: patterns }
	);
}

function callback(details) {
	if (details.tabId === -1) return;

	chrome.scripting.insertCSS({
		target: { tabId: details.tabId },
		files: ["content/content.css"]
	});
	
	chrome.scripting.executeScript({
		target: { tabId: details.tabId },
		files: ["content/content.js"]
	});
}

// Initial setup
chrome.storage.local.get("avoid", function(result) {
	if (result.avoid) {
		registerListener(result.avoid);
	}
});

// Re-register whenever storage changes
chrome.storage.onChanged.addListener(function(changes) {
	if (changes.avoid) {
		registerListener(changes.avoid.newValue);
	}
});