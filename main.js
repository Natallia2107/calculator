const currentNumber = document.querySelector('.currentNumber') //liczba ktora bedziemy wpisywac na ekran
const previousNumber = document.querySelector('.previousNumber p') //liczba na ktorej beda wykonywane działania 
const mathSign = document.querySelector('.mathSign') //znak matematyczny
const numbersButtons = document.querySelectorAll('.number') //liczby 
const operatorsButtons = document.querySelectorAll('.operator') //operatory 
const equalsButton = document.querySelector('.equals') //znak =
const clearButton = document.querySelector('.clear') //przycisk czyszczenia
const calculatorHistory = document.querySelector('.history') //historia
const historyBtn = document.querySelector('.history-btn') //przycisk usuwania historii

let result = '' //zmienna ktora przechowuje wynik

//funkcja wyświetlania numerów + instrukcje warunkowe do , 
function displayNumbers() {
	if (this.textContent === '.' && currentNumber.innerHTML.includes('.')) return
	if (this.textContent === '.' && currentNumber.innerHTML === '') return (currentNumber.innerHTML = '0.')

	currentNumber.innerHTML += this.textContent
}

//funkcja zajmuje sie tym ze jak klikniemy jakis operator to on sie nie pokaze, za wyjątkiem - wtedy robimy liczbe ujemną
function operate() {
	if (currentNumber.innerHTML === '' && this.textContent === '-') {
		currentNumber.innerHTML = '-'
		return
	} else if (currentNumber.innerHTML === '') {
		return
	}
// jesli znak jes rozny od zera to bedzie rownał sie liczbie ktora klikniemy 
	if (mathSign.innerHTML !== '') {
		showResult()
	}
	previousNumber.innerHTML = currentNumber.innerHTML
	mathSign.innerHTML = this.textContent
	currentNumber.innerHTML = ''
}

//funkcja ktora pokazuje rezultaty 
function showResult() {
    //warunek do tego zeby nie mozna było dac 24 =, bo przeciez do działania są potrzebne dwie liczby 
	if (previousNumber.innerHTML === '' || currentNumber.innerHTML === '') return
    //przepisanie długich nazw zmiennnych do krotszych czyli a=currentNumber a b=previousNumber
	let a = Number(currentNumber.innerHTML)
	let b = Number(previousNumber.innerHTML)
	let operator = mathSign.innerHTML
//jesli operator to +,-,etc to result ma byc rowne a+b, a-b, etc 
	switch (operator) {
		case '+':
			result = a + b
			break
		case '-':
			result = b - a
			break
		case '×':
			result = a * b
			break
		case '÷':
			result = b / a
			break
		case 'xʸ':
			result = b ** a
			break
	}

	addToHistory() //wywołanie funkcji dodawania do historii
	historyBtn.classList.add('active')
	currentNumber.innerHTML = result
	previousNumber.innerHTML = ''
	mathSign.innerHTML = ''
}

//funkcja dodaje do historii
function addToHistory() {
	const newHistoryItem = document.createElement('li')
	newHistoryItem.innerHTML = `${previousNumber.innerHTML} ${mathSign.innerHTML} ${currentNumber.innerHTML} = ${result}`
	newHistoryItem.classList.add('history-item')
	calculatorHistory.appendChild(newHistoryItem)
}

//funkcja czysci historie
function clearHistory() {
	calculatorHistory.textContent = ''
	if (calculatorHistory.textContent === '') {
		historyBtn.classList.remove('active')
	}
}

//funkcja czysci pole w ktorym wykonujemy działania
function clearScreen() {
	result = ''
	currentNumber.innerHTML = ''
	previousNumber.innerHTML = ''
	mathSign.innerHTML = ''
}

// nasluchiwanie przyciskow
operatorsButtons.forEach(button => button.addEventListener('click', operate)) 
equalsButton.addEventListener('click', showResult) 
clearButton.addEventListener('click', clearScreen) 
numbersButtons.forEach(button => {
	button.addEventListener('click', displayNumbers) 
})
historyBtn.addEventListener('click', clearHistory) 
