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

/// Calculate Exposure Value (EV)
function calculateEV() {
    var aperture = parseFloat(document.getElementById('aperture').value);
    var shutterSpeed = parseFloat(document.getElementById('shutter-speed').value);
    var iso = parseFloat(document.getElementById('iso').value);
    var ev = parseFloat(document.getElementById('ev').value);

    if (ev) {
        // Calculate missing value based on entered values
        if (aperture && shutterSpeed && iso) {
            ev = Math.log2(Math.pow(aperture, 2) / shutterSpeed) + Math.log2(iso / 100);
        } else if (aperture && shutterSpeed) {
            iso = Math.pow(2, ev - Math.log2(Math.pow(aperture, 2) / shutterSpeed)) * 100;
        } else if (aperture && iso) {
            shutterSpeed = Math.pow(2, ev - Math.log2(iso / 100)) * Math.pow(aperture, 2);
        } else if (shutterSpeed && iso) {
            aperture = Math.sqrt(Math.pow(2, ev - Math.log2(iso / 100)) * shutterSpeed);
        }
        document.getElementById('ev-result').innerText = `Aperture: f/${aperture.toFixed(1)}, Shutter Speed: 1/${Math.round(1/shutterSpeed)}, ISO: ${iso.toFixed()}, Exposure Value (EV): ${ev.toFixed(2)}`;
    } else {
        // Calculate EV if it is not provided
        ev = Math.log2(Math.pow(aperture, 2) / shutterSpeed) + Math.log2(iso / 100);
        document.getElementById('ev-result').innerText = `Aperture: f/${aperture.toFixed(1)}, Shutter Speed: 1/${Math.round(1/shutterSpeed)}, ISO: ${iso.toFixed()}, Exposure Value (EV): ${ev.toFixed(2)}`;
    }
}
