$(document).ready(function(){

  setInterval(function() {
    $.ajax({                                           //Sending AJAX POST request
      type: "GET",
      url: "table.php",
      success: postCalculation
    });
  }, 5000);
  
  const calculator = {
    displayValue: '0',
    idValue: '0', 
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };
  
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
  
  function inputDecimal(dot) {
    // If the `displayValue` does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
      // Append the decimal point
      calculator.displayValue += dot;
    }
  }

  function postCalculation(result){
    $('tbody').html(result);
  }
  
  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator

    const inputValue = parseFloat(displayValue);
    
    
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
  
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    calculator.idValue = '0';
  }
  
  function updateDisplay() {
    const display = document.querySelector('#calculator-screen');
    const id = document.querySelector('#id-screen')
    display.value = calculator.displayValue;
    id.value = calculator.idValue;
    
  }
  
  updateDisplay();
  
  const keys = document.querySelector('.calculator-keys');
  $('button').click(function(){
    if (this.classList.contains('operator')) {
      /*
      if(calculator.idValue.includes('=')){
        calculator.idValue = calculator.displayValue;
        updateDisplay();
      }*/
      handleOperator(this.value);
      updateDisplay();
      if(this.classList.contains('equal-sign')){
        let data = calculator.idValue+calculator.displayValue;
        $.ajax({                                           //Sending AJAX POST request
          type: "POST",
          url: "calculator.php",
          data: data,
          success: postCalculation,
          dataType: "text" 
        });
      }
    }
    else if (this.classList.contains('decimal')) {
      inputDecimal(this.value);
      updateDisplay();
    }

    else if (this.classList.contains('all-clear')) {
      resetCalculator();
      updateDisplay();  
    }
  
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