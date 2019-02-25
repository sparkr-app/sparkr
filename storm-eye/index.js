
window.onload = init();


function init(){
        //input & submit
    const submit = document.getElementById('submit');
    const input = document.getElementById('input');
    let inputText;
        //tiles
    const low = document.getElementById('low');
    const high = document.getElementById('high');
    const current = document.getElementById('current');
    const hum = document.getElementById('hum');
    const precip= document.getElementById('precip');
        //event listeners
    submit.addEventListener('click', () => {
        inputText = input.value;
        console.log(`User input: ${inputText}.`);
        getWeatherData(`${inputText}`);
    });
}


// getWeatherAW('Baton Rouge');

//     async function getWeatherAW(cityName){
//         //use try catch to handle errors with async
//         const apiKey = '&APPID=f345a11d1bba11c84a92412cb6e71ccf';
//         let city = cityName;
//             //the await version is much cleaner with await statements
//         const result = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}${apiKey}`);
//             //converts into json data
//         const data = await result.json();
//             //gets temp data
//         const curTempK = await data.main.temp;
//             //converts to nearest Farenheit
//         const tempF = await kToF(curTempK);
//             //this will equal the resolved value, because tempF contains an await
//         low.textContent = tempF; 
        
//             //logs data
//         console.log(`The temperature in ${city} is currently ${tempF}º.`);

//     }

async function getWeatherData(cityName){
    const apiKey = '&APPID=f345a11d1bba11c84a92412cb6e71ccf';
    let city = cityName;
    //the await version is much cleaner with await statements
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}${apiKey}`);
    //converts into json data
    const data = await result.json();
    processWeatherData(data);
}

    //receives data, processes synchronously
function processWeatherData(data){
    console.log(data);
        //humidity
    const humidity = data.main.humidity;
    const precipitation = data.weather[0].description;
        //temperature vars
    const curTempK = data.main.temp;
    const highTempK = data.main.temp_max;
    const lowTempK = data.main.temp_min;
        //converts to nearest Farenheit
    const curTemp = kToF(curTempK);
    const highTemp = kToF(highTempK);
    const lowTemp = kToF(lowTempK);
    
        //this will equal the resolved value, because tempF contains an await
        //only input elements can use the .value method
    current.textContent = `${curTemp}º F`; 
    high.textContent = `${highTemp}º F`;
    low.textContent = `${lowTemp}º F`;
        //.text content pulls directly from doc ids.  It will ignore
        //a var assigned with the same name
    hum.textContent = `${humidity}%`;
    precip.textContent = precipitation;
}

    //turns Kelvin temp into Fahreinheit temp
function kToF(kelvinTemp) {
    return Math.round(kelvinTemp * 9 / 5 - 459.67);
}
