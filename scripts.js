
const arguments = []
const btn = document.getElementsByClassName('btn')
const egal = document.getElementById('btnegal')
const btno = document.getElementsByClassName('btnOpe')
const point = document.getElementById('btnpoint')
const btnheure = document.getElementById('btnh')
const reset = document.getElementById('btnreset')
const gomme = document.getElementById('btngomme')
const range = document.getElementById('btnrange')

const total = document.getElementById('total')
let nombreTotal = document.createElement('p')
const heure = document.getElementById('totalheure')
let nombreTotalHeure = document.createElement('p')
const saisie = document.getElementById('saisie')
let afficheSaisie = document.createElement('p')
const resultat = document.getElementById('resultat')
let afficheOperation = document.createElement('p')

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
        if(a < b){
            return b - a;
        }
        else{
            return 24-a+b;
        }
    }
}

//! bouton reset 
const clear = () => {
    while (arguments.length > 0) {
        arguments.pop();
    }
    afficheSaisie.textContent = "";
    afficheOperation.textContent = "";
    nombreTotal.textContent = "";
    nombreTotalHeure.textContent = "";
    point.disabled = false;
    btnheure.disabled = false;
    console.log(arguments)
}


//! affichage et génération du nombre1
const toucheNombre = () => {
    for (let i = 0; i < btn.length; i++) {
        function affiche() {
            afficheSaisie.classList.add("para"); //TODO c'est quoi cette classe ?
            //affichage de la saisie
            afficheSaisie.textContent += `${btn[i].value}`;
            saisie.appendChild(afficheSaisie);
            afficheOperation.textContent += `${btn[i].value}`;
            resultat.appendChild(afficheOperation);
            console.log(afficheSaisie);
        }
        btn[i].addEventListener("click", () => {
            if (nombreTotal.textContent !== "") {
                clear();
                affiche()
            }
            else {
                affiche()
            }
        });
    }
    point.addEventListener('click', () => {
        afficheSaisie.textContent += `${point.value}`;
        afficheOperation.textContent += `${point.value}`;
        point.disabled = true;
    })
    btnheure.addEventListener('click', () => {
        afficheSaisie.textContent += `${btnheure.value}`;
        afficheOperation.textContent += `${btnheure.value}`;
        btnheure.disabled = true;
    })
}

//! stockage des nombres et opérateurs dans un array
//TODO ça marche essayer de fonctionnaliser
// const stockOperator = () => {
//     for (let i = 0; i < btno.length; i++) {
//         btno[i].addEventListener("click", () => {
//             point.disabled = false;
//             btnheure.disabled = false;
//             //stockage valeurs dans array
//             if (!afficheSaisie.textContent.includes('h')) {
//                 if (nombreTotal.textContent === "") {
//                     arguments.push(Number(afficheSaisie.textContent));
//                     arguments.push(btno[i].value);
//                     //affichage de l'opération
//                     afficheOperation.textContent += ` ${btno[i].value} `;
//                     resultat.appendChild(afficheOperation);
//                     //réinitialisation saisie
//                     afficheSaisie.textContent = "";
//                     console.log(arguments);
//                     console.log(afficheOperation);
//                 }
//                 else {
//                     nombreTotal.textContent = "";
//                     total.appendChild(nombreTotal);
//                     arguments.push(btno[i].value);
//                     //affichage de l'opération
//                     afficheOperation.textContent = `${arguments[0]} ${btno[i].value} `;
//                     resultat.appendChild(afficheOperation);
//                     //réinitialisation saisie
//                     afficheSaisie.textContent = "";
//                     console.log(arguments);
//                     console.log(afficheOperation);
//                 }
//             }
//             else {
//                 let bbb = afficheSaisie.textContent.split('h')
//                 bbb[1] = bbb[1] / 60;
//                 let ccc = Number(bbb[0]) + bbb[1];
//                 if (nombreTotal.textContent === "") {
//                     arguments.push(ccc);
//                     arguments.push(btno[i].value);
//                     //affichage de l'opération
//                     afficheOperation.textContent += ` ${btno[i].value} `;
//                     resultat.appendChild(afficheOperation);
//                     //réinitialisation saisie
//                     afficheSaisie.textContent = "";
//                     console.log(arguments);
//                     console.log(afficheOperation);
//                 }
//                 else {
//                     nombreTotal.textContent = "";
//                     total.appendChild(nombreTotal);
//                     arguments.push(btno[i].value);
//                     //affichage de l'opération
//                     afficheOperation.textContent = `${arguments[0]} ${btno[i].value} `;
//                     resultat.appendChild(afficheOperation);
//                     //réinitialisation saisie
//                     afficheSaisie.textContent = "";
//                     console.log(arguments);
//                     console.log(afficheOperation);
//                 }
//             }
//         }
//         );
//     }
// }
//TODO essai
const btbts = document.querySelectorAll('.btnOpe')
// const stockOperator = () => {
        btbts.forEach(btbt => btbt.addEventListener("click", () => {
            point.disabled = false;
            btnheure.disabled = false;
            //stockage valeurs dans array
            if (!afficheSaisie.textContent.includes('h')) {
                if (nombreTotal.textContent === "") {
                    arguments.push(Number(afficheSaisie.textContent));
                    arguments.push(btbt.value);
                    //affichage de l'opération
                    afficheOperation.textContent += ` ${btbt.value} `;
                    resultat.appendChild(afficheOperation);
                    //réinitialisation saisie
                    afficheSaisie.textContent = "";
                    console.log(arguments);
                    console.log(afficheOperation);
                }
                else {
                    nombreTotal.textContent = "";
                    total.appendChild(nombreTotal);
                    arguments.push(btbt.value);
                    //affichage de l'opération
                    afficheOperation.textContent = `${arguments[0]} ${btbt.value} `;
                    resultat.appendChild(afficheOperation);
                    //réinitialisation saisie
                    afficheSaisie.textContent = "";
                    console.log(arguments);
                    console.log(afficheOperation);
                }
            }
            else {
                let bbb = afficheSaisie.textContent.split('h')
                bbb[1] = bbb[1] / 60;
                let ccc = Number(bbb[0]) + bbb[1];
                if (nombreTotal.textContent === "") {
                    arguments.push(ccc);
                    arguments.push(btbt.value);
                    //affichage de l'opération
                    afficheOperation.textContent += ` ${btbt.value} `;
                    resultat.appendChild(afficheOperation);
                    //réinitialisation saisie
                    afficheSaisie.textContent = "";
                    console.log(arguments);
                    console.log(afficheOperation);
                }
                else {
                    nombreTotal.textContent = "";
                    total.appendChild(nombreTotal);
                    arguments.push(btbt.value);
                    //affichage de l'opération
                    afficheOperation.textContent = `${arguments[0]} ${btbt.value} `;
                    resultat.appendChild(afficheOperation);
                    //réinitialisation saisie
                    afficheSaisie.textContent = "";
                    console.log(arguments);
                    console.log(afficheOperation);
                }
            }
        }
    ))
    // }
