
//fetch method - used to call an api(make an api call)
//fetch return promise, so use await
//q : query parameter

// get query selectors
let temperatureField = document.querySelector('.temp');
let cityField = document.querySelector('.time_location p');
let dateField = document.querySelector('.time_location span');
let emojiField = document.querySelector('.weather_condition img');
let weatherField = document.querySelector('.weather_condition span');
let searchField = document.querySelector('.searchField');
let formElement = document.querySelector('form');

const target = 'hyderabad';

async function fetchData(target){
    try {
        let url = `https://api.weatherapi.com/v1/current.json?key=339e96365e76443785a120219241606&q=${target}&aqi=no`;
        //fetch the data
        const response = await fetch(url); // await so that fetch can be completed
        const data = await response.json();
        //console.log('Response Object', response);
        console.log('Response JSON', data);
        
        //get data from json
        let currenttemp = data.current.temp_c;
        let currentCondition = data.current.condition.text;
        const locationName = data.location.name;
        const localTime = data.location.localtime;
        const conditionEmoji = data.current.condition.icon;

        //console.log(currenttemp, currentCondition, locationName, localTime, conditionEmoji);
        
        // add event to form
        formElement.addEventListener('submit', search);
        updateDOM(currenttemp, locationName, localTime, currentCondition, conditionEmoji)

        //get the search data and call the function
        function search(ev){
            ev.preventDefault(); // to avoid refreshing the page
            const target = searchField.value;
            fetchData(target);
        }

        //update the DOM
        function updateDOM(temp, locationName, time, condition, emoji){
            temperatureField.innerText = temp;
            cityField.innerText = locationName;
           
            const exactDate = time.split(' ')[0]; //split the date by space
            const exactTime = time.split(' ')[1];
            
            //get day from date
            const exactDay = getDayName(new Date(exactDate).getDay()); 
            dateField.innerText = `${exactTime} - ${exactDay} ${exactDate}`;
            //console.log('[emoji]', emoji)
           // console.log('[emoji field]', emojiField)
            emojiField.src = `https:${emoji}`;
            weatherField.innerText = condition;
        }

        
    } catch (error) {
        console.log(error);
    }
}



function getDayName(num){
    switch (num){
            case 0:
            return 'Sun'
            case 1:
            return 'Mon'
            case 2:
            return 'Tue'
            case 3:
            return 'Wed'
            case 4:
            return 'Thu'
            case 5:
            return 'Fri'
            case 6:
            return 'Sat'
            default:
            return '';

    }
}

fetchData(target);