"use strict";

let masinos = [];
let simtukas = 100;
let finish = false;
let timeOut = 0;

class Masina {
    constructor(pavadinimas) {
        this.pavadinimas = pavadinimas;
        this.greitis = 0;
        this.kelias = 0;
        this.spidometras = 100;
    }

    gazas(kiek) {
        this.greitis += kiek;
    }

    stabdis(kiek) {
        this.greitis -= kiek;
        if (this.greitis < 0) {
            this.greitis = 0;
        }
    }

    vaziuojam() {
        this.kelias += this.greitis;
        if (this.kelias >= this.spidometras && !finish) {
            timeOut += 100;
            let HTML = `<div style="width: ${this.kelias}px;"></div>`;
            setTimeout(() => {
                document.getElementById(`${this.pavadinimas}`).innerHTML = HTML;
            }, timeOut);
            this.spidometras += 100;
        }
    }

    simtas() {

        if (this.kelias >= simtukas && !finish) {

            let HTML = `Nuvaziuota: ${simtukas}km! Pirmauja: ${this.pavadinimas}<br>`;
            let HTML2 = `<div style="width: ${this.kelias}px;"></div>`;

            setTimeout(() => {
                document.getElementById('output').insertAdjacentHTML('beforeend', HTML);
                document.getElementById(`${this.pavadinimas}`).innerHTML = HTML2;
            }, timeOut);

            console.log('Nuvaziuota: ' + simtukas + 'km! Pirmauja: ' + this.pavadinimas);
            simtukas += 100;
            this.spidometras += 100;
            
        } 
    }

    arLaimejau() {
        if (this.kelias >= 1000 && !finish) {
            timeOut += 500;
            let HTML = `NUGALĖTOJAS: ${this.pavadinimas}'!!! Nuvažiuota: ${this.kelias}km!<br>`;
            let HTML2 = `<div style="width: ${this.kelias}px;"></div>`;

            setTimeout(() => {
                document.getElementById('output').insertAdjacentHTML('beforeend', HTML);
                document.getElementById(`${this.pavadinimas}`).innerHTML = HTML2;

            }, timeOut);

            console.log(`NUGALĖTOJAS: ${this.pavadinimas}'!!! Viso nuvažiuota: ${this.kelias}.`);
            finish = true;
            setTimeout(() => {
                console.log('VISA LENTELE:');
                let HTML = '<h3>Turnyrinė lentelė</h3>';
                let i = 1;
                for (let m of masinos) {
                    HTML += `${i}. ${m.pavadinimas} - ${m.kelias}km.<br>`;
                    console.log(`${m.pavadinimas} - ${m.kelias}km`);
                    i++;
                }
                document.getElementById('results').insertAdjacentHTML('beforeend', HTML);
            }, 6000);
            return true;
        }
    }
}

class SportineMasina extends Masina {
    constructor(pavadinimas) {
        super(pavadinimas);
        this.spoilerisUp = true;
    }

    gazas(kiek) {
        this.spoilerisUp ? this.greitis += kiek : this.greitis += (2 * kiek);
    }

    stabdis(kiek) {
        this.spoilerisUp ? this.greitis -= (kiek/2) : this.greitis -= kiek;
    }
}

// lets get to start line!!!
for (let i=1; i<=8; i++) {
    i < 7 ? masinos.push(new Masina(`car-${i}`)) : masinos.push(new SportineMasina(`sport-${i}${i}${i}`));
}

// lets go!!!
function lentynes() {
    while (!finish) {
        for(const m of masinos) {
            if (m instanceof SportineMasina) {
                if (Math.random() <= 0.5) {
                    m.spoilerisUp = !m.spoilerisUp;
                }
            }
            let randNumber = Math.floor(Math.random() * 11 + 1);
            if (randNumber >= 6) {
                m.gazas(randNumber - 6);
                m.vaziuojam();
                m.simtas();
                if (m.arLaimejau()) break;
            } else {
                m.stabdis(randNumber - 6);
                m.vaziuojam();
                m.simtas();
                if (m.arLaimejau()) break;
            }
        }
    }

    masinos.sort((a, b) => {
        return b.kelias - a.kelias;
    });
}

document.getElementById('vaziuojam').addEventListener('click', () => {
    lentynes();
});

document.getElementById('reset').addEventListener('click', () => {
    masinos = [];
    simtukas = 100;
    finish = false;
    timeOut = 0;
    for (let i=1; i<=8; i++) {
        i < 7 ? masinos.push(new Masina(`car-${i}`)) : masinos.push(new SportineMasina(`sport-${i}${i}${i}`));
    }
    for(let m of masinos) {
        document.getElementById(`${m.pavadinimas}`).innerHTML = `<div style="width: 0;"></div>`;
    }
    document.getElementById('output').innerHTML = '';
    document.getElementById('results').innerHTML = '';
});

