require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var operation = process.argv[2];
var term = process.argv.slice(3).toString().replace(",", " ");

function termSearch(operation, term) {

    var newURL = "";
    var separator = "";
    
    // BANDS IN TOWN
    if (operation == "concert-this") {
        newURL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";
        axios.get(newURL).then(
            function (response) {
                for (var i = 0; i < (term.length + 9); i++ ) {
                    separator += "="
                }

                console.log("\n" + separator);
                console.log(term.toUpperCase() + " CONCERTS");
                console.log(separator);
                for (var i = 0; i < response.data.length; i++) {
                    var location = ""
                    if (response.data[i].venue.region == "") {
                        location = response.data[i].venue.country;
                    }
                    else {
                        location = response.data[i].venue.region;
                    }

                    console.log("\n------------------\n");
                    console.log("Venue: " + response.data[i].venue.name + " // " + response.data[i].venue.city + ", " + location);
                    console.log("Date: " + moment(response.data[i].datetime).format("dddd, MM/DD/YYYY"));
                }
            }
        );
    }

    // SPOTIFY
    else if (operation == "spotify-this-song") {
        if (term == "") {
            term = "The Sign";
        }

        spotify.search({ type: "track", query: term}, function (err, data) {
            if (err) {
                return console.log("Error occurred: " + err);
            }
            console.log("\n=========");
            console.log("SONG INFO");
            console.log("=========");
            console.log("Track: " + data.tracks.items[0].name);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview @ " + data.tracks.items[0].preview_url);
        })
    }

    // OMDB
    else if (operation == "movie-this") {
        if (term == "") {
            term = "Mr.Nobody";
        }

        newURL = "https://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";
        axios.get(newURL).then(
            function (response) {
                for (var i = 0; i < (response.data.Title.length + 7); i++ ) {
                    separator += "="
                }

                console.log("\n" + separator);
                console.log(response.data.Title.toUpperCase() + " (" + response.data.Year + ")");
                console.log(separator);
                console.log("IMDB: " + response.data.imdbRating);
                console.log("RT:   " + response.data.Metascore);
                console.log("(" + response.data.Country + ", " + response.data.Language + ")");
                console.log("Synopsis: " + response.data.Plot);
                console.log("Starring: " + response.data.Actors);
            }
        );
    }

    // DO WHAT IT SAYS
    else if (operation === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var dataArr = data.split(",");
            termSearch(dataArr[0], dataArr[1]);
        });
    }
}

termSearch(operation, term);
