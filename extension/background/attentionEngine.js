let currentSession = null;
let browserFocused = true;

function startNewSession(tab) {

    if (!tab) {
        return;
    }

    currentSession = {

        tabId: tab.id,

        windowId: tab.windowId,

        title: tab.title,

        url: tab.url,

        startTime: Date.now()

    };

    console.log("");
    console.log("Starting New Session");

    console.log(currentSession);

}

function endCurrentSession() {

    if (!currentSession) {
        return;
    }

    const endTime = Date.now();

    const duration = endTime - currentSession.startTime;

    let domain = "internal";

    try {

        domain = new URL(currentSession.url).hostname;

    } catch {

        domain = "internal";

    }

    const finishedSession = {

        tabId: currentSession.tabId,

        windowId: currentSession.windowId,

        title: currentSession.title,

        url: currentSession.url,

        domain: domain,

        startTime: currentSession.startTime,

        endTime: endTime,

        duration: duration,

        createdAt: Date.now()

    };

    console.log("");

    console.log("Finished Session");

    console.log(finishedSession);

    currentSession = null;

}

export function handleAttentionChange(event) {

    if (
        event.type !== "TAB_CHANGED" &&
        event.type !== "URL_CHANGED" &&
        event.type !== "WINDOW_FOCUS_CHANGED"
    ) {
        return;
    }

    console.log("");
    console.log("================================");
    console.log("ATTENTION ENGINE");
    console.log("================================");

    console.log("Event:", event.type);

    if (event.type === "TAB_CHANGED") {
        console.log("Reason: User switched tabs.");
    }

    if (event.type === "URL_CHANGED") {
        console.log("Reason: URL changed inside the same tab.");
    }

    if (event.type === "WINDOW_FOCUS_CHANGED") {

        console.log("");
        console.log("================================");
        console.log("ATTENTION ENGINE");
        console.log("================================");

        console.log("Event:", event.type);
        console.log("Reason: Browser window focus changed.");

        //
        // User left Brave
        //
        if (event.windowId === chrome.windows.WINDOW_ID_NONE) {

            if (!browserFocused) {
                console.log("Ignored: Browser already unfocused.");
                return;
            }

            browserFocused = false;

            endCurrentSession();

            return;
        }

        //
        // User returned to Brave
        //
        if (browserFocused) {
            console.log("Ignored: Browser already focused.");
            return;
        }

        browserFocused = true;

        startNewSession(event.tab);

        return;
    }

    //
    // TAB_CHANGED or URL_CHANGED
    //

    if (currentSession) {

        const sameTab =
            currentSession.tabId === event.tab.id;

        const sameUrl =
            currentSession.url === event.tab.url;

        if (sameTab && sameUrl) {

            console.log("Ignored: Same tab and same URL.");

            return;

        }

        endCurrentSession();

    }

    startNewSession(event.tab);

}