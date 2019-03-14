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
    this.tapped = false;
    this.manaCost = manaCost;  
    this.CMC = CMC;  
    this.tap = function(){
        if(!this.tapped){
            this.tapped = true;
        }
    };
    this.untap = function(){
        if(this.tapped){
            this.tapped = false;
        }
    };
}

// for creature Class
function Creature(cardText, colors, flavorText, img, manaCost, name, set, creatureType ){
    Card.apply(this, arguments);
    this.cardType = 'creature';
    this.creatureType = creatureType;
    this.isPermanent = true;
    this.attack = function(){
        this.tapped = true;
        console.log(name + ' attacks!');//for testing purposes
// fill in combat code in later version
    };
    this.block = function(){
// fill in combat code in later version
    };
}

// for land Class
function Land(img, name, colors, cardText, flavorText, set, manaCost, CMC){
    Card.apply(this, arguments);

    this.cardType = 'land';
    this.isPermanent = true;

    this.mana = function(){
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
    library.shift();
    hand.unshift(topCard);
}

function discard(card){
    hand.shift(card);
    graveyard.unshift(card);
}

function shuffle(){
    
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
        field[i].tapped = true;
    }
}

function endturn(){
    emptyManaPool();
    untapPermanents();
    }
