const injectedTabs = new Set();

function toMatchPattern(url) {
    try {
        const { protocol, hostname } = new URL(url);
        return `${protocol}//${hostname}/*`;
    } catch {
        return null;
    }
}

function urlMatchesPatterns(url, storedUrls) {
    try {
        const { hostname } = new URL(url);
        return storedUrls.some(storedUrl => {
            const { hostname: storedHost } = new URL(storedUrl);
            return hostname === storedHost;
        });
    } catch {
        return false;
    }
}

function injectIntoTab(tabId) {
    if (injectedTabs.has(tabId)) return;
    injectedTabs.add(tabId);

    chrome.scripting.insertCSS({
        target: { tabId },
        files: ["shared/variables.css", "content/content.css"]
    });

    chrome.scripting.executeScript({
        target: { tabId },
        files: ["content/three.min.js", "content/gradient.js", "content/content.js"]
    });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Wait until the page is fully loaded
    if (changeInfo.status !== "complete") return;
    if (!tab.url) return;

    chrome.storage.local.get("avoid", function(result) {
        if (!result.avoid) return;
        if (urlMatchesPatterns(tab.url, result.avoid)) {
            injectIntoTab(tabId);
        }
    });
});

// Clear tab from set when it starts a new navigation
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    if (changeInfo.status === "loading") {
        injectedTabs.delete(tabId);
    }
});

chrome.tabs.onRemoved.addListener(function(tabId) {
    injectedTabs.delete(tabId);
});