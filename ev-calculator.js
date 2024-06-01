document.addEventListener("DOMContentLoaded", function() {
    const apertureField = document.getElementById("aperture");
    const shutterSpeedField = document.getElementById("shutter-speed");
    const isoField = document.getElementById("iso");
    const evField = document.getElementById("ev");
    const lockButtons = {
        aperture: document.querySelector('button[onclick="toggleLock(\'aperture\')"]'),
        shutterSpeed: document.querySelector('button[onclick="toggleLock(\'shutter-speed\')"]'),
        iso: document.querySelector('button[onclick="toggleLock(\'iso\')"]'),
        ev: document.querySelector('button[onclick="toggleLock(\'ev\')"]')
    };
    const fields = [apertureField, shutterSpeedField, isoField, evField];
    const locked = { aperture: false, shutterSpeed: false, iso: false, ev: false };

    function toggleLock(field) {
        locked[field] = !locked[field];
        const button = lockButtons[field];
        const selectField = document.getElementById(field);
        if (locked[field]) {
            button.textContent = "🔓";
            selectField.disabled = true;
        } else {
            button.textContent = "🔒";
            selectField.disabled = false;
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

    function calculateEV() {
        const aperture = parseFloat(apertureField.value);
        const shutterSpeed = parseFloat(eval(shutterSpeedField.value.replace('/', '*')));
        const iso = parseFloat(isoField.value);
        const ev = parseFloat(evField.value);

        if (!locked.ev && !isNaN(aperture) && !isNaN(shutterSpeed) && !isNaN(iso)) {
            evField.value = (Math.log2((aperture * aperture) / shutterSpeed) - Math.log2(iso / 100)).toFixed(2);
        } else if (!locked.aperture && !isNaN(ev) && !isNaN(shutterSpeed) && !isNaN(iso)) {
            apertureField.value = Math.sqrt(shutterSpeed * Math.pow(2, ev) * (iso / 100)).toFixed(2);
        } else if (!locked.shutterSpeed && !isNaN(ev) && !isNaN(aperture) && !isNaN(iso)) {
            shutterSpeedField.value = (Math.pow(aperture, 2) / (Math.pow(2, ev) * (iso / 100))).toFixed(2);
        } else if (!locked.iso && !isNaN(ev) && !isNaN(aperture) && !isNaN(shutterSpeed)) {
            isoField.value = (100 * Math.pow(aperture, 2) / (shutterSpeed * Math.pow(2, ev))).toFixed(0);
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
        field.addEventListener("change", calculateEV);
        field.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                calculateEV();
            }
        });
    });

    document.getElementById("clear-button").addEventListener("click", clearAllFields);
});
