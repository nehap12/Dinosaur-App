 // Create Dino Constructor
    function Dino(dinoInfo, image) {
        this.species = dinoInfo.species;
        this.weight = dinoInfo.weight;
        this.height = dinoInfo.height;
        this.diet = dinoInfo.diet;
        this.location = dinoInfo.where;
        this.time = dinoInfo.when;
        this.facts = [dinoInfo.fact];
        this.image = image;
    }


    // Create Dino Objects
    let dino1 = {};
    let dino2 = {};
    let dino3 = {};
    let dino4 = {};
    let dino5 = {};
    let dino6 = {};
    let dino7 = {};
    let dino8 = {};


    function dinoObjects (dinoData) {
       let dinos = dinoData.Dinos;
       let dinoArray = [];
    
       dino1 = new Dino(dinos[0], "./images/triceratops.png");
       dino2 = new Dino(dinos[1], "./images/tyrannosaurus_rex.png");
       dino3 = new Dino(dinos[2], "./images/anklyosaurus.png");
       dino4 = new Dino(dinos[3], "./images/brachiosaurus.png");
       dino5 = new Dino(dinos[4], "./images/stegosaurus.png");
       dino6 = new Dino(dinos[5], "./images/elasmosaurus.png");
       dino7 = new Dino(dinos[6], "./images/pteranodon.png");
       dino8 = new Dino(dinos[7], "./images/pigeon.png");
       
      dinoArray.push(dino1, dino2, dino3, dino4, dino5, dino6, dino7, dino8);

      return dinoArray;
    }

    // Create Human Object

    let human = {};
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
            return human = new Human(humanData, "./images/human.png");
        })(humanData);
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
        dinoDiet = dino.diet.toLowerCase();
        humanDiet = human.diet.toLowerCase();

        if(humanDiet === dinoDiet) {
            return `${dino.species} shares same diet of ${humanDiet} as ${human.name}`;
        } else {
            return `The diet of ${dino.species} is ${dinoDiet} and the diet of ${human.name} is ${humanDiet}`;
        }
    }

    function createFacts(dinoArray, humanObj) {
        dinoArray.map(dino => {
            if(dino.species !== "Pigeon") {
                let dietFact = dino.compareDiet(dino, humanObj);
                let heightFact = dino.compareHeight(dino, humanObj);
                let weightFact = dino.compareWeight(dino, humanObj);
                let location = `Location:  ${dino.location}`;
                let time = `Lived during:  ${dino.time}`;
                let weight = `Weight:  ${dino.weight} lbs`;
                let height = `Height:  ${dino.height} inches`;
                let diet = `Diet:  ${dino.diet}`
                dino.facts.push(dietFact, heightFact, weightFact, location, time, weight, height, diet);
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

            if(obj.facts) {
                let factParagraph = document.createElement("p");
                factParagraph.className = "p";
                let randomIndex = '';
                if(obj.facts.length > 1) {
                    randomIndex = Math.floor(Math.random() * Math.floor(obj.facts.length));
                } else {
                    randomIndex = 0;
                }
                factParagraph.innerHTML = obj.facts[randomIndex];
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
    let dinos = fetch('./dino.json') // Call the fetch function passing the url of the API as a parameter
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

