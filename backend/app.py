from flask import Flask
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def hello_world():
    return "<h1> Hello, World</h1>"

@app.route("/roster/<team>") 
def get_roster(team):
    url = f"https://www.mlb.com/{team}/roster/40-man"
    print(url)

    response = requests.get(url)
    print(response)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        forty_man_roster = soup.find('div', 'players').find_all('table','roster__table')
        team_roster = []
        print(team)
        for roster in forty_man_roster:
            players = roster.find('tbody').find_all('tr')
            for player in players:
                found_player = player.find('td', 'info').find('a').text.strip()
                found_bat_throw = player.find('td', 'bat-throw').text.strip()
                found_ht = player.find('td', 'height').text.strip()
                found_wt = player.find('td', 'weight').text.strip()
                found_dob = player.find('td', 'birthday').text.strip()
                team_roster.append({
                    "name": found_player,
                    "bat_throw": found_bat_throw,
                    "height": found_ht,
                    "weight": found_wt,
                    "birthday": found_dob
                })
        return team_roster


@app.route("/roster/<team>") 
def get_standings():
    url = "https://www.mlb.com/standings/mlb?tableType=regularSeasonStandard"
    print(url)

    response = requests.get(url)
    print(response)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')