    // api url
const url = 'https://api.exchangeratesapi.io/latest?base=USD';
    //data contains arrays of currency/exchange rate pairs
const data = [];
    //arrays derived from data
const arrCurrencies = [];
const arrRates = [];

const input = document.querySelector('.input');
    //list container
const ul = document.createElement('ul');
document.getElementById('list-container').appendChild(ul);

//to do:

//create html ul to display data
//add bulm styling

//create function to create html elements for each item in array

//add highlighting for suggestion




window.onload = init();
    //fetch returns an object.
    //the response we get is not JSON but an object with a series of methods 
    //we can use depending on what we want to do with the information

    //executes each .then when the promise is fulfilled
fetch(url)
    .then(response => response.json()) //creates a promise
        //returns .json info (attached to the response object)
    .then(json => createArrays(json));

function init(){
    input.addEventListener('keyup', getInput);
}

function getInput(){
    
        //gets the value of the text, gets match in form of array
    let keys = this.value;
    let matchingArray = searchArray(keys, arrCurrencies);

        //calls function to create matching arrays
    let matchingCurrencies = newMatchesArray(arrCurrencies, matchingArray);
    let matchingRates = newMatchesArray(arrRates, matchingArray);
    console.table(matchingCurrencies);
    console.table(matchingRates);
        //calls createList function
    createList(matchingCurrencies, matchingRates, keys);
}

    //creates data, arrCurrencies, arrRates
function createArrays(json){
    //gets Object.entries, and pushes them into an array of arrays
    data.push(...Object.entries(json.rates));
    //maps either currencies or exchange rates into a new array
    //spreads the array into the parent
    //pushes it into arrCurrencies or arrRates
    arrCurrencies.push(...data.map(element => element[0]));
    arrRates.push(...data.map(element => element[1]));
    console.log(arrCurrencies);
    console.log(arrRates);
}



    //searches array, returns array of matching elements
function searchArray(input, array){
        //creates new RegExp
        //g = flag to make search global, i means ignore case
    let regex = new RegExp(input, 'gi');
        //filters by matching strings
    
        //match can only be used on strings
    let result = array.filter(current => current.match(regex));

        // stores index numbers of match
    let match = [];
    for(i = 0; i < result.length; i++){
        match.push(
            array.indexOf(
                result[i]));
    }
        
        //returns indexes of matches in array
    return match;
}




    //takes an array, and pushes matching items into a new one.
function newMatchesArray(array, match){
    let newArr = [];
        //loops through match array
    for(i = 0; i < match.length; i++){
            //pushes array item at the index into the array
        newArr.push(array[match[i]]);
    }
    return newArr;
}

function createList(array1, array2, input){
    const html = array1.map(item =>{
            //counter (next time, use an object instead of an array, if possible.  It's cleaner)
        const regex = new RegExp(input, 'gi');
        let i = 0;
        let rate = array2[i];
            //replaces part of the currency item with a highlighted version
        let currency = item.replace(regex, `<span class="has-text-info">${input.toUpperCase()}</span>`);
        i++;
        
            //returns each item as an li element
        return `
        <li class = "list-item has-background-light is-size-5">
            <span class="li"> ${currency} <span>
        </li>
        <li class = "list-item is-size-5">
            <span class="li"> 1 USD = ${rate} <span>
        </li>
        `;
        
    }).join(''); //.join gets rid of commas
    
        //sets innerHTML to equal the list dynamically generated above
    ul.innerHTML = html;
}
