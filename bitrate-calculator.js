function calculateBitrate() {
    var bitrate = parseFloat(document.getElementById('bitrate').value);
    var bitrateUnits = document.getElementById('bitrate-units').value;
    var videoLength = parseFloat(document.getElementById('video-length').value);
    var videoLengthUnits = document.getElementById('video-length-units').value;
    var fileSize = parseFloat(document.getElementById('file-size').value);
    
if (bitrateUnits === "Mbps") {
        bitrate = bitrate * 1000; // Convert Mbps to Kbps
    }

    if (videoLengthUnits === "minutes") {
        videoLength = videoLength * 60; // Convert minutes to seconds
    } else if (videoLengthUnits === "hours") {
        videoLength = videoLength * 3600; // Convert hours to seconds
    }

    if (bitrate && videoLength && !fileSize) {
        fileSize = (bitrate * videoLength) / 8000000; // Calculate file size in GB
        document.getElementById('file-size').value = fileSize.toFixed(3);
    } else if (bitrate && !videoLength && fileSize) {
        videoLength = (fileSize * 8000000) / bitrate; // Calculate video length in seconds
        document.getElementById('video-length').value = (videoLength).toFixed(2);
        document.getElementById('video-length-units').value = "seconds"; // Show result in seconds
    } else if (!bitrate && videoLength && fileSize) {
        bitrate = (fileSize * 8000) / videoLength; // Calculate bitrate in Mbps
        document.getElementById('bitrate').value = (bitrate).toFixed(2); // Show result in Kbps
        document.getElementById('bitrate-units').value = "Kbps";
    }

    document.getElementById('bitrate-result').innerText = `Bitrate: ${bitrate.toFixed(2)} ${bitrateUnits}, Video Length: ${videoLength.toFixed(2)} ${videoLengthUnits}, File Size: ${fileSize.toFixed(2)} GB`;
}
