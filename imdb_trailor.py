import requests
from bs4 import BeautifulSoup

page = requests.get("https://www.imdb.com/india/top-rated-indian-movies/?ref_=nv_mv_250_in")
soup=BeautifulSoup(page.text,'html.parser')
main_div = soup.find('div',class_="lister")
tbody = main_div.find('tbody',class_="lister-list")
trs = tbody.findAll('tr')

movie_list = []
for tr in trs:
	td=tr.find('td',class_='titleColumn').a.text
	movie_list.append(td)

index=1
for i in movie_list:
	print(index,i)
	index+=1

user = int(input('select any movie to watch the trailor :'))
link = trs[user-1].find('td',class_='titleColumn').a['href']
url = "https://imdb.com"+link[0:17]

print(url)

trailor = requests.get(url)
trailor_soup=BeautifulSoup(trailor.text,'html.parser')
mainDiv = trailor_soup.find('div',class_="slate")
video = "https://imdb.com"+mainDiv.a['href']
print(video)
import subprocess
import webbrowser
import sys

webbrowser.open_new_tab(video)