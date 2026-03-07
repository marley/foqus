// listen to page navigation and respond accordingly

function registerListener(urls) {
	console.log('add listener');
	console.log(urls);
	// Remove the old listener before adding a new one
	if (chrome.webRequest.onBeforeRequest.hasListener(callback)) {
		chrome.webRequest.onBeforeRequest.removeListener(callback);
	}
	
	chrome.webRequest.onBeforeRequest.addListener(
		callback,
		{ urls: urls }
	);
}

function callback(details) {
	if (details.tabId === -1) return;
	console.log('callback')

	chrome.scripting.executeScript({
		target: { tabId: details.tabId },
		func: (url) => {
			window.alert(`Are you sure you want to visit ${url}?`);
		},
		args: [details.url]
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