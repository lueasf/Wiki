/* API ENDPOINT :   https://en.wikipedia.org/w/api.php?
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
    const response = await fetch(`https://en.wikipedia.org/w/api.php?
        action=query&list=search&format=json&origin=*
        &srlimit=20&srsearch=${searchInput}`)
    
    const data = await response.json(); //pour traiter le json
}