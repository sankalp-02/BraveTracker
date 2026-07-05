import { logSection, logKeyValue } from "../utils/logger.js";
import { handleAttentionChange } from "./attentionEngine.js";

console.log("BraveTracker Background Service Worker Started");

// Fired whenever the active tab changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    if (changeInfo.status !== "complete") {
        return;
    }

    if (!tab.url) {
        return;
    }

    handleAttentionChange({

        type: "URL_CHANGED",

        tab

    });

});
// Fired whenever a tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    if (changeInfo.status !== "complete") {
        return;
    }

    // console.log("================================");
    // logSection("PAGE LOADED");
    // logKeyValue("Tab ID", tabId);
    // logKeyValue("Title", tab.title);
    // logKeyValue("URL", tab.url);
    // console.log("================================");

});

chrome.windows.onFocusChanged.addListener(async (windowId) => {

    if (windowId === chrome.windows.WINDOW_ID_NONE) {

        handleAttentionChange({
            type: "WINDOW_FOCUS_CHANGED",
            windowId,
            tab: null
        });

        return;
    }

    const tabs = await chrome.tabs.query({
        active: true,
        windowId: windowId
    });

    const activeTab = tabs[0] ?? null;

    handleAttentionChange({
        type: "WINDOW_FOCUS_CHANGED",
        windowId,
        tab: activeTab
    });

});