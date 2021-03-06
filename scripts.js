
const arguments = []
const btn = document.getElementsByClassName('btn')
const egal = document.getElementById('btnegal')
const btno = document.getElementsByClassName('btnOpe')
const point = document.getElementById('btnpoint')
const btnH = document.getElementById('btnh')
const reset = document.getElementById('btnreset')
const gomme = document.getElementById('btngomme')
const range = document.getElementById('btnrange')

const total = document.getElementById('total')
let affTotal = document.createElement('p')
const heure = document.getElementById('totalheure')
let affTotalH = document.createElement('p')
const saisie = document.getElementById('saisie')
let affSaisie = document.createElement('p')
const calcul = document.getElementById('calcul')
let affCalc = document.createElement('p')

const newTotal = document.getElementById('newTotal')
let newAffTotal = document.createElement('p')
const newHeure = document.getElementById('newTotalheure')
let newAffTotalH = document.createElement('p')
const lader = document.getElementById('lader')

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

//* bouton reset 
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

//* bouton gomme
const gommer = () => { //TODO il faut qu'il ait un impact sur arguments, sinon ça sert à rien.
    // Du coup ce serait peut être plus simple si le programme ne fait rien sauf afficher jusqu'au bouton égal, où là il prends la string tapée et la convertie en nombres, opérateurs, etc, arguments ne se remplit qu'à la toute fin
    let pbpoint = affSaisie.textContent.length;
    if (affSaisie.textContent[pbpoint - 1] === "." || affSaisie.textContent[pbpoint - 1] === "h") {
        point.disabled = false;
        btnH.disabled = false;
    }
    let newaffSaisie = affSaisie.textContent.slice(0, -1);
    let newaffCalc = affCalc.textContent.slice(0, -1);
    affSaisie.textContent = `${newaffSaisie}`
    affCalc.textContent = `${newaffCalc}`
}

//* affichage et génération du nombre1
const toucheNombre = () => {
    for (let i = 0; i < btn.length; i++) {
        function affiche() {
            affSaisie.textContent += `${btn[i].value}`;
            saisie.appendChild(affSaisie);
            affCalc.textContent += `${btn[i].value}`;
            calcul.appendChild(affCalc);
            // console.log(affSaisie);
        }
        btn[i].addEventListener("click", () => {
            if (affTotal.textContent !== "") {
                clear();
                affiche();
                console.log(arguments);
            }
            else {
                affiche();
                console.log(arguments);
            }
        });
    }
    point.addEventListener('click', () => {
        affSaisie.textContent += `${point.value}`;
        affCalc.textContent += `${point.value}`;
        point.disabled = true;
        btnH.disabled = true;
    })
    btnH.addEventListener('click', () => {
        affSaisie.textContent += `${btnH.value}`;
        affCalc.textContent += `${btnH.value}`;
        btnH.disabled = true;
        point.disabled = true;
    })
}

//! stockage des nombres et opérateurs dans un array
//*prévenir l'utilisateur que le format d'heure est incongru
const erreurSaisie = (arr) => {
    if (arr[1].length === 1 || arr[1].length > 2) {
        alert(`${affSaisie.textContent} ... êtes-vous sûr(e) ? Je ne répond pas du résultat ;)`)
    }
}

//*stockage, affichage, réinitialisation
const firstOp = (x) => {
    arguments.push(x.value);
    affCalc.textContent += ` ${x.value} `;
    calcul.appendChild(affCalc);
    affSaisie.textContent = "";
}

const noFirstOp = (x) => {
    affTotal.textContent = "";
    total.appendChild(affTotal);
    arguments.push(x.value);
    affCalc.textContent = `${arguments[0].toFixed(2)} ${x.value} `;
    calcul.appendChild(affCalc);
    affSaisie.textContent = "";
}

const btbts = document.querySelectorAll('.btnOpe')
btbts.forEach(btbt => btbt.addEventListener("click", () => {
    point.disabled = false;
    btnH.disabled = false;
    if (!affSaisie.textContent.includes('h')) {
        if (affTotal.textContent === "") {
            arguments.push(Number(affSaisie.textContent));
            firstOp(btbt);
        }
        else {
            noFirstOp(btbt);
        }
    }
    else {
        let bbb = affSaisie.textContent.split('h')
        erreurSaisie(bbb);
        bbb[1] = bbb[1] / 60;
        let ccc = Number(bbb[0]) + bbb[1];
        if (affTotal.textContent === "") {
            arguments.push(ccc);
            firstOp(btbt);
        }
        else {
            noFirstOp(btbt);
        }
    }
    console.log(arguments);
}
))

//! opération
egal.addEventListener('click', () => {
    point.disabled = false;
    btnH.disabled = false;
    if (affSaisie.textContent !== "") {
        if (!affSaisie.textContent.includes('h')) {
            arguments.push(Number(affSaisie.textContent));
        }
        else {
            let bbb = affSaisie.textContent.split('h')
            erreurSaisie(bbb);
            bbb[1] = bbb[1] / 60;
            let ccc = Number(bbb[0]) + bbb[1];
            arguments.push(ccc);
        }
    }
    affSaisie.textContent = "";
    while (arguments.length > 1) {
        if (arguments.indexOf("r") > 0) {
            let k = arguments.indexOf("r");
            let j = arguments[k - 1];
            let l = arguments[k + 1];
            arguments.splice(k - 1, 3, calculator.range(j, l))
        }
        if (arguments.indexOf("/") > 0) {
            let k = arguments.indexOf("/");
            let j = arguments[k - 1];
            let l = arguments[k + 1];
            arguments.splice(k - 1, 3, calculator.divide(j, l))
        }
        if (arguments.indexOf("*") > 0) {
            let k = arguments.indexOf("*");
            let j = arguments[k - 1];
            let l = arguments[k + 1];
            arguments.splice(k - 1, 3, calculator.multiply(j, l))
        }
        if (arguments.indexOf("-") > 0) {
            let k = arguments.indexOf("-");
            let j = arguments[k - 1];
            let l = arguments[k + 1];
            arguments.splice(k - 1, 3, calculator.subtract(j, l))
        }
        if (arguments.indexOf("+") > 0) {
            let k = arguments.indexOf("+");
            let j = arguments[k - 1];
            let l = arguments[k + 1];
            arguments.splice(k - 1, 3, calculator.add(j, l))
        }
    }
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

gomme.addEventListener('click', gommer)
reset.addEventListener('click', clear);
clear()
toucheNombre()


//TODO support clavier
// window.addEventListener('keydown', function(e){
//     const keys = document.querySelector(`button[data-key="${e.keyCode}"]`);
//     console.log(keys.value)
// })