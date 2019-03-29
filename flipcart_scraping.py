import requests
from bs4 import BeautifulSoup
import pprint
for i in range(1,11):
	page=requests.get("https://www.flipkart.com/search?q=mobiles&as=on&as-show=on&otracker=AS_Query_TrendingAutoSuggest_1_0&otracker1=AS_Query_TrendingAutoSuggest_1_0&as-pos=1&as-type=TRENDING&page="+str(i))
	soup=BeautifulSoup(page.text,'html.parser')
	main_div=soup.findAll('div',class_="_1UoZlX")


	all_detail_list=[]


	for i in main_div:
		detail_dict={}
		dictionary={}
		name_div=i.find('div',class_='_1-2Iqu row')

	#finding the name of the mobiles
		name=name_div.find('div',class_='_3wU53n').text
		dictionary['mobile_name']=name
		# all_detail_list.append(dictionary)

	#finding the price of the phone
		price=name_div.find('div',class_='_1vC4OE _2rQ-NK').text
		dictionary['price']=price
		# all_detail_list.append(dictionary)

		detail_div=name_div.findAll('li',class_='tVe95H')
	# finnding the storage of phone
		if len(detail_div)>0:	
			storage=detail_div[0].text
			dictionary['storage']=storage

	#finding the dimention of the phone
		if len(detail_div)>1:
			dimention=detail_div[1].text
			dictionary['dimention']=dimention

	#finding the camera specification of the phone
		if len(detail_div)>2:	
			camera=detail_div[2].text
			dictionary['camera']=camera

	#finding the Battery quality of the phone
		if len(detail_div)>3:
			battery=detail_div[3].text
			dictionary['battery']=battery

	#finding the processor of the phone
		if len(detail_div)>4:
			processor=detail_div[4].text
			dictionary['processor']=processor

	# finding the warrenty detail of the phone
		if len(detail_div)>5:
			warrenty=detail_div[5].text
			dictionary['warrenty']=warrenty
		detail_dict[name]=dictionary



		all_detail_list.append(detail_dict)
pprint.pprint(all_detail_list)
