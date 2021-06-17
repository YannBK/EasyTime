
const btn = document.getElementsByClassName('btn')
const saisie = document.getElementById('saisie')
const resultat = document.getElementById('resultat')
const egal = document.getElementById('btnegal')
const total = document.getElementById('total')
const heure = document.getElementById('totalheure')
let nombreTotal = document.createElement('p')
let nombreTotalHeure = document.createElement('p')
let nombreSaisie = document.createElement('p')
const reset = document.getElementById('btnreset')
const gomme = document.getElementById('btngomme')
const arguments = []
let nombreResultat = document.createElement('p')
const btno = document.getElementsByClassName('btnOpe')
const point = document.getElementById('btnpoint')
const btnheure = document.getElementById('btnh')

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
}

//! bouton reset
const clear = () => {
    while (arguments.length > 0) {
        arguments.pop();
    }
    nombreSaisie.textContent = "";
    nombreResultat.textContent = "";
    nombreTotal.textContent = "";
    point.disabled = false;
    btnheure.disabled = false;
    console.log(arguments)
}
reset.addEventListener('click', clear);

//! affichage et génération du nombre1
const toucheNombre = () => {
    for (let i = 0; i < btn.length; i++) {
        function affiche() {
            nombreSaisie.classList.add("para"); //? c'est quoi cette classe
            //affichage de la saisie
            nombreSaisie.textContent += `${btn[i].value}`;
            saisie.appendChild(nombreSaisie);
            nombreResultat.textContent += `${btn[i].value}`;
            resultat.appendChild(nombreResultat);
            console.log(nombreSaisie);
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
        nombreSaisie.textContent += `${point.value}`;
        nombreResultat.textContent += `${point.value}`;
        point.disabled = true;
    })
    btnheure.addEventListener('click', () => {
        nombreSaisie.textContent += `${btnheure.value}`;
        nombreResultat.textContent += `${btnheure.value}`;
        btnheure.disabled = true;
    })
}

//! stockage des nombres et opérateurs dans un array

const stockOperator = () => {
    for (let i = 0; i < btno.length; i++) {
        btno[i].addEventListener("click", () => {
            point.disabled = false;
            btnheure.disabled = false;
            //stockage valeurs dans array
            if (!nombreSaisie.textContent.includes('h')) {
                if (nombreTotal.textContent === "") {
                    arguments.push(Number(nombreSaisie.textContent));
                    arguments.push(btno[i].value);
                    //affichage de l'opération
                    nombreResultat.textContent += ` ${btno[i].value} `;
                    resultat.appendChild(nombreResultat);
                    //réinitialisation saisie
                    nombreSaisie.textContent = "";
                    console.log(arguments);
                    console.log(nombreResultat);
                }
                else {
                    nombreTotal.textContent = "";
                    total.appendChild(nombreTotal);
                    arguments.push(btno[i].value);
                    //affichage de l'opération
                    nombreResultat.textContent = `${arguments[0]} ${btno[i].value} `;
                    resultat.appendChild(nombreResultat);
                    //réinitialisation saisie
                    nombreSaisie.textContent = "";
                    console.log(arguments);
                    console.log(nombreResultat);
                }
            }
            else {
                let bbb = nombreSaisie.textContent.split('h')
                bbb[1] = bbb[1] / 60;
                let ccc = Number(bbb[0]) + bbb[1];
                if (nombreTotal.textContent === "") {
                    arguments.push(ccc);
                    arguments.push(btno[i].value);
                    //affichage de l'opération
                    nombreResultat.textContent += ` ${btno[i].value} `;
                    resultat.appendChild(nombreResultat);
                    //réinitialisation saisie
                    nombreSaisie.textContent = "";
                    console.log(arguments);
                    console.log(nombreResultat);
                }
                else {
                    nombreTotal.textContent = "";
                    total.appendChild(nombreTotal);
                    arguments.push(btno[i].value);
                    //affichage de l'opération
                    nombreResultat.textContent = `${arguments[0]} ${btno[i].value} `;
                    resultat.appendChild(nombreResultat);
                    //réinitialisation saisie
                    nombreSaisie.textContent = "";
                    console.log(arguments);
                    console.log(nombreResultat);
                }
            }
        }
        );
    }
}
//! bouton gomme

gomme.addEventListener('click', () => {
    let pbpoint = nombreSaisie.textContent.length;
    if (nombreSaisie.textContent[pbpoint - 1] === ".") {
        point.disabled = false;
    }
    if (nombreSaisie.textContent[pbpoint - 1] === "h") {
        btnheure.disabled = false;
    }
    let newNombreSaisie = nombreSaisie.textContent.slice(0, -1);
    let newNombreResultat = nombreResultat.textContent.slice(0, -1);
    // console.log(newNombreSaisie)
    nombreSaisie.textContent = `${newNombreSaisie}`
    nombreResultat.textContent = `${newNombreResultat}`
    // console.log(newNombreSaisie)
})

//! opération
egal.addEventListener('click', () => {
    point.disabled = false;
    btnheure.disabled = false;
    if (nombreSaisie.textContent !== "") {
        if (!nombreSaisie.textContent.includes('h')) {
            arguments.push(Number(nombreSaisie.textContent));
        }
        else {
            let bbb = nombreSaisie.textContent.split('h')
            bbb[1] = bbb[1] / 60;
            let ccc = Number(bbb[0]) + bbb[1];
            arguments.push(ccc);
        }
    }
    nombreSaisie.textContent = "";
    while (arguments.length > 1) {
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
    nombreResultat.textContent += ` ${egal.value}`;
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


clear()
toucheNombre()
stockOperator()


// let ccc = Number(bbb[0]) + bbb[1];
// arguments.push(ccc);