import requests
from bs4 import BeautifulSoup

team = input('Enter team name: ')
url = f"https://www.mlb.com/{team}/roster/40-man"

response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')
    forty_man_roster = soup.find('div', 'players').find_all('table','roster__table')
    for r in forty_man_roster:
        players = r.find('tbody').find_all('tr')
        for p in players:
            found_player = p.find('td','info').find('a')
            print (found_player.string)