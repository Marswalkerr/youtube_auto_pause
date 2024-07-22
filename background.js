chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.storage.sync.get(['autoPauseEnabled'], function (result) {
        if (result.autoPauseEnabled) {
            chrome.tabs.get(activeInfo.tabId, (tab) => {
                if (tab.url.includes("youtube.com")) {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ['content.js']
                    });
                }
            });
        }
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.storage.sync.get(['autoPauseEnabled'], function (result) {
        if (result.autoPauseEnabled) {
            if (tab.url.includes("youtube.com")) {
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ['content.js']
                });
            }
        }
    });
});

chrome.windows.onFocusChanged.addListener((windowId) => {
    chrome.storage.sync.get(['autoPauseEnabled'], function (result) {
        if (result.autoPauseEnabled) {
            if (windowId === chrome.windows.WINDOW_ID_NONE) {
                chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
                    tabs.forEach((tab) => {
                        chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            func: pauseVideo
                        });
                    });
                });
            } else {
                chrome.windows.get(windowId, { populate: true }, (window) => {
                    window.tabs.forEach((tab) => {
                        if (tab.url.includes("youtube.com")) {
                            chrome.scripting.executeScript({
                                target: { tabId: tab.id },
                                func: resumeVideo
                            });
                        }
                    });
                });
            }
        }
    });
});

function pauseVideo() {
    const video = document.querySelector('video');
    if (video) video.pause();
}

function resumeVideo() {
    const video = document.querySelector('video');
    if (video) video.play();
}
