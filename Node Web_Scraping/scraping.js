var request = require('request-promise');
var cheerio = require('cheerio');

var scrapeTopList = request("https://www.imdb.com/india/top-rated-indian-movies/?ref_=nv_mv_250_in");
scrapeTopList.then((response)=>{
	let $ = cheerio.load(response);

	let tds = $('.titleColumn').text().split('\n')
	let rating = $(".ratingColumn").text().trim().split('\n')
	let link = $(".titleColumn")

	var top_movies =[]
	var url_list = []

		// to find the url of the page(movie)
	link.find('a').each((index,element)=>{
		url_list.push('https://imdb.com'+$(element).attr('href').slice(0,17))
	})
	

	var x=0;
	var l=0;
	for (var i=1; i<tds.length; i+=4){
		var movies = {}
			// movies rank
		movies['rank'] = tds[i].slice(0,-1).trim()
			// movies name 
		movies['name'] = tds[i+1].trim()
			// movies year 
		movies['year'] = tds[i+2].trim().slice(1,-1)
			// movies ratings
		for (var j=x; j<rating.length; j++){
			x=j
			if(rating[j].includes('.')){
				movies['rating'] = rating[j].trim()
				x = j+1
				break;
			}
		}
			//movie url
		for(var u=l; u<url_list.length; u++){
			movies['url'] = url_list[u]
			l=u+1
			break;
		}


		top_movies.push(movies)
	}
	console.log(top_movies)

})