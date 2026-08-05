async function loadImportData() {

    const response = await fetch("data/import-framing.json");
    const data = await response.json();

    generateBuildingReport(data.imports);
    generateFloorReport(data.imports);
}

function generateBuildingReport(imports) {

    const totals = {};

    imports.forEach(item => {

        if (!totals[item.building]) {
            totals[item.building] = 0;
        }

        totals[item.building] += item.quantity;
    });

    const tbody =
        document.getElementById("building-report-body");

    tbody.innerHTML = "";

    Object.entries(totals).forEach(([building, qty]) => {

        tbody.innerHTML += `
            <tr>
                <td>${building}</td>
                <td>${qty}</td>
            </tr>
        `;
    });
}

function generateFloorReport(imports) {

    const totals = {};

    imports.forEach(item => {

        const key =
            `${item.building}-${item.floor}`;

        if (!totals[key]) {
            totals[key] = 0;
        }

        totals[key] += item.quantity;
    });

    const tbody =
        document.getElementById("floor-report-body");

    tbody.innerHTML = "";

    Object.entries(totals).forEach(([floor, qty]) => {

        tbody.innerHTML += `
            <tr>
                <td>${floor}</td>
                <td>${qty}</td>
            </tr>
        `;
    });
}

window.onload = loadImportData;
