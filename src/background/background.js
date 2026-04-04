const injectedTabs = new Set();
/** tabId -> muted before Foqus forced mute (restored on unblock) */
const originalMuteState = new Map();

function urlMatchesPatterns(url, storedUrls) {
    try {
        const { hostname } = new URL(url);
        return storedUrls.some(storedUrl => {
            try {
                const normalized = storedUrl.includes('://') ? storedUrl : `https://${storedUrl}`;
                const { hostname: storedHost } = new URL(normalized);
                return hostname === storedHost;
            } catch {
                return false;
            }
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
        files: ["content/three.min.js", "content/gradient.js", "src/content/main.js"]
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

chrome.runtime.onMessage.addListener(function(message, sender, _sendResponse) {
    if (!message || typeof message.action !== "string") return;
    const tabId = sender.tab?.id;
    if (tabId == null) return;

    if (message.action === "muteTab") {
        chrome.tabs.get(tabId, function(tab) {
            if (chrome.runtime.lastError) return;
            if (!originalMuteState.has(tabId)) {
                const wasMuted = tab.mutedInfo?.muted ?? false;
                originalMuteState.set(tabId, wasMuted);
            }
            chrome.tabs.update(tabId, { muted: true });
        });
    } else if (message.action === "unmuteTab") {
        const originalMuted = originalMuteState.has(tabId)
            ? originalMuteState.get(tabId)
            : false;
        originalMuteState.delete(tabId);
        chrome.tabs.update(tabId, { muted: originalMuted });
    }
});

// Clear tab from set when it starts a new navigation
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    if (changeInfo.status === "loading") {
        injectedTabs.delete(tabId);
    }
});

chrome.tabs.onRemoved.addListener(function(tabId) {
    injectedTabs.delete(tabId);
    originalMuteState.delete(tabId);
});
