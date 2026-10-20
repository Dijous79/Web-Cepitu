# Web de l'Esplai Cepitu

Web de l'Esplai Cepitu (Centre d'Esplai Tum Tum) de Terrassa, feta de zero.
Els textos, fotos, logos i cançons provenen de l'antiga web
([SergiRomero/sergiromero.github.io](https://github.com/SergiRomero/sergiromero.github.io));
el codi és nou.

## Estructura

```
index.html        Inici + qui som
esplai.html       Esplai dels dissabtes, grups i sortides
colonies.html     Colònies d'estiu, grups i logos de cada any
families.html     Famílies, diades i trobades
cancons.html      Cançoner (lletres a assets/songs/*.txt)
contacte.html     Contacte
404.html          Pàgina d'error
assets/
  css/style.css   Tots els estils (colors a :root)
  js/main.js      Menú mòbil, enllaç actiu, animacions
  js/cancons.js   Llista de cançons i lector de lletres
  img/            Fotos optimitzades (hero/, grups/, colonies/, activitats/, ...)
  songs/          Lletres en text pla
```

És HTML, CSS i JS estàtic: no cal instal·lar res ni compilar.

## Veure-la en local

Cal un servidor (el cançoner carrega les lletres amb `fetch`):

```bash
python -m http.server 8000
```

i obre <http://localhost:8000>.

## Afegir una cançó

1. Crea `assets/songs/colonies-AAAA.txt`. Opcionalment, comença amb
   `::TITLE Títol` i `::RITME Cançó original`. Separa les estrofes amb una línia en blanc.
2. Afegeix-la a la llista `SONGS` de `assets/js/cancons.js`.

## Publicar

Publicada amb GitHub Pages (branca `main`, carpeta arrel) a
<https://dijous79.github.io/Web-Cepitu/>. Cada push a `main` la torna a desplegar.
