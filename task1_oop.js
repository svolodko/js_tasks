/**
 * Task 1 OOP
 */

class DataParser {
    constructor(data) {
        this._table = [];
        this._data = data;
        this._parseData();
    }

    _parseData() {
        if (this._data) {
            this._data.split('\n')
                .forEach((row, index) => {
                    if (index > 0) {
                        this._table.push(row.split(','));
                    }
                });
        }
    }

    get table() {
        return this._table;
    }

}

class CityData {
    constructor(data) {
        this._data = data;
        this._table = new DataParser(this._data).table;
        this._processTable();
    }

    printData() {
        this._table.forEach(row => {
            let s = row[0].padEnd(18);
            s += row[1].padStart(10);
            s += row[2].padStart(8);
            s += row[3].padStart(8);
            s += row[4].padStart(18);
            s += row[5].padStart(6);
            console.log(s);  
        });
    }

    _processTable() {
        this._removeLastLine();
        this._sortTable();
        this._addPercent();
    }

    _removeLastLine() {
        this._table = this._table.slice(0, -1);
    }

    _sortTable() {
        this._table.sort((r1, r2) => r2[3] - r1[3]);
    }

    _addPercent() {
        if (this._table.length === 0) {
            return null;
        } 
        const max = this._table[0][3];
        this._table.forEach((row) => {
            const percent = this._calcPercent(max, row[3]);
            row.push(percent.toString()); 
        })
    }
    
    _calcPercent(max, curVal) {
        return Math.round((curVal * 100) / max);
    }


}

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

const table = new CityData(data);
table.printData();
