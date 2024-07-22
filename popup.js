document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('togglePause');

    // Get the current status of the extension
    chrome.storage.sync.get(['autoPauseEnabled'], function (result) {
        checkbox.checked = result.autoPauseEnabled || false;
    });

    // Listen for changes to the checkbox
    checkbox.addEventListener('change', function () {
        const isChecked = checkbox.checked;
        chrome.storage.sync.set({ autoPauseEnabled: isChecked });
    });
});
