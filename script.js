class Calculator {
    constructor(prev_op_text, curr_op_text) {
        this.prev_op_text = prev_op_text
        this.curr_op_text = curr_op_text
        this.clear()
    }

    clear() {
        this.curr_op = ''
        this.prev_op = ''
        this.operation = undefined
    }

    delete() {
        this.curr_op = this.curr_op.toString().slice(0, -1)
    }

    append(number) {
        if (number == '.' && this.curr_op.includes('.')) return
        this.curr_op = this.curr_op.toString() + number.toString()
    }

    choose_op(operation) {
        if (this.curr_op == '') return
        if (this.prev_op !== '') {
            this.calculate()
        }
        this.operation = operation
        this.prev_op = this.curr_op
        this.curr_op = ''
    }

    calculate() {
        let result
        const prev = parseFloat(this.prev_op)
        const curr = parseFloat(this.curr_op)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                result = prev + curr
                break
            case '-':
                result = prev - curr
                break
            case '×':
                result = prev * curr
                break
            case '÷':
                result = prev / curr
                break
            default:
                return
        }
        this.curr_op = result
        this.operation = undefined
        this.prev_op = ''
    }

    disp_number(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }

    update() {
        this.curr_op_text.innerText = 
            this.disp_number(this.curr_op)
            if (this.operation != null) {
                this.prev_op_text.innerText = 
                `${this.prev_op} ${this.operation}`
            }
            else {
                this.prev_op_text.innerText = ''
            }
    }
}

const num_buttons = document.querySelectorAll('[number]')
const op_buttons = document.querySelectorAll('[operation]')
const equal_button = document.querySelector('[equals]')
const delete_button = document.querySelector('[delete]')
const clear_button = document.querySelector('[clear]')
const prev_op_text = document.querySelector('[prev-op]')
const curr_op_text = document.querySelector('[curr-op]')

const calculator = new Calculator(prev_op_text, curr_op_text)

num_buttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.append(button.innerText)
        calculator.update()
    })
})

op_buttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.choose_op(button.innerText)
        calculator.update()
    })
})

equal_button.addEventListener('click', button => {
    calculator.calculate()
    calculator.update()
})

clear_button.addEventListener('click', button => {
    calculator.clear()
    calculator.update()
})

delete_button.addEventListener('click', button => {
    calculator.delete()
    calculator.update()
})