let numberButtons = document.querySelectorAll('[data-number]')
let operatorButtons = document.querySelectorAll('[data-operator]')
let previousText = document.querySelector('[data-previous]')
let currentText = document.querySelector('[data-current]')
let clearButton = document.querySelector('[data-clear-everything]')
let eraseButton = document.querySelector('[data-erase]')
let equals = document.querySelector('[data-equals]')

class Calculator {
    constructor(previousText, currentText) {
        this.previousText = previousText
        this.currentText = currentText
        this.clear()
    }

    formatDisplayNumber(num) {
        const stringNumber = num.toString();

        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split(".")[1]

        let integerDisplay

        if (isNaN(integerDigits)) {
            integerDisplay = ""
        } else{
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits:0
            })
        }

        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    erase(){
        this.current = this.current.toString().slice(0, -1)
    }

    calculate() {
        let result

        const previousFloat = parseFloat(this.previous)
        const currentFloat = parseFloat(this.current)

        if (isNaN(previousFloat) || isNaN(currentFloat)) return

        switch (this.operation) {
            case '+':
                result = previousFloat + currentFloat
                break;
            case '-':
                result = previousFloat - currentFloat
                break;
            case '/':
                result = previousFloat / currentFloat
                break;
            case '*':
                result = previousFloat * currentFloat
                break;
            default:
                return;
        }

        this.current = result
        this.operation = undefined
        this.previous = ""
    }

    chooseOperation(operation){
        if (this.current === '') return

        if (this.current !== ''){
            this.calculate()
        }
        
        this.operation = operation

        this.operation = operation

        this.previous = `${this.current}`
        this.current = ""
    }

    appendNumber(num){
        if(this.current.includes('.') && num === ".") return
        this.current = `${this.current}${num.toString()}`
    }

    clear(){ 
        this.current = ''
        this.previous = ''
        this.operation = undefined
    }

    updateDisplay(){
        this.previousText.innerText = `${this.formatDisplayNumber(this.previous)} ${this.operation || ""} `
        this.currentText.innerText = this.formatDisplayNumber(this.current)
    }
}

const calculator = new Calculator(previousText, currentText)

for (const numberButton of numberButtons){
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText)
        calculator.updateDisplay()
    })
}

for (const operatorButton of operatorButtons) {
        operatorButton.addEventListener('click', () => {
            calculator.chooseOperation(operatorButton.innerText)
            calculator.updateDisplay()
        })
}

clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

equals.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})

eraseButton.addEventListener('click', () => {
    calculator.erase()
    calculator.updateDisplay()
})

