function calculate() {
    const bitrate = document.getElementById('bitrate').value;
    const length = document.getElementById('length').value;
    const filesize = document.getElementById('filesize').value;

    let resultText = '';

    if (bitrate && length) {
        const size = (bitrate * length * 60) / 8 / 1024;
        resultText = `Estimated File Size: ${size.toFixed(2)} GB`;
    } else if (bitrate && filesize) {
        const length = (filesize * 1024 * 8) / (bitrate * 60);
        resultText = `Estimated Video Length: ${length.toFixed(2)} minutes`;
    } else if (length && filesize) {
        const bitrate = (filesize * 1024 * 8) / (length * 60);
        resultText = `Required Bitrate: ${bitrate.toFixed(2)} Mbps`;
    } else {
        resultText = 'Please fill in two of the fields to calculate the third.';
    }

    document.getElementById('result').innerText = resultText;
}

// Calculate Exposure Value (EV)
function calculateEV() {
    var aperture = document.getElementById('aperture').value;
    var shutterSpeed = document.getElementById('shutter-speed').value;
    var iso = document.getElementById('iso').value;

    if (aperture && shutterSpeed && iso) {
        var ev = Math.log2(Math.pow(aperture, 2) / shutterSpeed) + Math.log2(iso / 100);
        document.getElementById('ev-result').innerText = 'Exposure Value (EV): ' + ev.toFixed(2);
    } else {
        document.getElementById('ev-result').innerText = 'Please enter values for Aperture, Shutter Speed, and ISO.';
    }
}
