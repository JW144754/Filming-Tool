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
