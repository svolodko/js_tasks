const data = `city,population,area,density,country
Shanghai,24256800,6340,3826,China
Delhi,16787941,1484,11313,India
Lagos,16060303,1171,13712,Nigeria
Istanbul,14160467,5461,2593,Turkey
Tokyo,13513734,2191,6168,Japan
Sao Paulo,12038175,1521,7914,Brazil
Mexico City,8874724,1486,5974,Mexico
London,8673713,1572,5431,United Kingdom
New York City,8537673,784,10892,United States
Bangkok,8280925,1569,5279,Thailand`;

const table = parseData(data);
processTable(table);
printTable(table);

function parseData(data) {
    const table = [];
    if (data) {
        data.split('\n')
            .slice(0, -1)
            .forEach((row, index) => {
                if (index > 0) {
                    table.push(parseRow(row));
                }
            });
    }
    return table;
}

function parseRow(row) {
    return row.split(',');
}

function processTable(table) {
    sortTable(table);
    addPercent(table);
}

function addPercent(table) {
    if (table.length === 0) {
        return null;
    } 
    const max = table[0][3];
    table.forEach((row) => {
        const percent = calcPercent(max, row[3]);
        row.push(percent.toString()); 
    })
}

function calcPercent(max, curVal) {
    return Math.round((curVal * 100) / max);
}

function sortTable(table) {
    table.sort((r1, r2) => r2[3] - r1[3]);
}

function printTable(table) {
    table.forEach(row => {
        let s = row[0].padEnd(18);
        s += row[1].padStart(10);
        s += row[2].padStart(8);
        s += row[3].padStart(8);
        s += row[4].padStart(18);
        s += row[5].padStart(6);
        console.log(s);  
    });
}