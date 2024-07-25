/* API ENDPOINT :   https://fr.wikipedia.org/w/api.php?
action=query&list=search&format=json&origin=*&s
rlimit=20&srsearch=${searchInput}    */

const form = document.querySelector("form");
const input = document.querySelector("input");
const resultsDisplay = document.querySelector(".results-display");
const errorMsg = document.querySelector(".error-msg");
const loader = document.querySelector(".loader"); 
loader.style.display = "none"; // pour cacher le loader au début

form.addEventListener("submit", handleSubmit);

// FUNC 1 CALLBACK
function handleSubmit(e){
    e.preventDefault();

    if(input.value === ""){
        errorMsg.textContent = "Rentrez un mot";
        return;
    }else{
        errorMsg.textContent = "";
        loader.style.display = "flex";
        resultsDisplay.textContent = ""; // pour remettre le contenu de la page à 0 quand on fait une recherche.
        wikiApiCall(input.value);
    }
}

// async pour attendre le résultat avant d'exec le reste.
// fetch=aller chercher
// await=attendre le res

// FUNC 2 RES
async function wikiApiCall(searchInput){
    try {
    const response = await fetch(`https://fr.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`)
    
    if(!response.ok){
        throw new Error(`${response.status}`); // ok et status sont des attributs de la rep json.
        return; // ceci ne sera pas executé.
    }
    
    const data = await response.json(); //pour traiter le json

    createCards(data.query.search)
    }
    // gestion d'errur
    catch(error) { // catch erreur si besoin
        errorMsg.textContent = `${error}`;// on affiche l'erreur attrapé
        loader.style.display = "none";
    }
}


// FUNC 3 AFFICHAGE
function createCards(data){
    if(!data.length){
        errorMsg.textContent = "Aucun résultat";
        loader.style.display = "none";
        return;
    }
    data.forEach(el => {
        const url = `https://fr.wikipedia.org/?curid=${el.pageid}`;
        const card = document.createElement("div");
        card.className = "result-item";
        card.innerHTML = `
        <h3 class="result-title">
            <a href="${url}" target="_blank">${el.title}</a> 
        </h3>
        <a href="${url}" class="result-link" target="_blank">${url}</a>
        <span class="result-snippet">${el.snippet}</span>
        <br>
        `// target=_blank pour ouvrir dans une autre page et br pour sauter une ligne.

        resultsDisplay.appendChild(card); // On rajoute ma carte au res au résultat
    });
    loader.style.display = "none";
}