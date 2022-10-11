
class HumanRessources {

    constructor(){
        this.equation = [];
        this.totalDecimal = document.getElementById('total-decimal');
        this.totalClock = document.getElementById('total-clock');
        this.userInput = document.getElementById('user-input');
        this.currentOperation = document.getElementById('current-operation');
        this.totalText = document.getElementById('total-text');
        this.calculatorObject = [
            {
                sign: "+",
                operation: (a, b) => a + b
            },
            {
                sign: "-",
                operation: (a, b) => a - b
            },
            {
                sign: "/",
                operation: (a, b) => a / b
            },
            {
                sign: "*",
                operation: (a, b) => a * b
            },
            {
                sign: "r",
                operation: (a, b) => {
                    if (a < b) {
                        return b - a;
                    }
                    return 24 - a + b;
                }
            }
        ];
    }

    startListening() {
        const buttons = document.querySelectorAll(".buttons");

        document.addEventListener('keydown', (e)=>{
            e.preventDefault();
            let key = e.key;
            let authorizedKeys = ['0','1','2','3','4','5','6','7','8','9','.','h','+','-','*','/','r','Backspace','Enter','Delete'];
            if(authorizedKeys.includes(key)) {
                this.choseAction(key);
                this.colorButtonsOnKeyboard(key);
            }
        });

        for(let btn of buttons) {
            btn.addEventListener('click', ()=>{
                let value = btn.value.trim();
                this.choseAction(value);
            });
        }
    }

    choseAction(value) {
        switch(value) {
            case '.':
            case 'h':
                this.disableSeparators();
                this.updateScreenOnButtons(value);
                break;
            case 'Backspace':
                this.erase();
                break;
            case 'Delete':
                this.clear();
                break;
            case 'Enter':
                this.doMath();
                break;
            case '+':
            case '-':
            case '*':
            case '/':
            case 'r':
                this.updateScreenOnOperator();
                this.updateScreenOnButtons(`${value}`);
                break;
            default:
                this.updateScreenOnButtons(value);
        }
    }

    updateScreenOnOperator() {
        this.enableSeparators();

        //réutilisation résultat précédent
        if (this.totalDecimal.textContent !== "") {
            this.currentOperation.textContent = `${this.totalClock.textContent}`;
            this.userInput.textContent = `${this.totalClock.textContent}`;
            this.totalDecimal.textContent = "";
            this. totalClock.textContent = "";
        }
    }

    updateScreenOnButtons(value) {
        if (this.totalDecimal.textContent !== "") {
            this.clear();
        }
        let content =`${value}`; 
        if(isNaN(value) & value != 'h' & value != ".") {
            content = ` ${value} `;
        }
        this.userInput.textContent += content;
        this.currentOperation.textContent += content;
    }

    clear() {
        this.equation = [];
        
        this.userInput.textContent = "";
        this.currentOperation.textContent = "";
        this.totalClock.textContent = "";
        this.totalDecimal.textContent = "";
        this.totalText.textContent = "";

        this.enableSeparators();
    }

    erase() {
        let length = this.userInput.textContent.length;
        let newUserInput;
        let newCurrentOperation;
        if (this.userInput.textContent[length - 1] === " ") {
            newUserInput = this.userInput.textContent.slice(0, -3);
            newCurrentOperation = this.currentOperation.textContent.slice(0, -3);
            this.enableSeparators();
        }
        else {
            newUserInput = this.userInput.textContent.slice(0, -1);
            newCurrentOperation = this.currentOperation.textContent.slice(0, -1);
        }
        this.userInput.textContent = `${newUserInput}`;
        this.currentOperation.textContent = `${newCurrentOperation}`;
    }

    disableSeparators() {
        document.getElementById('btnh').disabled = true;
        document.getElementById('btnPt').disabled = true;
    }

    enableSeparators() {
        document.getElementById('btnh').disabled = false;
        document.getElementById('btnPt').disabled = false;
    }

    colorButtonsOnKeyboard(value) {
        let btn = document.getElementById(`btn${value}`);
        if(value === "." || value === "+" || value === "-" || value === "*" || value === "/"){
            btn = document.querySelector(`[data-sign = "${value}"]`);
        }

        btn.classList.add('btn-enlight');
        setTimeout(()=>{
            btn.classList.remove('btn-enlight');
        }, 200);
    }

    doMath() {
        this.enableSeparators();
        if(this.userInput.textContent === "") {
            this.clear();
            return;
        }

        this.equation = this.convertInputToArray(this.userInput);
        if(this.equation === "error") {
            alert("Une erreur de saisie s'est sûrement glissée dans le calcul !");
            return;// pauvre ;)
        }
        let result = this.getResultFromArray(this.equation);

        this.displayResult(result);
    }

    displayResult(result) {
        let clockResult = this.clockFormat(result);

        this.totalClock.textContent = clockResult;
        this.totalDecimal.textContent = `${result} h`;

        this.totalText.innerHTML = `
            <p class="newP">Total : <span class="totalOrange">${result} h</span> ou <span class="totalGreen">${clockResult}</span>`;
        this.totalText.style.display = 'block';
    }

    convertInputToArray(input) {
        let arr = input.textContent.split(" ");

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].search(new RegExp("h", "g")) != -1) {
                let temp = arr[i].split("h");
                if(temp[1].length === 1 || temp[1].length > 2) {
                    return "error";
                }
                temp[0] = Number(temp[0]);
                temp[1] = Number(temp[1]) / 60;
                arr[i] = temp[0] + temp[1];
            }
            else if (arr[i] === "+" || arr[i] === "-" || arr[i] === "/"|| arr[i] === "*"|| arr[i] === "r") {
                arr[i] = arr[i];            
            }
            else {
                arr[i] = Number(arr[i]);
            }
        }
        input.textContent = "";
        return arr;
    }

    getResultFromArray(arr) {
        while (arr.length > 1) {
            for(let op of this.calculatorObject){
                if (arr.indexOf(op["sign"]) > 0) {
                    let k = arr.indexOf(op["sign"]);
                    let j = arr[k - 1];
                    let l = arr[k + 1];
                    arr.splice(k - 1, 3, op.operation(j, l));
                }
            }
        }
        return arr[0].toFixed(2);
    }

    clockFormat(result) {
        let clock = result.toString().split(".");
        clock[1] = (clock[1] * 0.6).toFixed(0);

        if (Number(clock[1]) < 10) {
            return `${clock[0]}h0${clock[1]}`;
        }
        else {
            return `${clock[0]}h${clock[1]}`;
        }
    }
}

const LetsGo = new HumanRessources();
LetsGo.startListening();