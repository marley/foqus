import { urlMatchesPatterns } from "./urlMatchesPatterns.js";

const injectedTabs = new Set();
/** tabId -> muted before Foqus forced mute (restored on unblock) */
const originalMuteState = new Map();

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

/** When the avoid list gains a URL, inject into already-open tabs that now match (no reload needed). */
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName !== "local" || !changes.avoid) return;
    const newAvoid = changes.avoid.newValue;
    if (!Array.isArray(newAvoid) || newAvoid.length === 0) return;

    chrome.tabs.query({}, function(tabs) {
        if (chrome.runtime.lastError) return;
        for (const tab of tabs) {
            if (tab.id == null || !tab.url || tab.status !== "complete") continue;
            if (injectedTabs.has(tab.id)) continue;
            if (urlMatchesPatterns(tab.url, newAvoid)) {
                injectIntoTab(tab.id);
            }
        }
    });
});

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
