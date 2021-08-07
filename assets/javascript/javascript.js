//test code still in progress feel free to edit.



var issueContainer = document.getElementById('holder');
var fetchButton = document.getElementById('fetch-button');

function getApi() {
    var url = "https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=series&genre=18&page=10&language=en";

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "f81022f835mshbf99f2d4bc03aacp1f2861jsn4e89257474b6",
            "x-rapidapi-host": "streaming-availability.p.rapidapi.com",


        }

    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            for (var i = 0; i < data.results.length; i++) {
                cardGenerator(data.results[i])
            }
            /*REMOVE LATER
                        for (var i = 0; i < data.results.length; i++) {
                            var title = document.createElement('h3');
                            var released = document.createElement('p');
                            var thumbImage = document.createElement('img');
                            title.textContent = data.results.length.title;
                            released.textContent = data.results[i].firstAirYear;
                            thumbImage.src = data.results[i].posterURLs[92];
                            issueContainer.append(title);
                            issueContainer.append(released);
                            issueContainer.append(thumbImage);
                        }
                        */





        });

}

fetchButton.addEventListener('click', getApi);



//Info Area Generator
/*REMOVE IF WORKING
function generateInfoDisplayArea(movieInfoArray) {
    for (var i = 0; i < streamingObject.length; i++) {
        cardGenerator(streamingObject[i])
    }
}
*/


//Card Generator
function cardGenerator(movieObj) {
    console.log(movieObj);
    //Setting up variables based on incoming Object Data
    var movieTitle = movieObj.title
    var moviePlot = movieObj.overview
    var movieYear = movieObj.year
    var moviePoster = movieObj.posterURLs.original;
    //var movieCast = movieObj.cast
    //var moviePosterThumb = movieObj.posterURLs["92"]

    //Since there are multiple streaing option this lists them all with links
    var stream = movieObj.streamingInfo
    var streamInfo = ""
    for (var i = 0; i < Object.keys(stream).length; i++) {
        var service = Object.keys(stream)[i];

        var streamLink = stream[Object.keys(stream)[i]].us.link;
        var streamInfoItem = `<a href="${streamLink}"><button class="serviceButton">${service}</button></a>`;

        streamInfo = streamInfo + streamInfoItem;
    }
    var displayCard = `<div class="card"><h2 class="title">${movieTitle}</h2><img src="${moviePoster}"><h3>${movieYear}</h3><p>${moviePlot}</p><p>${streamInfo}</p></div>`
    $(".card-area").append(displayCard);
}