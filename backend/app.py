from flask import Flask
import requests
import re
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


@app.route("/standings")
def get_standings():
    url = "https://www.mlb.com/standings/mlb"
    
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    table = soup.find('div', class_='StandingsTablestyle__StandingsTableWrapper-sc-1l6jbjt-0 kGMpgP').find('table')

    if response.status_code == 200:
        standings_data = []  
        for row in table.find_all('tr'):
            team_link = row.find('a','StandingsCustomCellstyle__CellLinkWrapper-sc-1c94dhk-6 jnhStu') 
            if team_link:
                team_name = team_link.text.strip()

                wins_cell = row.find_all('td', class_=lambda x: x and 'table-cellstyle__StyledTableCell' in x)[0]  
                losses_cell = row.find_all('td', class_=lambda x: x and 'table-cellstyle__StyledTableCell' in x)[1] 
                percent_cell = row.find_all('td', class_=lambda x: x and 'table-cellstyle__StyledTableCell' in x)[2]  
                las10_cell = row.find_all('td', class_=lambda x: x and 'table-cellstyle__StyledTableCell' in x)[5]  
                w_streak_cell = row.find_all('td', class_=lambda x: x and 'table-cellstyle__StyledTableCell' in x)[6]  


                wins = wins_cell.find('span', attrs={'aria-hidden': 'true'}).text.strip() 
                losses = losses_cell.find('span', attrs={'aria-hidden': 'true'}).text.strip() 
                percent = percent_cell.find('span', attrs={'aria-hidden': 'true'}).text.strip() 
                las10 = las10_cell.find('span', attrs={'aria-hidden': 'true'}).text.strip() 
                w_streak = w_streak_cell.find('span', attrs={'aria-hidden': 'true'}).text.strip() 


                standings_data.append({
                    "team": team_name,
                    "wins": wins,
                    "losses": losses,
                    "percent": percent,
                    "las10": las10,
                    "w_streak": w_streak
                })

    return standings_data
