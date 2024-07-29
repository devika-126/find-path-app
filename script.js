let entries = [];

function addEntry() {
    const name = document.getElementById('name').value;
    const value = parseFloat(document.getElementById('value').value);

    if (name && !isNaN(value)) {
        entries.push({ name, value });
        updateEntriesList();
        document.getElementById('name').value = '';
        document.getElementById('value').value = '';
    } else {
        alert('Please enter valid name and value.');
    }
}

function updateEntriesList() {
    const entriesList = document.getElementById('entriesList');
    entriesList.innerHTML = '';
    entries.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.name}: ${entry.value}`;
        entriesList.appendChild(li);
    });
}

function calculatePath() {
    if (entries.length === 0) return;

    const details = {};
    entries.forEach(entry => {
        details[entry.name] = entry.value;
    });

    const results = findPath(details);
    updateResultsList(results);
}

function updateResultsList(results) {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';
    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result;
        resultsList.appendChild(li);
    });
}

function findPath(details) {
    const printBill = [];

    while (Object.keys(details).length > 0) {
        const maxKey = getKeyFromValue(details, Math.max(...Object.values(details)));
        const minKey = getKeyFromValue(details, Math.min(...Object.values(details)));
        const maxValue = details[maxKey];
        const minValue = details[minKey];

        const result = round(maxValue + minValue, 1);
        if (result >= 0.0) {
            printBill.push(`${minKey} needs to pay ${maxKey}: ${round(Math.abs(minValue), 2)}`);
            delete details[maxKey];
            delete details[minKey];
            if (result > 0.0) {
                details[maxKey] = result;
            }
        } else {
            printBill.push(`${minKey} needs to pay ${maxKey}: ${round(Math.abs(maxValue), 2)}`);
            delete details[maxKey];
            delete details[minKey];
            details[minKey] = result;
        }
    }

    return printBill;
}

function getKeyFromValue(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
}

function round(value, places) {
    if (places < 0) throw new IllegalArgumentException();
    return Number(Math.round(value + 'e' + places) + 'e-' + places);
}
