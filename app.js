/* API ENDPOINT :   https://fr.wikipedia.org/w/api.php?
action=query&list=search&format=json&origin=*&s
rlimit=20&srsearch=${searchInput}    */

const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e){
    e.preventDefault();

    if(input.value === ""){
        errorMsg.textContent = "Rentrez un mot";
        return;
    }else{
        errorMsg.textContent = "";
        wikiApiCall(input.value)
    }
}

// async pour attendre le résultat avant d'exec le reste.
// fetch=aller chercher
// await=attendre le res
async function wikiApiCall(searchInput){
    const response = await fetch(`https://fr.wikipedia.org/w/api.php?
        action=query&list=search&format=json&origin=*
        &srlimit=20&srsearch=${searchInput}`)
    
    const data = await response.json(); //pour traiter le json
    createCards(data.query.search)
}

function createCards(data){
    if(!data.length){
        errorMsg.textContent = "Aucun résultat";
        return;
    }
    data.forEach(el => {
        const url = `https://fr.wikipedia.org/curid=${el.pageid}`;
        const card = document.createElement("div");
        card.className = "result-item";
        card.innerHTML = `
        <h3 class="result-title">
            <a href="" target="_blank">${el.title}</a> 
        </h3>
        <a href="" class="result-link" target="_blank"></a>
        <span class="result-snippet">${el.snippet}</span>
        <br>
        `// target=_blank pour ouvrir dans une autre page.

    })
}