
/**
 * Module dependencies.
 *
 * @description 
 * simple scrapper based of pure JS using cheerio and NodeJs .
 * 
 * @review   
 * @date 04-jan-2017
 * 
 */
var express = require('express');
var http = require('http');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var app = express();

strings = [];// to hold src of all fetched images

app.get('/App1', function (req, res){
    url = 'https://www.behance.net/search?content=projects&sort=appreciations&time=week&location_id=16173236-en&country=IN&city=New%20Delhi'; //request to most antisipated images in New Delhi from behance.net
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            
            //query to select required images from website and leave other
            $('div img.cover-img-el').each(function () {
                var url = $(this).attr('src');
                strings.push(url);
            });
            
            //below is function to render src of the fetched img.
            res.writeHead(200, { "Content-Type": "text/plain" })
            res.write('Here is soruce attribute of all the fetched images');
            var i = 0;
            while (i<strings.length) {
                res.write('\n'+ strings[i] );
                i++;
            }
       
               res.end();
            
           
             console.log(strings.length);  //logs out no. of images out request to behance fetched
         
        } 
    })

})

// all environments
app.set('port', process.env.PORT || 3000);


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});