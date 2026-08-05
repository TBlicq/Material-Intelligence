async function loadImportData() {

    const response = await fetch("data/import-framing.json");

    const data = await response.json();

    generateBuildingReport(data.imports);
}

function generateBuildingReport(imports) {

    const buildingTotals = {};

    imports.forEach(item => {

        if (!buildingTotals[item.building]) {

            buildingTotals[item.building] = 0;
        }

        buildingTotals[item.building] += item.quantity;
    });

    const tbody = document.getElementById("building-report-body");

    tbody.innerHTML = "";

    Object.keys(buildingTotals).forEach(building => {

        tbody.innerHTML += `
            <tr>
                <td>${building}</td>
                <td>${buildingTotals[building]}</td>
            </tr>
        `;
    });
}

window.onload = loadImportData;
