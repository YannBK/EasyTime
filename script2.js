
let arguments = [];
//boutons
const btn = document.getElementsByClassName('btn')
const btnA = document.getElementsByClassName('btnA')
const egal = document.getElementById('btnegal')
const btno = document.getElementsByClassName('btnOpe')
const point = document.getElementById('btnpoint')
const btnH = document.getElementById('btnh')
const reset = document.getElementById('btnreset')
const gomme = document.getElementById('btngomme')
const range = document.getElementById('btnrange')
//affichage écran
const total = document.getElementById('total')
let affTotal = document.createElement('p')
const heure = document.getElementById('totalheure')
let affTotalH = document.createElement('p')
const saisie = document.getElementById('saisie')
let affSaisie = document.createElement('p')
const calcul = document.getElementById('calcul')
let affCalc = document.createElement('p')
//affichage sous calculette
const newTotal = document.getElementById('newTotal')
let newAffTotal = document.createElement('p')
const newHeure = document.getElementById('newTotalheure')
let newAffTotalH = document.createElement('p')
const lader = document.getElementById('lader')
//objet calculatrice
const calculator = {
    add(a, b) {
        return a + b;
    },
    subtract(a, b) {
        return a - b;
    },
    divide(a, b) {
        return a / b;
    },
    multiply(a, b) {
        return a * b;
    },
    range(a, b) {
        if (a < b) {
            return b - a;
        }
        else {
            return 24 - a + b;
        }
    }
}

// bouton reset 
const clear = () => {
    while (arguments.length > 0) {
        arguments.pop();
    }
    affSaisie.textContent = "";
    affCalc.textContent = "";
    affTotal.textContent = "";
    affTotalH.textContent = "";
    newAffTotal.textContent = "";
    newAffTotalH.textContent = "";
    lader.style.display = 'none';
    point.disabled = false;
    btnH.disabled = false;
}

// bouton gomme
const gommer = () => {
    let pbpoint = affSaisie.textContent.length;
    let newaffSaisie;
    let newaffCalc;
    if (affSaisie.textContent[pbpoint - 1] === " ") {
        newaffSaisie = affSaisie.textContent.slice(0, -3);
        newaffCalc = affCalc.textContent.slice(0, -3);
    }
    else {
        if (affSaisie.textContent[pbpoint - 1] === "." || affSaisie.textContent[pbpoint - 1] === "h") {
            point.disabled = false;
            btnH.disabled = false;
        }
        newaffSaisie = affSaisie.textContent.slice(0, -1);
        newaffCalc = affCalc.textContent.slice(0, -1);
    }
    affSaisie.textContent = `${newaffSaisie}`
    affCalc.textContent = `${newaffCalc}`
}

// affichage input
const btbts = document.querySelectorAll('.btnOpe')
const toucheNombre = () => {    
    btbts.forEach(btbt => btbt.addEventListener("click", () => {
        point.disabled = false;
        btnH.disabled = false;
        if (affTotal.textContent !== "") { //réutilisation résultat précédent
            affCalc.textContent = `${affTotalH.textContent}`;
            calcul.appendChild(affCalc);
            affSaisie.textContent = `${affTotalH.textContent}`;
            saisie.appendChild(affSaisie);
            affTotal.textContent = "";
            total.appendChild(affTotal);
            affTotalH.textContent = "";
            heure.appendChild(affTotalH);
        }
    }))
    for (let i = 0; i < btnA.length; i++) {
        function affiche() {
            affSaisie.textContent += `${btnA[i].value}`;
            saisie.appendChild(affSaisie);
            affCalc.textContent += `${btnA[i].value}`;
            calcul.appendChild(affCalc);
        }
        btnA[i].addEventListener("click", () => {
            if (affTotal.textContent !== "") {
                clear();
                affiche();
            }
            else {
                affiche();
            }
        });
    }
    point.addEventListener('click', () => {
        point.disabled = true;
        btnH.disabled = true;
    })
    btnH.addEventListener('click', () => {
        btnH.disabled = true;
        point.disabled = true;
    })
}

