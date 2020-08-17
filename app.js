 // Create Dino Constructor
function Dino(dinoInfo, image) {
    this.species = dinoInfo.species;
    this.weight = dinoInfo.weight;
    this.height = dinoInfo.height;
    this.diet = dinoInfo.diet;
    this.location = dinoInfo.where;
    this.time = dinoInfo.when;
    this.fact = dinoInfo.fact;
    this.image = image;
}

// Create Dino Objects
function dinoObjects (dinoData) {
    let dinos = dinoData.Dinos;

    return dinos.map(dino => {
        let species = dino.species.replace(" ", "_").toLowerCase();
        return new Dino(dino, `/images/${species}.png`)
    });
}

// Create Human Object
function Human (humanData, image) {
    this.name = humanData.name.value;
    this.feet = humanData.feet.value;
    this.inches = humanData.inches.value;
    this.weight = humanData.weight.value;
    this.diet = humanData.diet.value;
    this.image = image;
}

// Use IIFE to get human data from form
const humanData = function() {
    return (function getHumanData() {
        let humanData = document.getElementById('dino-compare');
        return new Human(humanData, "./images/human.png");
    })();
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
Dino.prototype.compareWeight = function (dino, human) {
    let dinoWeight = dino.weight;
    let humanWeight = parseInt(human.weight);

    let difference = '';

    if(dinoWeight > humanWeight) {
        difference = dinoWeight - humanWeight;
        return `The weight of ${dino.species} is ${difference} lbs more than ${human.name}'s weight`;
    } else {
        difference = humanWeight - dinoWeight;
        return `The weight of ${human.name} is ${difference} lbs more than ${dino.species}'s weight`;
    }

}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function (dino, human) {
    let dinoHeight = dino.height;
    let humanHeight = (parseInt(human.feet) * 12) + parseInt(human.inches);

    let difference = '';

    if(dinoHeight > humanHeight) {
        difference = dinoHeight - humanHeight;
        return `The height of ${dino.species} is ${difference} inches more than ${human.name}'s height`;
    } else {
        difference = humanHeight - dinoHeight;
        return `The height of ${human.name} is ${difference} inches more than ${dino.species}'s height`;
    }
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

Dino.prototype.compareDiet = function (dino, human) {
    let dinoDiet = dino.diet.toLowerCase();
    let humanDiet = human.diet.toLowerCase();

    if(humanDiet === dinoDiet) {
        return `${dino.species} shares same diet of ${humanDiet} as ${human.name}`;
    } else {
        return `The diet of ${dino.species} is ${dinoDiet} and the diet of ${human.name} is ${humanDiet}`;
    }
}

function createFacts(dinoArray, humanObj) {
    dinoArray.map(dino => {
        if(dino.species !== "Pigeon") {
            let randomIndex = Math.floor(Math.random() * Math.floor(10));
            let fact = '';

            if(randomIndex === 1) {
                fact = dino.compareDiet(dino, humanObj);
            } else if (randomIndex === 2) {
                fact = dino.compareHeight(dino, humanObj);
            } else if (randomIndex === 3) {
                fact = dino.compareWeight(dino, humanObj);
            } else if (randomIndex === 4) {
                fact = `Location:  ${dino.location}`;
            } else if (randomIndex === 5) {
                fact = `Lived during:  ${dino.time}`;
            } else if (randomIndex === 6) {
                fact = `Weight:  ${dino.weight} lbs`;
            } else if (randomIndex === 7) {
                fact = `Height:  ${dino.height} inches`;
            } else if (randomIndex === 8) {
                fact = `Diet:  ${dino.diet}`
            } else if (randomIndex === 9) {
                fact = dino.fact;
            }

            dino.fact = fact;
        }
    });
}

// Generate Tiles for each Dino in Array

    // Add tiles to DOM

function generateGrid(dinoHumanArray) {
    let grid = document.getElementById("grid");

    dinoHumanArray.forEach(obj => {
        let tile = document.createElement("div");
        tile.className = "grid-item";

        let image = document.createElement("img");
        image.className = "img";
        image.src = obj.image;

        let title = document.createElement("h3");
        title.className = "h3";
        if(obj.species) {
            title.innerHTML = obj.species;
        } else {
            title.innerHTML = obj.name;
        }

        tile.appendChild(image);
        tile.appendChild(title);

        if(obj.fact) {
            let factParagraph = document.createElement("p");
            factParagraph.className = "p";
            factParagraph.innerHTML = obj.fact;
            tile.appendChild(factParagraph);
        }
        
        grid.appendChild(tile);
    })

}

// Generate dino human array

function createDinoHumanArray(dinos, human) {
    return dinos.slice(0,4).concat([human]).concat(dinos.slice(4,8));
}

// Remove form from screen

// On button click, prepare and display infographic

window.onload = function () {
    var btn = document.getElementById("btn");
    if (btn.addEventListener) {
        btn.addEventListener("click", btnClick, false);
    } else if (btn.attachEvent) {
        btn.attachEvent("onclick", btnClick);
    }
};

function btnClick() {
    fetch('./dino.json') // Call the fetch function passing the url of the API as a parameter
    .then(response => response.json())
    .then(dinoData => {
        let dinos = dinoObjects(dinoData);

        let human = humanData();
        createFacts(dinos, human);

        let dinoHumanArray = createDinoHumanArray(dinos, human);

        let formInput = document.getElementById('dino-compare');
        formInput.innerHTML = '';

        generateGrid(dinoHumanArray);
    })
}

