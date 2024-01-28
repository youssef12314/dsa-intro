
//når en kommentar indeholder "(x)" vil det sige jeg ikke 100% forstår det
"use strict";
//putter en eventlistener til vinduet,
//listed som DOMContentLoaded, dvs. 
//eventen bliver brugt fired så snart html dokumentet  loaded og parsed  
// når DOM eventet sker, bliver start funktionen kaldet. Som man kan se bliver funktionen kaldet efter eventet er blivet loadet.
window.addEventListener("DOMContentLoaded", start);
//funktionen start bliver lavet her
function start() {
  //her er en log. Dette er lavet for debugging grunde for at sørger for funktionen virker.
  console.log("JavaScript kører");
  //her bliver hideall funktionen kaldt. Formålet kan man se længere nede. 
  hideAll();
  //her bliver der kaldt denne funktion. Dette funktioner der bliver indkaldet bliver gjort ved start. Pga det er i start funktionen.
  askAboutName();
}
// her er der hide all funktionen. Denne funktions formåæ er at gemme html elementerne-
function hideAll() {
//Her man kan se der bliver brugt metoden document.queryselector
//den selector #ask-name ID hvilke er fra html.
//.classList.add er en propoerty objekt der repræsentere klassen af en html element.
//her bliver hide klassen added. For at hide elementet (ask-name)
  document.querySelector("#ask-name").classList.add("hide");
  //her bliver gjoft det samme og resten af koden
  document.querySelector("#ask-age").classList.add("hide");
  document.querySelector("#ask-birthyear").classList.add("hide");
  document.querySelector("#success").classList.add("hide");
  document.querySelector("#failure").classList.add("hide");
}

//her bliver lavet funktionen "fillinfields" hvilke har 2 parameter (fieldname og value)
//denne funktion bruger queryselectorall metoden til at select alle html elememter der har en data-field attribut med den samme fieldname
//.foreach metoden er brugt til at iterere for hver element, er element.texhcontent=value metoden brugt til at sætte text content af elementet til den value (x)
function fillInFields(fieldname, value) {
  document.querySelectorAll(`[data-field=${fieldname}]`).forEach(element => (element.textContent = value));
}


//her har vi så askAboutName funktionen hvilke har ansvar for at spørger personens navn
function askAboutName() {
  //her er der en queryselector som selector id'en fundet i html og assigner den "form" value
  const form = document.querySelector("#ask-name");
  //her bliver der givet en event listener til formen. når event listeneren er submitted. Trigger den answeredname funktionen
  form.addEventListener("submit", answeredName);
  //den her linje fjerner hide klasse fra formen. hvilken gør den synlig.
  form.classList.remove("hide");
}

//her har vi så funktionen der er ansvarlig for når man har submitted sit navn
function answeredName(event) {
  //dette forhindre den default form submission behavior som er typisk en reload
  event.preventDefault();

//her tager den en reference til form elementet der triggered eventet. event.target refere til elementet der fired eventet
  const form = event.target;
  //her fjerner den submit event listeneren fra formen.
  form.removeEventListener("submit", answeredName);
  //her disabler den så submit knappen
  form.querySelector("button").disabled = true;
//her henter den value af "firstname" input field af formen (x)
  const firstname = form.firstname.value;
  //her logger den navnet i konsolen
  console.log("Answered name: " + firstname);
//denne funktion call, opdatere ting på webpage. (x)
  fillInFields("firstname", firstname);
//her bliver der så kaldt på funktionen
  askAboutAge();
}
//her er funktionen der har ansvar for at spørger om navn
function askAboutAge() {
//her laver den en form som selector html elementent ask-age
  const form = document.querySelector("#ask-age");
  //her bliver der givet en eventlistener til submit, når submittet triggere den answeredage funktion
  form.addEventListener("submit", answeredAge);
  //til sidst fjerner den så hide 
  form.classList.remove("hide");
}

//her har vi funktionen der er ansvarlig for hvad der sker når man har submitted
function answeredAge(event) {
//her igen preventer den default, altså så den ikke reloader siden.
  event.preventDefault();
//her refere den så til en form element der trigger eventet. event.target refere til elementet der fired eventet
  const form = event.target;
  //her fjerner den event listener fra formen
  form.removeEventListener("submit", answeredAge);
  //disabler knappen
  form.querySelector("button").disabled = true;
//den her linje henter valuen af age i input field af formen
//valueasnumber betyder at den forventer en numerical value altså et nummer. alderen af stored i form.age
  const age = form.age.valueAsNumber;
//her logger den alderen som var svaret
  console.log("Answered age: " + age);
//her kalder den fillinfields funktionen. det samme som den gjorde med first name. her opdatere den indeholder i webpagen. Fylder en field identificered af navnet "age" med value skrevet af user (x)
  fillInFields("age", age);
//her kalder den askabout birthyear funktionen med en age parameter
  askAboutBirthYear(age);
}
//her har vi funktionen der er ansvarlig for at spørg om alder
function askAboutBirthYear(age) {
  // calculate birthyear - expect that the person HASN'T had their birthday yet this year
  const birthyear = 2024 - 1 - age;
//her kalder den fillinfields funktionen til at opdatere indholdet af webpage (x)
  fillInFields("birthyear", birthyear);
//her selector den html elementet "ask-birthyear" og assinger den som en form
  const form = document.querySelector("#ask-birthyear");
  //her giver den en eventlistener til submit eventet og så snart gjort, bliver answeredbirthyear tilkaldet
  form.addEventListener("submit", answeredBirthyear);
  //bliver den synlig
  form.classList.remove("hide");
}
//her er funktionen der er ansvarlig for hvad der sker når man har skrevet fødselsdag ind
function answeredBirthyear(event) {
  //preventer reload
  event.preventDefault();
//refere form elementet der triggered eventet. event.taget refere til elementet der fired eventet (formen) 
  const form = event.target;
  //fjerner eventlistenener fra formen.
  form.removeEventListener("submit", answeredBirthyear);
  //disabler knappen
  form.querySelector("button").disabled = true;
//her henter den value skrevet i input field med"
  const correct = form.correct.value;
  //logger correct til konsolen
  console.log("Answered correct: " + correct);
  
//her har vi en if statement. Hvis alderen er gættet rigtig trigger den succes funktionen ellers så er det failure funktionen
  if (correct === "yes") {
    showSuccess();
  } else {
    showFailure();
  }
}
function showSuccess() {
  document.querySelector("#success").classList.remove("hide");
}

function showFailure() {
  document.querySelector("#failure").classList.remove("hide");
}
