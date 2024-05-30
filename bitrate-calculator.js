function calculateBitrate() {
    var bitrate = parseFloat(document.getElementById('bitrate').value);
    var bitrateUnits = document.getElementById('bitrate-units').value;
    var videoLength = parseFloat(document.getElementById('video-length').value);
    var videoLengthUnits = document.getElementById('video-length-units').value;
    var fileSize = parseFloat(document.getElementById('file-size').value);

      if (videoLengthUnits === "seconds") {
        videoLength = videoLength / 60; // Convert seconds to minutes
    } else if (videoLengthUnits === "hours") {
        videoLength = videoLength * 60; // Convert hours to minutes
    }

    if (bitrateUnits === "Kbps") {
        bitrate /= 1000; // Convert to Mbps
    }

    if (!bitrate) {
        bitrate = (fileSize * 8000) / videoLength;
        bitrate = bitrateUnits === "Kbps" ? bitrate * 1000 : bitrate;
        document.getElementById('bitrate').value = bitrate;
    } else if (!videoLength) {
        videoLength = (fileSize * 8000) / bitrate;
        videoLength = videoLengthUnits === "minutes" ? videoLength / 60 : videoLength;
        document.getElementById('video-length').value = videoLength;
    } else if (!fileSize) {
        fileSize = (bitrate * videoLength) / 8000;
        document.getElementById('file-size').value = fileSize;
    }

    document.getElementById('bitrate-result').innerText = `Bitrate: ${bitrate.toFixed(2)} ${bitrateUnits}, Video Length: ${videoLength.toFixed(2)} ${videoLengthUnits}, File Size: ${fileSize.toFixed(2)} GB`;
}
