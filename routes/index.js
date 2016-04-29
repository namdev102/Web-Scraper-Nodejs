var express = require('express');
var fs = require('fs');
var request = require('request').defaults({proxy:'http://ipg_2012102:namdev102forever@192.168.1.107:3128/', agent:false});
var cheerio = require('cheerio');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/scrape',function(req,res){
	url = 'http://www.imdb.com/title/tt1229340/';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            // console.log($.html());
            var title, release, rating;
            var json = { title : "", release : "", rating : ""};
            var htag=[];
            // We'll use the unique header class as a starting point.
            $('.news_item odd').filter(function(){
            // console.log("A");

           // Let's store the data we filter into a variable so we can easily see what's going on.

                var data = $(this);

           // In examining the DOM we notice that the title rests within the first child element of the header tag. 
           // Utilizing jQuery we can easily navigate and get the text by writing the following code:

                title = data.children().first().text();
                console.log(title);
           // Once we have our title, we'll store it to the our json object.

                json.title = title;
                res.send(title);
            })
        }
    })
    // res.send('fsg');
});

module.exports = router;
