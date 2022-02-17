
const szotombok = document.querySelectorAll(".szotomb");
const bill = document.getElementById("billentyuzet");

var szo = [];
var sor = 0;

var betuk = ["1","2","3","4","5","6","7","8","9","ö","ü","ó","ű","q","w","e","r","t","y","u","i","o","p","ő","ú","a","s","d","f","g","h","j","k","l","é","á","z","x","c","v","b","n","m","Enter","Vissza"];

var keresett = szavak[Math.floor(Math.random()*szavak.length)];

for(let i = 0 ;i < 5 ;i++) {
    szotombok[i].innerHTML = "<div class='szo'></div> <div class='szo'></div> <div class='szo'></div> <div class='szo'></div> "
}


function bennevan(szo) {
    let szoString = szo.join().replaceAll(",","");
    let bennevan = false;
    szavak.forEach(e=>{
        if(e == szoString) {
            bennevan = true;
        }
    })
    return bennevan;
}

function ujra() {
    sor = 0;
    szo = [];
    keresett = szavak[Math.floor(Math.random()*szavak.length)];
    
    for(let i = 0 ;i < 5 ;i++) {
        szotombok[i].innerHTML = "<div class='szo'></div> <div class='szo'></div> <div class='szo'></div> <div class='szo'></div> "
    }

    for(let i in bill.children) {
        bill.children[i].className = "betu";

        if(bill.children[i].textContent === "Enter") {
            bill.children[i].className = "enter-betu";
        }
    
        if(bill.children[i].textContent === "Vissza") {
            bill.children[i].className = "enter-betu";
        }
    }
            
}

document.addEventListener("keydown",(e)=>{

    let kulcs = e.key;

    if(kulcs != "Enter"  && kulcs != "Backspace") {
        kulcs = kulcs.toLowerCase();
    }

    if(/^[a-zA-zőúűóáéíüöŐÚŰÁÉÍÖÜ]$/.test(kulcs) && !["/","[","]"].includes(kulcs) || kulcs==="Enter") { 
    
        if(szo.length < 4 && kulcs != "Enter") {
            szo.push(kulcs);
        }else if(sor < 4 && kulcs=== "Enter" && szo.length === 4){
            for(let i=0;i<4;i++) {
                if(!(szotombok[sor].children[i].classList.contains("zold") || szotombok[sor].children[i].classList.contains("sarga"))) {
                    szotombok[sor].children[i].classList.add("szurke");
                }
            }
        }

    }else {
        if(kulcs == "Backspace" && szo.length > 0) {
            szo.pop();
            for(let i in  szotombok[sor].children) {
                if(typeof szo[i] === "string") {
                    szotombok[sor].children[i].textContent = szo[i].toUpperCase();
                }else {
                    szotombok[sor].children[i].textContent = null;
                }
            }
        }
    }

    for(let i in  szotombok[sor].children) {
        if(typeof szo[i] === "string") {
            szotombok[sor].children[i].textContent = szo[i].toUpperCase();
        }else {
            szotombok[sor].children[i].textContent = null;
        }
        
    }

    if(szo.length === 4 && bennevan(szo) === true && kulcs === "Enter") {
        for(let i in szo) {
            if(keresett.includes(szo[i])) {
                szotombok[sor].children[i].className = "szo sarga";
                betuKitalalva(szotombok[sor].children[i].textContent,szo[i],keresett[i]);
            }else {
                betuElment(szotombok[sor].children[i].textContent);
            }
            if(szo[i] === keresett[i]) {
                szotombok[sor].children[i].className = "szo zold";
            }     
        }
    }else if(szo.length === 4 && bennevan(szo) === false) {
        szo = [];
    }


    if(szo.join().replaceAll(",","") === keresett && kulcs === "Enter") {
        alert("nyertel");
    }

    if(szo.length === 4 && sor === 4  && kulcs === "Enter") {
        setTimeout(() => {
            if(szo.join().replaceAll(",","") != keresett) {
                alert("ez volt a szó: " + keresett);
            }
            ujra();
        }, 110);
    }

    if(szo.join().replaceAll(",","") === keresett && kulcs === "Enter") {
        setTimeout(() => {
            ujra();
        }, 110);
    }

    if(kulcs === "Enter" && szo.length === 4) {
        szo = [];
        sor++;
    }

})



//Billentyűzet

for(let i in betuk) {
    let bet = document.createElement("div");
    bet.textContent = betuk[i].toUpperCase();
    bet.className = "betu";
    bet.setAttribute("code",betuk[i]);
    if(betuk[i] === "Enter") {
        bet.textContent = betuk[i];
        bet.className = "enter-betu"
    }

    if(betuk[i] === "Vissza") {
        bet.textContent = betuk[i];
        bet.className = "enter-betu"
        bet.setAttribute("code","Backspace");
    }

    bet.addEventListener("click",(e)=>{
        let keyy = e.target.getAttribute("code");
        const event = new KeyboardEvent("keydown",{
            key:keyy,
            code:keyy,
        });
        document.dispatchEvent(event);
    })

    bill.append(bet);
}


function betuKitalalva(betu,szo,keresett) {
    betu = betu.toUpperCase();
    for(let i in bill.children) {
        if(bill.children[i].textContent === betu && !bill.children[i].classList.contains("zold")){
            if(szo === keresett) {
                bill.children[i].className = "zold betu-szintelen";
            }else  {
                bill.children[i].className = "sarga betu-szintelen";
            }
        }
    }
}

function betuElment(betu) {
    betu = betu.toUpperCase();
    for(let i in bill.children) {
        if(bill.children[i].textContent === betu){
             bill.children[i].className = "szurke betu-szintelen";
        }

    }
}


