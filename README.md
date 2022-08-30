# The Soccer App

## Getting Started
After cloning this repo in to your machine, navigate to the root directory and run
```
npm install
```
to install the packages. 
However, if any packages can not be installed due to version mismatched, you may try install them one by one and put the flag

```
--legacy-peer-deps
```

on the ones with the issue.

## About the app
The soccer app is a responsive web application built up with a few modern front-end frameworks such as React JS and Material UI. On top of that, it also incoprates Google Firebase for authentication and database as well. The app is mainly about displaying soccer data of 5 major leagues in the world. Not only you can see the standings and weekly matches on the homepage, but also the stats and info about a particular team by simply clicking on the team name.
<img src="https://raw.githubusercontent.com/sarunx93/soccer_app/main/public/home.png"/>

After clicking a teame you will be shown with the team stats on the left, and goals by minutes or most-used formation, based on your click, on the right.

<img src="https://raw.githubusercontent.com/sarunx93/soccer_app/main/public/stats.png"/>
<img src="https://raw.githubusercontent.com/sarunx93/soccer_app/main/public/bar.png"/>
<img src="https://raw.githubusercontent.com/sarunx93/soccer_app/main/public/formation.png"/>

Finally, in a team page, you can add your favourite teams to your watch list and make sure you don't miss out by simply clicking the add button. Google Firebase is responsible for storing you precious watch list.
