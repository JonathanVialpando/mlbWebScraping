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
                found_player = player.find('td','info').find('a')
                found_bat = player.find('td', 'bat-throw')
                team_roster.append(found_player.string)
        return team_roster
