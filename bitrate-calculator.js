document.addEventListener("DOMContentLoaded", function() {
    const bitrateField = document.getElementById("bitrate");
    const videoLengthField = document.getElementById("video-length");
    const fileSizeField = document.getElementById("file-size");
    const bitrateUnits = document.getElementById("bitrate-units");
    const videoLengthUnits = document.getElementById("video-length-units");
    const clearButton = document.getElementById("clear-all");
    const fields = [bitrateField, videoLengthField, fileSizeField];

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

        if (!isNaN(bitrateInMbps) && !isNaN(videoLengthInSeconds)) {
            // Calculate file size
            fileSizeField.value = (bitrateInMbps * videoLengthInSeconds / 8 / 1024).toFixed(2); // File size in GB
        } else if (!isNaN(fileSize) && !isNaN(videoLengthInSeconds)) {
            // Calculate bitrate
            const calculatedBitrateInMbps = (fileSize * 8 * 1024 / videoLengthInSeconds); // Bitrate in Mbps
            bitrateField.value = convertFromMbps(calculatedBitrateInMbps, bitrateUnits.value).toFixed(2);
        } else if (!isNaN(fileSize) && !isNaN(bitrateInMbps)) {
            // Calculate video length
            const calculatedVideoLengthInSeconds = (fileSize * 8 * 1024 / bitrateInMbps); // Video length in seconds
            videoLengthField.value = convertFromSeconds(calculatedVideoLengthInSeconds, videoLengthUnits.value).toFixed(2);
        }
    }

    function clearAllFields() {
        fields.forEach(field => {
            field.value = "";
        });
    }

    fields.forEach(field => {
        field.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                calculate();
            }
        });
    });

    bitrateUnits.addEventListener("change", calculate);
    videoLengthUnits.addEventListener("change", calculate);

    clearButton.addEventListener("click", clearAllFields);
});
