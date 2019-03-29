	// importing the node modules 
var request = require('request-promise');
var cheerio = require('cheerio');
var fs = require('fs')

	//calling/reuest the url and stored in a variable.
var scrapeTopList=request("https://www.imdb.com/india/top-rated-indian-movies/?ref_=nv_mv_250_in");
scrapeTopList.then((response)=>{
    let $ = cheerio.load(response);
    	// creating variables of request promise of diff classes
    
    let link = $(".titleColumn")
    var rating = $(".ratingColumn").text().trim().split('\n');
    let tds = $(".titleColumn").text().split('\n')

    var top_movies = []
    var url_list = []
    	// to find the links of the pages(movies)
    link.find('a').each((index,element)=>{
    	url_list.push('https://imdb.com'+$(element).attr('href').slice(0,17))
    })

    	// finding all the data required for the task
    var x=0;
    var l=0;
    for(var i=1; i<tds.length; i+=4){
    	var movies ={}
    		//movie rank---
    	movies['rank']=tds[i].slice(0,-1).trim()
    		//movie name---
    	movies['name']=tds[i+1].trim()
    		//movie year
    	movies['year']=tds[i+2].trim().slice(1,-1)
    		//movie ratings
    	for(var j=x; j<rating.length; j++){
    		x=j
	    	if(rating[j].includes('.')){
	    		movies['rating']=rating[j].trim()
	    		x=j+1
	    		break;
	    		}
    		}
    		//movie url
    	for(var u=l; u<url_list.length; u++){
    		movies["url"]=url_list[u]
    		l=u+1
    		break;
    	}

    		// adding the dict to the top movie list 
    	top_movies.push(movies)
            }
    //catching the top_movies into json file
    fs.writeFileSync('task1.json',JSON.stringify(top_movies,null,2));
   // console.log(top_movies)
});
var top_movies = fs.readFileSync(__dirname+'/task1.json')
var top_movies = JSON.parse(top_movies)

// task2

var date_list = []
	for (var i of top_movies){
		if(!date_list.includes(i.year)){
			date_list.push(i.year)
		}
	}
function task2(){
	
	var data_by_year={}
	for (var year of date_list){
		var data=[]
		for(var i of top_movies){
			if(i.year == year){
				data.push(i)
			}
		}
		data_by_year[year]=data
	}
	return data_by_year	
}

// console.log(task2())

// task3 

var group_by_decade = {}
var min_year = Math.min(...date_list)
var max_year = Math.max(...date_list)
if(min_year%10!=0){
	var firstYear=min_year-min_year%10
}
for (var i=firstYear; i<max_year+10; i+=10){
	var data = []
	for(var j of top_movies){
		if (j.year>=i && j.year<i+10){
			data.push(j)
		}
	}
	group_by_decade[i]=data
}
console.log(group_by_decade)