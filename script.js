$(document).ready(function(){

  /**
   * Update History Table every 5 seconds
   */
  setInterval(function() {
    $.ajax({                                           //Sending AJAX GET request
      type: "GET",
      url: "table.php",
      success: updateTable
    });
  }, 5000);
  
  const calculator = {
    displayValue: '0',
    idValue: '0', 
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };
  
  /**
   * Input a integer on calculator display
   * 
   * @param {String} digit - Input number
   */
  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
     
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } 
    else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  }
  
  /**
   * Add decimal point to number if
   * not already present
   * 
   * @param {String} dot - Decimal point
   */
  function inputDecimal(dot) {
    // If the `displayValue` does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
      // Append the decimal point
      calculator.displayValue += dot;
    }
  }

  /**
   * Update History table
   * 
   * @param {String} result - HTML String
   */
  function updateTable(result){
    $('tbody').html(result);
  }
  
  /**
   * Handle mathematical operations
   * 
   * @param {String} nextOperator - Mathematical Operator
   */
  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator

    const inputValue = parseFloat(displayValue);
    
    //if operator is changed
    if (operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      let arr = calculator.idValue.split('');
      arr[arr.length-1] = nextOperator;
      calculator.idValue = arr.join('');
      
      updateDisplay();
      return;
    }
    
    if (calculator.idValue === '0')
      calculator.idValue = displayValue + nextOperator;
    else
      calculator.idValue += displayValue + nextOperator;

    if (firstOperand == null) {
      calculator.firstOperand = inputValue;
    } 
    else if (operator) {
      const currentValue = firstOperand || 0;
      const result = performCalculation[operator](currentValue, inputValue);
  
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
  }
  
  const performCalculation = {
    '/': (firstOperand, secondOperand) => parseFloat((firstOperand / secondOperand).toPrecision(15)),
  
    '*': (firstOperand, secondOperand) => parseFloat((firstOperand * secondOperand).toPrecision(15)),
  
    '+': (firstOperand, secondOperand) => parseFloat((firstOperand + secondOperand).toPrecision(15)),
  
    '-': (firstOperand, secondOperand) => parseFloat((firstOperand - secondOperand).toPrecision(15)),
  
    '=': (firstOperand, secondOperand) => parseFloat((secondOperand).toPrecision(15))
  };
  
  /**
   * Reset calculator
   */
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    calculator.idValue = '0';
  }

  /**
   * Update changes to Calculator display
   */  
  function updateDisplay() {
    const display = document.querySelector('#calculator-screen');
    const id = document.querySelector('#id-screen')
    display.value = calculator.displayValue;
    id.value = calculator.idValue;
    
  }
  
  updateDisplay();
  
  const keys = document.querySelector('.calculator-keys');

  /**
   * When button is clicked
   */
  $('button').click(function(){

    //if button clicked is operator
    if (this.classList.contains('operator')) {
      
      handleOperator(this.value);
      updateDisplay();

      // if operator is equal sign
      if(this.classList.contains('equal-sign')){
        let data = "equation="+calculator.idValue+calculator.displayValue;
        data.replace(".", "d");
        console.log(data);
        $.ajax({                                           //Sending AJAX POST request
          type: "POST",
          url: "calculator.php",
          data: data,
          dataType: "text" 
        });
      }
    }

    // if button is decimal
    else if (this.classList.contains('decimal')) {
      inputDecimal(this.value);
      updateDisplay();
    }

    // if button is AC
    else if (this.classList.contains('all-clear')) {
      resetCalculator();
      updateDisplay();  
    }
    
    // if button clicked is number
    else{
      
      if(calculator.idValue.includes('=')){
        resetCalculator();
        updateDisplay();
      }
      inputDigit(this.value);
      updateDisplay();
    }

  });
    
});