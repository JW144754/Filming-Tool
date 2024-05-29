function calculateEV() {
    var aperture = parseFloat(document.getElementById('aperture').value);
    var shutterSpeed = parseFloat(document.getElementById('shutter-speed').value);
    var iso = parseFloat(document.getElementById('iso').value);
    var ev = parseFloat(document.getElementById('ev').value);

    if (aperture && shutterSpeed && iso && !ev) {
        ev = Math.log2(Math.pow(aperture, 2) / shutterSpeed) - Math.log2(iso / 100);
        document.getElementById('ev').value = ev.toFixed(2);
    } else if (aperture && shutterSpeed && !iso && ev) {
        iso = 100 * Math.pow(2, Math.log2(Math.pow(aperture, 2) / shutterSpeed) - ev);
        document.getElementById('iso').value = iso.toFixed(2);
    } else if (aperture && !shutterSpeed && iso && ev) {
        shutterSpeed = Math.pow(aperture, 2) / (Math.pow(2, ev) * (iso / 100));
        document.getElementById('shutter-speed').value = (1 / shutterSpeed).toFixed(2);
    } else if (!aperture && shutterSpeed && iso && ev) {
        aperture = Math.sqrt((Math.pow(2, ev) * (iso / 100)) * shutterSpeed);
        document.getElementById('aperture').value = aperture.toFixed(2);
    } else {
        alert("Please leave one field empty to calculate.");
    }
}

document.getElementById('calculate-button').addEventListener('click', calculateEV);
