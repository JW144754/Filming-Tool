document.addEventListener("DOMContentLoaded", function() {
    const bitrateField = document.getElementById("bitrate");
    const videoLengthField = document.getElementById("video-length");
    const fileSizeField = document.getElementById("file-size");
    const bitrateUnits = document.getElementById("bitrate-units");
    const videoLengthUnits = document.getElementById("video-length-units");
    const clearButton = document.getElementById("clear-all");
    const lockButtons = {
        bitrate: document.querySelector('button[onclick="toggleLock(\'bitrate\')"]'),
        videoLength: document.querySelector('button[onclick="toggleLock(\'video-length\')"]'),
        fileSize: document.querySelector('button[onclick="toggleLock(\'file-size\')"]')
    };
    const fields = [bitrateField, videoLengthField, fileSizeField];
    const locked = { bitrate: false, videoLength: false, fileSize: false };

    function toggleLock(field) {
        locked[field] = !locked[field];
        const button = lockButtons[field];
        const inputField = document.getElementById(field);
        if (locked[field]) {
            button.textContent = "🔓";
            inputField.disabled = true;
        } else {
            button.textContent = "🔒";
            inputField.disabled = false;
        }
        button.classList.toggle("locked", locked[field]);
        updateLockButtons();
    }

    function updateLockButtons() {
        const lockedFields = Object.values(locked).filter(value => value).length;
        Object.keys(lockButtons).forEach(key => {
            if (!locked[key]) {
                lockButtons[key].disabled = lockedFields === 1;
            }
        });
    }

    function convertToSeconds(value, unit) {
        switch (unit) {
            case "hours":
                return value * 3600;
            case "minutes":
                return value * 60;
            case "seconds":
            default:
                return value;
        }
    }

    function convertFromSeconds(value, unit) {
        switch (unit) {
            case "hours":
                return value / 3600;
            case "minutes":
                return value / 60;
            case "seconds":
            default:
                return value;
        }
    }

    function convertToMbps(value, unit) {
        switch (unit) {
            case "Kbps":
                return value / 1000;
            case "Mbps":
            default:
                return value;
        }
    }

    function convertFromMbps(value, unit) {
        switch (unit) {
            case "Kbps":
                return value * 1000;
            case "Mbps":
            default:
                return value;
        }
    }

    function calculate() {
        const bitrate = parseFloat(bitrateField.value);
        const videoLength = parseFloat(videoLengthField.value);
        const fileSize = parseFloat(fileSizeField.value);

        const bitrateInMbps = convertToMbps(bitrate, bitrateUnits.value);
        const videoLengthInSeconds = convertToSeconds(videoLength, videoLengthUnits.value);

        if (!locked.fileSize && !isNaN(bitrateInMbps) && !isNaN(videoLengthInSeconds)) {
            fileSizeField.value = (bitrateInMbps * videoLengthInSeconds / 8 / 1024).toFixed(2); // File size in GB
        } else if (!locked.bitrate && !isNaN(fileSize) && !isNaN(videoLengthInSeconds)) {
            const bitrateInMbps = (fileSize * 8 * 1024 / videoLengthInSeconds).toFixed(2); // Bitrate in Mbps
            bitrateField.value = convertFromMbps(bitrateInMbps, bitrateUnits.value).toFixed(2);
        } else if (!locked.videoLength && !isNaN(fileSize) && !isNaN(bitrateInMbps)) {
            const videoLengthInSeconds = (fileSize * 8 * 1024 / bitrateInMbps).toFixed(2); // Video length in seconds
            videoLengthField.value = convertFromSeconds(videoLengthInSeconds, videoLengthUnits.value).toFixed(2);
        }
    }

    function clearAllFields() {
        fields.forEach(field => {
            field.value = "";
            field.disabled = false;
        });
        Object.keys(lockButtons).forEach(key => {
            lockButtons[key].textContent = "🔒";
            lockButtons[key].classList.remove("locked");
            lockButtons[key].disabled = false;
        });
        Object.keys(locked).forEach(key => {
            locked[key] = false;
        });
    }

    fields.forEach(field => {
        field.addEventListener("change", calculate);
        field.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                calculate();
            }
        });
    });

    clearButton.addEventListener("click", clearAllFields);
});
