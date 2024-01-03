const input = document.querySelector('.input');

let inputNumbers = [];

input.addEventListener("input", (event) => {
       
    if(event.inputType !== 'insertText') return;
    
    const value = event.target.value;
    
    const lastInput = value[value.length - 1];

    if(isNaN(lastInput)) return event.target.value = value.slice(0, value.length - 1);

    treatInputNumbers({ lastInput, value });

    const totalValue =  calcTotalValue({ inputNumbers });
    
    const formatedValue = totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    event.target.value = formatedValue;
    
    
})

input.addEventListener("keydown", (event) => {

    if (event.key === 'Delete' || event.key === 'Backspace') {

        setTimeout(() => {

            treatInputNumbers({ value: input.value });

        }, 10)
        
    }

})


function calcTotalValue({ inputNumbers }) {
    
    return parseFloat(inputFormater(inputNumbers))

}

function inputFormater(inputNumbers) {

    const inputLength = inputNumbers.length;

    if(inputLength < 3 || (inputNumbers[0] === '0' && inputNumbers[2] === '0')) {
        
        const inputNumbersWithNoZero = inputNumbers.filter(number => number !== '0');
        
        const twoFirstNumbers = {
            first: inputNumbersWithNoZero[0],
            second: inputNumbersWithNoZero[1] ? inputNumbersWithNoZero[1] : '0',
        };

        return `0.${twoFirstNumbers.first}${twoFirstNumbers.second}`;

    }


    const firstPartSliceLimit = inputLength >= 3 ? 2 : inputLength === 2 ? 1 : 0;

    const twoLastNumbers = {
        last: inputLength < 3 ? '0' : inputNumbers[inputLength - 1],
        second_to_last: inputLength < 2 ? '0' : inputLength === 2 ? inputNumbers[inputLength - 1] : inputNumbers[inputLength - 2],
    };
    

    return `${inputNumbers.join('').slice(0, inputLength - firstPartSliceLimit)}.${twoLastNumbers.second_to_last}${twoLastNumbers.last}`;

}

function treatInputNumbers( { lastInput, value } ) {
    
    if(value.indexOf(',') !== -1 || !lastInput) {

        inputNumbers = value.replace(/[^0-9]/g, '').split('');

        return;

    }
    
    if(lastInput || lastInput === '0') inputNumbers.push(lastInput);

}