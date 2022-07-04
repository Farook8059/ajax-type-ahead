// !Empty array to put city in it...

const cities = [];

fetch(endpoint)

    .then(blob => blob.json())

    //.then(data => cities = data) -- to use this code we have to first change variable from const to let...

    // .then(data => cities.push(data))  ---> this will cause nested array. because when we run the code it then it calculate it as a separate item in array and that's when it gets items gets array nested.

    .then(data => cities.push(...data))  //spread operator is used for when we push the items don't get into the nested and items are not considered as a seperate item.


//function when someone search then array gets filtered.

//wordToMatch --- sending a word to match 
//cities -- its an array in which in needs to be filtered.because we want to pass the word in cities to match it.

function findMatches(wordToMatch, cities) {

    return cities.filter(place => {

        //here we need to figure out if the city or state matches what was searched.

        const regex = new RegExp(wordToMatch, 'gi')  // g -> is global it will seacrch in entire string.
        // i -> insensitive it will match upper and lower case words.

        // || -> 'or

        return place.city.match(regex) || place.state.match(regex)  // /wordToMatch/i---this format will only match the word we manually enter in it.but we dynamically that's why we need RegExp() method to do so.

    })

}



//display comma btw the numbers of population-->
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}



//display function-->

const serachInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

function displayMatches() {

    // console.log(this.value);

    const matchArray = findMatches(this.value, cities);
    // console.log(matchArray);

    const html = matchArray.map(place => {

        //use to make the match word highlighted.
        //fint the wordToMatch
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);

        return `
        <li>
        <span class="name">${cityName},${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `;

    }).join('');    //map will return in a array so join method is used to convert array into one big string...

    suggestions.innerHTML = html;

}

serachInput.addEventListener('change', displayMatches);
serachInput.addEventListener('keyup', displayMatches);

