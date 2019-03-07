// Miniature MTG CCG simulator for deck construction and deck testing



// Player variables:
let manaPool = {
    red: 0,
    green: 0,
    blue: 0,
    black: 0,
    white: 0,
    colorless: 0
};

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

    this.untap = function(){
        this.tapped = false;
    }
}

// for creature Class
function Creature(cardText, colors, flavorText, img, manaCost, name, set, creatureType ){
    Card.apply(this, arguments);
    this.cardType = 'creature';
    this.creatureType = creatureType;
    this.attack = function(){
        this.tapped = true;
        console.log(name + ' attacks!');
    };
    this.block = function(){

    };
}

// for land Class
function Land(img, name, colors, cardType, cardText, flavorText, set, manaCost, CMC){
    Card.apply(this, arguments);
    this.mana = function(){
        if(this.name == 'mountain'){
            manaPool.red += 1;
        };
    }
    this.tap = function(){
        this.tapped = true;
        console.log('Player taps a' + name);
        this.mana(); 
    }
}







// demo code for testing functionality below this line:
var mountain = new Land(null, 'mountain', null, 'land', null, null, null, 0, 0);
var demo2 = new Creature('a','b','c','d','d','demo 2','f')