//! bouton gomme
const gommer =  () => {
    let pbpoint = afficheSaisie.textContent.length;
    if (afficheSaisie.textContent[pbpoint - 1] === ".") {
        point.disabled = false;
    }
    if (afficheSaisie.textContent[pbpoint - 1] === "h") {
        btnheure.disabled = false;
    }
    let newafficheSaisie = afficheSaisie.textContent.slice(0, -1);
    let newafficheOperation = afficheOperation.textContent.slice(0, -1);
    // console.log(newafficheSaisie)
    afficheSaisie.textContent = `${newafficheSaisie}`
    afficheOperation.textContent = `${newafficheOperation}`
    // console.log(newafficheSaisie)
}

//! opération
egal.addEventListener('click', () => {
    point.disabled = false;
    btnheure.disabled = false;
    if (afficheSaisie.textContent !== "") {
        if (!afficheSaisie.textContent.includes('h')) {
            arguments.push(Number(afficheSaisie.textContent));
        }
        else {
            let bbb = afficheSaisie.textContent.split('h')
            bbb[1] = bbb[1] / 60;
            let ccc = Number(bbb[0]) + bbb[1];
            arguments.push(ccc);
        }
    }
    afficheSaisie.textContent = "";
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
    afficheOperation.textContent += ` ${egal.value}`;
    let result;
    if (Number.isInteger(arguments[0])) {
        result = arguments[0];
    }
    else {
        result = arguments[0].toFixed(2);
    }
//TODO ajouter un 0 devant les minutes si <10 min
    let fff = arguments[0].toFixed(2);
    let ddd = fff.toString().split(".");
    ddd[1] = (ddd[1] * 0.6).toFixed(0);
    console.log(ddd);
    if (Number(ddd[1])<10){
        resultHeure =  `${ddd[0]}h0${ddd[1]}`
    }
    else{
    resultHeure = `${ddd[0]}h${ddd[1]}`
    }
    nombreTotalHeure.textContent = resultHeure;
    heure.appendChild(nombreTotalHeure);
    nombreTotal.textContent = `${result}h`;
    total.appendChild(nombreTotal);
    console.log(arguments);
})

gomme.addEventListener('click', gommer)
reset.addEventListener('click', clear);
clear()
toucheNombre()
// stockOperator()

window.addEventListener('keydown', function(e){
    const keys = document.querySelector(`button[data-key="${e.keyCode}"]`);
    console.log(keys.value)

})

// let ccc = Number(bbb[0]) + bbb[1];
// arguments.push(ccc);