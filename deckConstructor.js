//MTG CCG simulator for library construction and library testing

// UNIVERSAL VARIABLES

let format = {
    'Commander': false,
    'Legacy': false,
    'Modern': false,
    'Standard': false,
    'Tiny Leader': false
};

let library = [];
let hand = [];
let field = [];
let graveyard = [];
let exiled = [];

let topCard = library[0];
let bottomCard = library.slice(-1);

let manaPool = {
        red: 0,
        green: 0,
        blue: 0,
        black: 0,
        white: 0,
        colorless: 0
    };

// fix format selector code

// function enterFormat(format){
// format.format = true;
// };

// function commander(){
// Player.prototype.CommanderDamage = 0;
// Player.prototype.lifeTotal = 40;
// format.Commander = true;
// }


// add/refactor Player variables when functionality includes multiple players
// Player variables:
// function Player(name)
// {
//     this.name = name;
//     this.lifeTotal = 20;
//     this.PoisonCounterTotal = 0;
//     this.manaPool = {
//     red: 0,
//     green: 0,
//     blue: 0,
//     black: 0,
//     white: 0,
//     colorless: 0
// };
//     this.field = [];
//     this.currentPlayer = false;
// };



// Constructor Functions:

//  for card Class
function Card(img, name, colors, cardType, cardText, flavorText, set, manaCost, CMC){
    this.img = img;
    this.name = name;
    this.colors = colors;
    this.cardType = cardType;
    this.cardText = cardText;
    this.flavorText = flavorText;
    this.set = set;
    this.manaCost = manaCost;  
    this.CMC = CMC; 

    this.isPermanent = true;
    if (this.isPermanent == true){
        this.isTapped = false;
    }
 
    this.tap = function(){
        if(!this.isTapped){
            this.isTapped = true;
        }
    };
    this.untap = function(){
        if(this.isTapped){
            this.isTapped = false;
        }
    };
}

// for creature Class
function Creature(cardText, colors, flavorText, img, manaCost, name, set, creatureType ){
    Card.apply(this, arguments);
    this.cardType = 'creature';
    this.creatureType = creatureType;
    this.attack = function(){
        this.isTapped = true;
        console.log(name + ' attacks!');//for testing purposes
// fill in combat code in later version
    };
    this.block = function(){
// fill in combat code in later version
    };
}

// for Artifact Class
function Artifact(img, name, cardText, flavorText, set, manaCost, CMC){
    Card.apply(this, arguments);

    this.cardType = 'artifact';
    this.colors = colorless;

}

// refine the following:

// for Sorcery Class
function Sorcery(img, name, colors, cardText, flavorText, set, manaCost, CMC){
    Card.apply(this, arguments);

    this.cardType = 'sorcery';
    this.isPermanent = false;
};
// for Instant Class
function Instant(img, name, colors, cardText, flavorText, set, manaCost, CMC){
    Card.apply(this, arguments);

    this.cardType = 'instant';
    this.isPermanent = false;
};
// for Enchantment Class
function Enchantment(img, name, colors, cardText, flavorText, set, manaCost, CMC){
    Card.apply(this, arguments);

    this.cardType = 'enchantment';
};
// for Planeswalker Class
function Planeswalker(img, name, colors, cardText, flavorText, set, manaCost, CMC){
    Card.apply(this, arguments);

    this.cardType = 'planeswalker';
};



// for land Class
function Land(img, name, colors, cardText, flavorText, set, manaCost, CMC){
    Card.apply(this, arguments);

    this.cardType = 'land';

    this.produceMana = function(){
        this.tap();
        console.log('Player taps a ' + name);

        if(this.name == 'mountain'){
            manaPool.red += 1;
        };
        if(this.name == 'plains'){
            manaPool.white += 1;
        };
        if(this.name == 'forest'){
            manaPool.green += 1;
        };
        if(this.name == 'island'){
            manaPool.blue += 1;
        };
        if(this.name == 'swamp'){
            manaPool.black += 1;
        };
    };
};



const mountain = new Land(null, 'mountain', 'colorless', null, null, null, 0, 0);
const plains = new Land(null, 'plains', 'colorless', null, null, null, 0, 0);
const forest = new Land(null, 'forest', 'colorless', null, null, null, 0, 0);
const island = new Land(null, 'island', 'colorless', null, null, null, 0, 0);
const swamp = new Land(null, 'swamp', 'colorless', null, null, null, 0, 0);

// eventual player functions:
function draw(){
hand.push(library.pop());
}

function drawHand(){
    let HANDSIZE = hand.length;
    while(HANDSIZE < 7){
        draw();
        HANDSIZE = hand.length;
    };
}

function discard(card){
    graveyard.push(hand.pop(card));
}

function discardHand(){
    let HANDSIZE = hand.length;
    while (HANDSIZE != 0){
        console.log(hand[0]);
        discard(hand[0]);
        console.log(graveyard[0]);
    };
}

function shuffle(){
        temp = [];
        originalLength = library.length;
        for (var i = 0; i < originalLength; i++) {
          temp.push(library.splice(Math.floor(Math.random()*library.length),1));
        }
        library = temp;
}

// test function to fix shuffle bug:
function checkShuffle(){/* bug: fills library with 'undefined's*/
        temp = [];
        originalLength = library.length;
        for (var i = 0; i < originalLength; i++) {
          console.log(i);/*shows that Land is pushed 49 times, then empty arrays(undefined) */
          console.log(library.splice(Math.floor(Math.random()*library.length),1));
          temp.push(library.splice(Math.floor(Math.random()*library.length),1));
          console.log(originalLength);/*shows that originalLength stays at 99 */
        }
        library = temp;
}

function emptyManaPool(){
    manaPool.white = 0;
    manaPool.red = 0;
    manaPool.green = 0;
    manaPool.blue = 0;
    manaPool.black = 0;
    manaPool.colorless = 0;
}

function untapPermanents(){
    for(i = 0; i <= field.length; i++){
        field[i].isTapped = false;
    }
}

function endturn(){
    emptyManaPool();
    untapPermanents();
    }

function startGame(){
    emptyManaPool();
    shuffle();
    drawHand();
}

    
    
    
    
    
    
    // test code for filling a deck to test functions:

    library.push(swamp, swamp, swamp, swamp, swamp, swamp, swamp, swamp, swamp, swamp, swamp, swamp, swamp, swamp, swamp, swamp, swamp, swamp, swamp, swamp)

    library.push(mountain, mountain, mountain, mountain, mountain, mountain, mountain, mountain, mountain, mountain, mountain, mountain, mountain, mountain, mountain, mountain, mountain, mountain, mountain, mountain)

    library.push(island, island, island, island, island, island, island, island, island, island, island, island, island, island, island, island, island, island, island, island)

    library.push(plains, plains, plains, plains, plains, plains, plains, plains, plains, plains, plains, plains, plains, plains, plains, plains, plains, plains, plains, plains )

    library.push(forest, forest, forest, forest,forest, forest, forest, forest, forest,forest, forest, forest, forest, forest,forest, forest, forest, forest, forest)

    
