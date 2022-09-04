/**
 * Initial Requirements
 */

const $mainInput = document.getElementById("calculator__input__field");
const $printInput = document.getElementById("calculating__div");
let calculate = {
  number1: 0,
  number2: 0,
  operand: "",
  result: 0,
  history : []
};
/**
 * End
 */


document
  .querySelectorAll(".calc__button")
  .forEach((btn) => btn.addEventListener("click", calculatorButtonHandler));
/**
 * Single Function Handeling approach
 * Every button clicked will be matched through
 * regex and operations done accordingly.
 * @param {*} e 
 */

function calculatorButtonHandler(e) {
  const dataValue = e.target.getAttribute("data-value");
  if (/\d/.test(dataValue) && !calculate.number2 && !calculate.operand) {
    if($mainInput.value == '0'){
        $mainInput.value = dataValue;
    }else{
        $mainInput.value += dataValue;
    }
    calculate.number1 = parseInt($mainInput.value);
    $printInput.innerHTML += dataValue;
  } else if (
    /[.//*%+-]/.test(dataValue) &&
    calculate.number1 &&
    !calculate.number2 &&
    !calculate.operand
  ) {
    $mainInput.value = "";
    calculate.operand = dataValue;
    $printInput.innerHTML += " " + dataValue + " ";
  } else if (/\d/.test(dataValue) && calculate.operand && calculate.number1) {
    $printInput.innerHTML += dataValue;
    $mainInput.value += dataValue;
    calculate.number2 = parseInt($mainInput.value);
  } else if(dataValue === '=' && calculate.number1 && calculate.number2 && calculate.operand && !calculate.result) {
    const result  = calculateAndPrint();
    calculate.result = result;
    $mainInput.value = result;
    $printInput.innerHTML += ' = ' + result;
    calculate.history.push($printInput.innerHTML);
    renderCalculationHistoryList();
  }else if(dataValue === 'clear'){
    $mainInput.value  = '0';
    calculate = {
        ...calculate,
        result : 0,
        number1 : 0,
        number2 : 0,
        operand : ""
    }
    $printInput.innerHTML = '';
  }
}
/**
 * rendering calculation history
 * to the listing div
 */
function renderCalculationHistoryList(){
    const $historyListWrapper = document.getElementById('history__list');
    $historyListWrapper.innerHTML = '';
    calculate.history.map((h,i) => ($historyListWrapper.innerHTML += `<li>${h}</li>`))
}
/**
 * calculations printed to div above input
 * @returns 
 */
function calculateAndPrint() {
  switch (calculate.operand) {
    case "/":
      return parseFloat(calculate.number1) / parseFloat(calculate.number2);
    case "-":
      return parseFloat(calculate.number1) - parseFloat(calculate.number2);
    case "*":
      return parseFloat(calculate.number1) * parseFloat(calculate.number2);
    case "+":
      return parseFloat(calculate.number1) + parseFloat(calculate.number2);
    default:
      return 0;
  }
}
