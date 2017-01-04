var casper=require('casper').create()

casper.start('https://asidtucson.org/find-a-designer/asid/showall/');

casper.then(function(){
    this.evaluate(function() {
     jQuery('.f_listing').trigger('mouseover');

      });

});
var text="xx";
var ccc="";
casper.then(function(){	
		   this.evaluate(function() {
		   	text=jQuery('#f22213').attr('aria-describedby');
		   		ccc=jQuery('#f22213').attr('class');
		   });
		casper.capture('test.png');
}) ;

casper.run(function(){
	console.log("text attr"+text+".."+ccc);	
   casper.done();
});