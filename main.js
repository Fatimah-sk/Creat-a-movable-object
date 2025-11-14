/*Javascript Advanced Oppgave 1: Create a movable object

Opprette et Flyttbart Element
Hei, JavaScript-entusiaster!

I denne oppgaven skal vi utforske den praktiske siden av JavaScript ved å lage et flyttbart HTML-element. Oppgaven er å gjøre det mulig for elementet å bevege seg fritt rundt nettleservinduet. Spesifikasjonene er  som følger:

 

Funksjonalitet:
Navigering med piltaster: Implementer muligheten til å flytte elementet i fire retninger – opp, ned, venstre og høyre – ved hjelp av piltastene.
Klikk for å posisjonere: Tillat brukeren å flytte elementet direkte ved å klikke hvor som helst på siden.
Forbli synlig: Sørg for at elementet holder seg innenfor den synlige skjermflaten.
Implementeringstips:
Bruk addEventListener() for å fange opp hendelser fra piltaster og museklikk.
Bruk position: absolute for å gi elementet full bevegelsesfrihet.
 

Valgfrie utfordringer:
Du kan forbedre implementeringen med følgende tillegg:

Implementer kollisjonsdeteksjon eller legg til hindringer for ekstra kompleksitet.
Styling:
Selv om hovedfokuset er på funksjonalitet, kan du style elementet etter eget ønske. Denne oppgaven gjør seg godt i en portfolio så ta deg litt tid og gjør siden presentabel.

Kort oppsumert: 
Sett opp event listeners som fanger opp piltaster og museklikk.
Implementer logikk for å oppdatere elementets posisjon basert på registrerte events.
Legg eventuelt til ekstra funksjoner eller begrensninger for å gjøre oppgaven mer utfordrende.
Husk, målet med denne øvelsen er å styrke din forståelse av event listeners  og manipulering av HTML-elementer ved hjelp av JavaScript.

Husk at ryddig og velorganisert kode gjør det lettere å holde oversikt over alle komponentene! Hvis du trenger å bruke en løkke, bruk anledningen til å øve på de avanserte array-metodene vi har gått gjennom.

Husk også å aktivere GitHub Pages for innleveringen din.

Lykke til med kodeeventyret ditt! 🎉*/

const rocket = document.getElementById("rocket");

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

// تحريك الصاروخ بالأسهم
document.addEventListener("keydown", function(e) {
  const step = 20; // مقدار الحركة

  switch (e.key) {
    case "ArrowUp":
      y -= step;
      break;

    case "ArrowDown":
      y += step;
      break;

    case "ArrowLeft":
      x -= step;
      break;

    case "ArrowRight":
      x += step;
      break;
  }

  rocket.style.left = x + "px";
  rocket.style.top = y + "px";
});

// تحريك الصاروخ بالنقر بالماوس
document.addEventListener("click", function(e) {
  x = e.clientX;
  y = e.clientY;

  rocket.style.left = x + "px";
  rocket.style.top = y + "px";
});
