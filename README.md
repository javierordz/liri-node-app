# liri-node-app
LIRI is a "Language Interpretation and Recognition Interface," a command line node app that takes in parameters to interact with and returns data from the APIs of Spotify, OMDB, Bandsintown, and the text file "random.txt". It's as easy as 1-2-3-4!


## **ONE**

In order to appropriately use the Spotify interface, your personal Spotify API key and secret will need to be entered and saved into a ".env" file in the directory where the LIRI repository is downloaded. The file should simply resemble the following:

![Spotify Key](/images/spot-key.png)

## **TWO**

With your command line in the directory where LIRI has been downloaded, begin with the line "node liri.js" (without quotes). You'll be building on this, but it forms the base command for using LIRI.

![Command One](/images/Capture1.PNG)

## **THREE**

Decide what type of information you're seeking, select your option, and find next phrase of the command:

1. *SONG* from Spotify — type "spotify-this-song"

    ![Command Song](/images/Capture2.PNG)

2. *CONCERT* from Bandsintown — type "concert-this"

    ![Command Concert](/images/Capture3.PNG)

3. *MOVIE* from IMDB — type "movie-this"

    ![Command Movie](/images/Capture4.PNG)

## **FOUR**

Finish the command with the search term you're seeking. Capitalization does not matter, nor does putting your command between quotation marks. Just type naturally and watch your spelling... (There's no autocorrect here!)

**NOTE:** Any of the three options from **THREE** and search terms from **FOUR** can be automatically called on command line from the text file "random.txt" by typing "do-what-it-says" in **THREE** and skipping **FOUR** entirely. The only requirement is typing and saving the command in the text file "random.txt":

![Command Do](/images/textfile.PNG)

before executing the final command:

![Command Do](/images/Capture5.PNG)

## **FINAL PRODUCT**

The result should resemble one of the four examples below:

![Command Final1](/images/Capture-spot.PNG)

![Command Final2](/images/Capture-concert.PNG)

![Command Final3](/images/Capture-movie.PNG)

![Command Final4](/images/Capture-do.PNG)

All commands and results are pushed to the file "output.txt" and can be deleted at any time but serve as a slightly-more-permanent backup history of the app use.

Enjoy!