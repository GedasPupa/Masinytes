[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com)

# Javascript Classes
_Educational project_

[published at GitHub Pages](https://gedaspupa.github.io/masinytes/)

### Task

__klase Masina:__
- pavadinimas
- greitis
- kelias
- gazas(kiek)
- stabdis(kiek)
- vaziuojam()
 
__klase SportineMasina paveldeta nuo Masina__
- spoileris true (pakeltas) / false (nuleistas)
- pakeiskSpoilerioPozicija()
- gazas(kiek) - overridden: jei spoileris pakeltas gazuoja tiek pat, jei nuleistas gazuoja 2x
- stabdis(kiek) - overridden: jei spoileris pakeltas stabdo 2x, jei nuleistas gazuoja tiek pat
 
__lenktynes:__
- yra 8 masinos , 2 is ju sportine 
- kiekvienos iteracijos metu:
  - kiekviena masina pakeicia savo greiti (-5..+5) (random)
  - jei tai sportine - su tikimybe 50% pakeicia spoilerio pozicija
  - kiekviena masina pavaziuoja (per tiek, koks yra jos greitis) 
- lenktynes baigiasi, kai bent viena masina nuvaziuoja __1000 km__

 __ekstra: komentatorius - kas 100 km spausdinti lyderi__

- pabaigoj suruosiuoti turnyrine lentele pagal nuvaziuota kelia (mazejimo tvarka)
- atspausdinti turnyrine lentele
 
  - instanceof
  - kaip iskviesti super metoda

### Design

_f r e e / minimalistic / d e s c t o p_
