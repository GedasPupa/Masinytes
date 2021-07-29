"use strict";

const masinos = [];
let simtukas = 100;
let finish = false;
let timeOut = 500;

class Masina {
    constructor(pavadinimas) {
        this.pavadinimas = pavadinimas;
        this.greitis = 0;
        this.kelias = 0;
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
    }

    arLaimejau() {
        if (this.kelias >= 1000 && !finish) {
            let HTML = `NUGALĖTOJAS: ${this.pavadinimas}'!!! Nuvažiuota: 1000km(viso: ${this.kelias})<br>`;
            console.log(`NUGALĖTOJAS: ${this.pavadinimas}'!!! Nuvažiuota: 1000km(viso: ${this.kelias})`);
            setTimeout(() => {
                document.getElementById('output').insertAdjacentHTML('beforeend', HTML);
            }, timeOut);

            finish = true;
        }
    }

    simtas() {
        if (this.kelias >= simtukas && !finish) {
            timeOut += 500;
            console.log(timeOut);
            let HTML = `Nuvaziuota: ${simtukas}km! Pirmauja: ${this.pavadinimas}<br>`;
            let HTML2 = `<div style="width: ${this.kelias}px;"></div>`;

            setTimeout(() => {
                document.getElementById('output').insertAdjacentHTML('beforeend', HTML);
                document.getElementById('car-1').innerHTML = HTML2;
             }, timeOut);

            console.log('Nuvaziuota: ' + simtukas + 'km! Pirmauja: ' + this.pavadinimas);
            simtukas += 100;
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
function lentynes() {
    for (let i=1; i<=8; i++) {
        i < 7 ? masinos.push(new Masina(`auto-${i}`)) : masinos.push(new SportineMasina(`sport-${i}${i}${i}`));
    }

    while (!finish) {
        for(const m of masinos) {
            if (m instanceof SportineMasina) {
                if (Math.random() <= 0.5) {
                    m.spoilerisUp = !m.spoilerisUp;
                }
            }
            let randNumber = Math.floor(Math.random() * 11 + 1);
            if (randNumber >= 6) {
                console.log(m.kelias);
                m.gazas(randNumber - 6);
                m.vaziuojam();
                m.arLaimejau();
                m.simtas();
            } else {
                m.stabdis(randNumber - 6);
                m.vaziuojam();
                m.arLaimejau();
                m.simtas();
            }
        }
    }

    masinos.sort((a, b) => {
        return b.kelias - a.kelias;
    });
    console.log('VISA LENTELE:');
    for (let m of masinos) {
        console.log(`${m.pavadinimas} - ${m.kelias}km`);
    }
}

document.getElementById('vaziuojam').addEventListener('click', () => {
    lentynes();
});

