import requests
from bs4 import BeautifulSoup
page = requests.get("https://gaana.com/playlist/gaana-dj-bollywood-top-50-1")
soup = BeautifulSoup(page.text, 'html.parser')

main_div = soup.find('div',class_='s_c')
listAll = main_div.findAll('ul',class_='')

song_list = []
for i in listAll:
	name = i.find('div',class_="playlist_thumb_det").a.text
	song_list.append(name)

index = 0
for i in song_list:
	print(index,i)
	index+=1

#find the url of the song(which will selected by the user)
user = int(input("select one song to play :"))
url = listAll[user].find('div',class_="playlist_thumb_det").a["href"]

#open it on browser 
import webbrowser

webbrowser.open_new_tab(url)