var express = require("express");
var appFile = require("./games.json");

app = express();


var server=app.listen(3000,function() {
	
	console.log("Listening to Port 3000");
});


/*
	This Logic handles all the apps that contain the word in the title. It also handles the ratings and amount of apps in each category of subgenre that related to the title and also the subgenre.
	The url for the to seach would be http://localhost:3000/search/keyword .
		
*/
app.get('/search/:appsName',function(req,res)
{
	
	appName = req.params.appsName;
	
	
	ratings = []
	categorys = {};
	
	for(var i = 0; i < appFile.length; i++) {
		
		var obj = appFile[i];
		titleResult = obj.title.includes(appName); 
		subgenreResult = obj.subgenre.includes(appName);
		if((titleResult || subgenreResult) && obj.rating>4 && !(obj.subgenre in categorys)){
			categorys[obj.subgenre]=[obj.title];
		}else if((titleResult || subgenreResult) && obj.rating>4 && (obj.subgenre in categorys) && categorys[obj.subgenre].length<5){
			categorys[obj.subgenre].push(obj.title)
		}
	}
	
	console.log(categorys);
	res.send(categorys);
	
});