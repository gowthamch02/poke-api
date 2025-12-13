const container = document.querySelectorAll('.hm');
const next = document.getElementById('next');
const back = document.getElementById('back');
const home = document.getElementById('home');
const nameInApi = document.getElementById("nameInApi");
const id = document.getElementById("id");
const type = document.getElementById("type");
let pkmnNames = [];
const suggestions = document.getElementById("suggestions");
const input = document.getElementById("pkmnName");

let j = 1;
let range = 54;
async function homescreen() {
    
    container.forEach(img => img.src = "");

    try{
        for(let i = j; i <= range; i++){
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
            const ImgIndex = i - j;

            if (!response.ok) {
                throw new Error(`Couldn't Fetch`);
            }
            
            const data = await response.json();
            const sprite = data.sprites.front_default;

            container[ImgIndex].src = sprite;
        }
    }
    catch(error){
        console.error(error);
    }
}
homescreen();


async function pkmnFetch() {
    container.forEach(img => img.src = "");
    next.textContent = "";
    back.textContent = "";
    const image = document.getElementById("image");
    const errorMsg = document.getElementById("error");

    try{
        const pkmnName = document.getElementById("pkmnName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnName}`);

        if (!response.ok) {
            throw new Error(`Couldn't Fetch`);
        }

        const data = await response.json();
        const sprite = data.sprites.front_default;
        
        image.src = sprite;

        errorMsg.textContent = "";
        errorMsg.style.display = "none";

        nameInApi.textContent = `Name: ${pkmnName}`;
        id.textContent = `ID: ${data.id}`;

        suggestions.innerHTML = "";
    }
    catch(error){
        image.src = "";
        errorMsg.textContent = "Enter a valid Pokemon name";
        errorMsg.style.display = "block";
    }
}
async function pkmnShinyFetch() {
    container.forEach(img => img.src = "");
    next.textContent = "";
    back.textContent = "";
    const image = document.getElementById("image");
    const errorMsg = document.getElementById("error");

    try{
        const pkmnName = document.getElementById("pkmnName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnName}`);

        if (!response.ok) {
            throw new Error(`Couldn't Fetch`);
        }

        const data = await response.json();
        const sprite = data.sprites.front_shiny;
        
        console.log(data);
        image.src = sprite;

        errorMsg.textContent = "";
        errorMsg.style.display = "none";

        nameInApi.textContent = `Name: ${pkmnName}`;
        id.textContent = `ID: ${data.id}`;

        suggestions.innerHTML = "";
    }
    catch(error){
        image.src = "";
        errorMsg.textContent = "Enter a valid Pokemon name";
        errorMsg.style.display = "block";
    }
}

home.addEventListener("click", () => {
    const errorMsg = document.getElementById("error");
    errorMsg.style.display = "none";
    errorMsg.textContent = "";
    const image = document.getElementById("image");
    next.textContent = ">";
    back.textContent = "<";
    nameInApi.textContent = ``;
    id.textContent = ``;
    image.src = "";
    suggestions.innerHTML = "";
    document.getElementById("pkmnName").value = '';
    j = 1;
    range = 54;
    homescreen();
})

next.addEventListener("click", () => {
    range += 54;
    j += 54;
    homescreen();
})

back.addEventListener("click", () => {
    range -= 54;
    j-= 54;
    homescreen();
})

fetch("https://pokeapi.co/api/v2/pokemon?limit=1025")
    .then(res => res.json())
    .then(data => {
        pkmnNames = data.results.map(p => p.name);
    });

input.addEventListener("input", () => {

    const image = document.getElementById("image");

    nameInApi.textContent = "";
    id.textContent = "";
    image.src = "";

    const value = input.value.toLowerCase();
    suggestions.innerHTML = "";

    if (value.length === 0) return;

    const filtered = pkmnNames.filter(name => name.startsWith(value));

    filtered.forEach(name => {
        
        const li = document.createElement("li");

        const prefix = name.slice(0, value.length);
        const suffix = name.slice(value.length);

        li.innerHTML = `<span class="highlight">${prefix}</span>${suffix}`;

        li.addEventListener("click", () => {
            input.value = name;
            suggestions.innerHTML = "";
        });

        suggestions.appendChild(li);
    })
})