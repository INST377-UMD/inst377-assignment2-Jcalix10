// AUDIO 

function startAudio() {

    if (annyang) {
        // Let's define a command.
        const commands = {
            'hello': () => { alert('Hello world!'); }
        };

        // Add our commands to annyang
        annyang.addCommands(commands);

        // Start listening.
        annyang.start();
    }

}

function stopAudio() {
    annyang.abort()
}

// HOME PAGE JAVASCRIPT

function fetchQuoteAPI() {
    const api_url = "https://zenquotes.io/api/quotes/";
    return api_url
}

async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);

    const randomIndex = Math.floor(Math.random() * data.length);
    const randomQuote = `'${data[randomIndex].q}" - ${data[randomIndex].a}`;

    document.getElementById("quote").innerText = randomQuote;
}

function returnQuoteAPI() {
    return getapi(fetchQuoteAPI());
}

// STOCK PAGE JAVASCRIPYT

// function stockLookup() {

//     const ticker = document.getElementById('ticker').value;
//     const days = document.getElementById('days').value;
// }


// const ctx = document.getElementById('myChart');

// new Chart(ctx, {
//   type: 'line',
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [{
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// });


function fetchStockAPI() {
    return fetch('https://tradestie.com/api/v1/apps/reddit')
        .then((res) => res.json())
}

async function getStockApi() {
    var data = await fetchStockAPI();
    console.log("data", data);

    const stockTable = document.getElementById('tab')

    data.forEach((stock) => {
        const tableRow = document.createElement('tr')
        const stockTicker = document.createElement('td')
        const commentCount = document.createElement('td')
        const sentiment = document.createElement('td')

        stockTicker.innerHTML = stock.ticker;
        commentCount.innerHTML = stock.no_of_comments
        if (stock.sentiment === "Bullish") {
            sentiment.innerHTML = "<img src=bull.jpg>"
        } else if (stock.sentiment === "Bearish") {
            sentiment.innerHTML = "<img src=bear.webp>"
        } else {
            sentiment.innerHTML = stock.sentiment
        }


        tableRow.appendChild(stockTicker)
        tableRow.appendChild(commentCount)
        tableRow.appendChild(sentiment)

        stockTable.appendChild(tableRow)
    })

}

// DOGS PAGE JAVASCRIPT

function fetchDogImages() {
    const imageContainer = document.getElementById("doggo");
    max_Img = 10;
    let imageLoaded = 0;

    for (let i = 0; i < max_Img; i++) {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then((res) => res.json())
            .then((data) => {
                const images = document.createElement("img");
                images.src = data.message;
                imageContainer.appendChild(images);
                imageLoaded++;
                if (imageLoaded === max_Img) {
                    simpleslider.getSlider({ container: imageContainer });
                }
            })
            .catch((error) => console.error("Pictures not Working", error));
    }
}
// PART 2 FOR DOGS PAGE

function fetchBreeds() {
    fetch('https://api.thedogapi.com/v1/breeds')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('dogContainer');
            data.slice(0, 15).forEach(breed => {
                const button = document.createElement('button');
                button.textContent = breed.name;
                button.setAttribute('class', 'breed-button');
                button.addEventListener('click', () => displayBreedInfo(breed));
                container.appendChild(button);
            });
        })
}

function displayBreedInfo(breed) {

    const container = document.getElementById('dogContainer');
    const existingInfo = document.getElementById('breed-info');

    if (existingInfo) {
        existingInfo.remove();
    }

    const breedInfo = document.createElement('div');
    breedInfo.setAttribute('id', 'breed-info');
    breedInfo.innerHTML =
        `<h3>${breed.name}</h3>
        <p><strong>Description:</strong> ${breed.description}</p>
        <p><strong>Min Life Expectancy:</strong> ${breed.life_span.split(' - ')[0]} years</p>
        <p><strong>Max Life Expectancy:</strong> ${breed.life_span.split(' - ')[1] || breed.life_span.split(' - ')[0]} years</p>`;

    container.appendChild(breedInfo);
}

// WINDOW.ONLOADS

window.onload = function () {
    if (document.body.id === "home") {
        returnQuoteAPI();
    }
    if (document.body.id === "stocks") {
        getStockApi();
    }
    if (document.body.id === 'dogs') {
        fetchBreeds();
        fetchDogImages();
    }
}