//trouver une lettre
function findH(str, car) {
    for (let i = 0; i < str.length; i++) {
        if (str[i] === car) {
            return true;
        }
    }
    return false;
}

//Opération bouton égal
egal.addEventListener('click', () => {
    point.disabled = false;
    btnH.disabled = false;
    //conversion input en tableau de nombres et d'opérateurs
    arguments = affSaisie.textContent.split(" ");
    for (let i = 0; i < arguments.length; i++) {
        if (findH(arguments[i], "h") == true) {
            let provisoire = arguments[i].split("h");
            provisoire[0] = Number(provisoire[0]);
            provisoire[1] = Number(provisoire[1]) / 60;
            arguments[i] = provisoire[0] + provisoire[1];
        }
        else if (findH(arguments[i], ".") == true) {
            arguments[i] = Number(arguments[i]);
        }
        else if (arguments[i] === "+" || arguments[i] === "-" || arguments[i] === "/"|| arguments[i] === "*"|| arguments[i] === "r") { //flèche double en html : &#x21D4; || &#8660; || &hArr; ET en JS : \u21d4 à mettre pour l'affichage du range
            arguments[i] = arguments[i];            
        }
        else {
            arguments[i] = Number(arguments[i]);
        }
    }
    affSaisie.textContent = "";
    console.log(arguments)
    //utilisation calculatrice
    while (arguments.length > 1) {
        if (arguments.indexOf("r") > 0) {
            let k = arguments.indexOf("r");
            let j = arguments[k - 1];
            let l = arguments[k + 1];
            arguments.splice(k - 1, 3, calculator.range(j, l))
        }
        else if (arguments.indexOf("/") > 0) {
            let k = arguments.indexOf("/");
            let j = arguments[k - 1];
            let l = arguments[k + 1];
            arguments.splice(k - 1, 3, calculator.divide(j, l))
        }
        else if (arguments.indexOf("*") > 0) {
            let k = arguments.indexOf("*");
            let j = arguments[k - 1];
            let l = arguments[k + 1];
            arguments.splice(k - 1, 3, calculator.multiply(j, l))
        }
        else if (arguments.indexOf("-") > 0) {
            let k = arguments.indexOf("-");
            let j = arguments[k - 1];
            let l = arguments[k + 1];
            arguments.splice(k - 1, 3, calculator.subtract(j, l))
        }
        else if (arguments.indexOf("+") > 0) {
            let k = arguments.indexOf("+");
            let j = arguments[k - 1];
            let l = arguments[k + 1];
            arguments.splice(k - 1, 3, calculator.add(j, l))
        }
    }
    //affichage résultat
    affCalc.textContent += ` ${egal.value}`;
    let result;
    if (Number.isInteger(arguments[0])) {
        result = arguments[0];
    }
    else {
        result = arguments[0].toFixed(2);
    }
    let fff = arguments[0].toFixed(2);
    let ddd = fff.toString().split(".");
    ddd[1] = (ddd[1] * 0.6).toFixed(0);
    if (Number(ddd[1]) < 10) {
        resultHeure = `${ddd[0]}h0${ddd[1]}`
    }
    else {
        resultHeure = `${ddd[0]}h${ddd[1]}`
    }
    affTotalH.textContent = resultHeure;
    heure.appendChild(affTotalH);
    affTotal.textContent = `${result}h`;
    total.appendChild(affTotal);
    lader.style.display = 'block';
    newAffTotalH.textContent = resultHeure;
    newHeure.appendChild(newAffTotalH);
    newAffTotal.textContent = `${result}h`;
    newTotal.appendChild(newAffTotal);
})

//!prévenir l'utilisateur que le format d'heure est incongru, du coup ça va être un peu plus dur, mais plus efficace si j'y arrive?
// const erreurSaisie = (arr) => {
//     if (arr[1].length === 1 || arr[1].length > 2) {
//         alert(`${affSaisie.textContent} ... êtes-vous sûr(e) ? Je ne répond pas du résultat ;)`)
//     }
// }


gomme.addEventListener('click', gommer)
reset.addEventListener('click', clear);
clear()
toucheNombre()

