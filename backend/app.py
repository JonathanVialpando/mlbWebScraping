from flask import Flask
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<h1> Hllo,"

@app.route("/roster/<team>") 
def get_roster(team):
    url = f"https://www.mlb.com/{team}/roster/40-man"

    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        forty_man_roster = soup.find('div', 'players').find_all('table','roster__table')
        team_roster = []
        for r in forty_man_roster:
            players = r.find('tbody').find_all('tr')
            for p in players:
                found_player = p.find('td','info').find('a')
                team_roster.append(found_player.string)
        return f"<h1>{team_roster} <h1>"
