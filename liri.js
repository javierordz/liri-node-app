require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");

// VARIABLES
var spotify = new Spotify(keys.spotify);
var operation = process.argv[2];
var term = process.argv.slice(3).toString().replace(",", " ");

// SEARCH FUNCTION
function termSearch(operation, term) {

    var newURL = "";
    var separator = "";
    var output = "";

    // BANDS IN TOWN
    if (operation == "concert-this") {
        newURL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";
        axios.get(newURL).then(
            function (response) {
                for (var i = 0; i < (term.length + 9); i++) {
                    separator += "="
                }

                output += "\n" + separator + "\n" + term.toUpperCase() + " CONCERTS\n" + separator;
                for (var i = 0; i < response.data.length; i++) {
                    var location = ""
                    if (response.data[i].venue.region == "") {
                        location = response.data[i].venue.country;
                    }
                    else {
                        location = response.data[i].venue.region;
                    }
                    output += "\nVenue: " + response.data[i].venue.name + " // " + response.data[i].venue.city + ", " + location;
                    output += "\nDate: " + moment(response.data[i].datetime).format("dddd, MM/DD/YYYY") + "\n------------------";
                }
                writeFile(output);
            }
        ).catch((err)=>console.log(err))
    }

    // SPOTIFY
    else if (operation == "spotify-this-song") {
        if (term == "") {
            term = "The Sign";
        }

        spotify.search({ type: "track", query: term }, function (err, data) {
            if (err) {
                return console.log("Error occurred: " + err);
            }

            output += "\n=========\nSONG INFO\n=========";
            output += "\nTrack: " + data.tracks.items[0].name + "\nArtist: " + data.tracks.items[0].artists[0].name;
            output += "\nAlbum: " + data.tracks.items[0].album.name + "\nPreview @ " + data.tracks.items[0].preview_url;
            
            writeFile(output);
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
                for (var i = 0; i < (response.data.Title.length + 7); i++) {
                    separator += "=";
                }

                output += "\n" + separator + "\n" + response.data.Title.toUpperCase() + " (" + response.data.Year + ")\n" + separator;
                output += "\nIMDB: " + response.data.imdbRating + "\nRT:   " + response.data.Metascore;
                output += "\n(" + response.data.Country + ", " + response.data.Language + ")\nSynopsis: " + response.data.Plot + "\nStarring: " + response.data.Actors;

                writeFile(output);
            }
        ).catch((err)=>console.log(err))
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

function writeFile (output) {
    console.log(output);
    fs.appendFile('output.txt', "> > > INPUT: " + process.argv[2] + " " + process.argv.slice(3).toString().replace(",", " "), (err)=>{if(err){throw err}})
    fs.appendFile('output.txt', "\n" + output + "\n\n", (err)=>{if(err){throw err}})
}

termSearch(operation, term);