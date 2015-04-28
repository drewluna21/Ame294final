var ENV = {
    device: {
        iOS: null,
        iPhone: null,
        iPad: null,
        android: null,
        mouse: null,
        touch: null
    },
    screen:{
        height:null,
        width:null,
        big: null,
        small: null
    },
    initialize: function(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.indexOf('iphone') >=0 || ua.indexOf('ipad') >=0 ){
            ENV.device.iOS = true;
            if(ua.indexOf('iphone') >=0){
                ENV.device.iPhone = true;
                ENV.device.iPad = false;
            }
            else{
                ENV.device.iPhone = false;
                ENV.device.iPad = true;				
            }

        } 
        else{
            ENV.device.iOS = false;	
            ENV.device.iPhone = false;
            ENV.device.iPad = false;		
        }


        if(ua.indexOf('android') >=0){
            ENV.device.android = true;			
        }
        else{
            ENV.device.android = false;			
        }

        if(ENV.device.iOS || ENV.device.android){
            ENV.device.touch = true;
            ENV.device.mouse = false;
        }
        else{
            ENV.device.touch = false;
            ENV.device.mouse = true;
        }

        if(!ENV.device.android){
            ENV.screen.height = $(window).height();
            ENV.screen.width = $(window).width();
        }
        else{
            ENV.screen.height = window.innerHeight;
            ENV.screen.width = window.innerWidth;
        }
        if(ENV.screen.width > 1100){
            ENV.screen.big = true;
            ENV.screen.small = false;
        }
        else{
            ENV.screen.big = false;
            ENV.screen.small = true;
        }

        var docClassName = "";
        if(ENV.screen.big){
            docClassName = docClassName + " big";
        }
        else{
            docClassName = docClassName + " small";
        }
        if(ENV.device.touch){
            docClassName = docClassName + " touch";
        }
        else{
            docClassName = docClassName + " mouse";
        }

        document.getElementsByTagName("html")[0].className = docClassName;
    }
}

function getXMLHTTPRequest()
{
    var request;
    // Lets try using ActiveX to instantiate the XMLHttpRequest object
    try{
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }catch(ex1){
        try{
            request = new ActiveXObject("Msxml2.XMLHTTP");
        }catch(ex2){
            request = null;
        }
    }

    // If the previous didn't work, lets check if the browser natively support XMLHttpRequest 
    if(!request && typeof XMLHttpRequest != "undefined"){
        //The browser does, so lets instantiate the object
        request = new XMLHttpRequest();
    }

    return request;
}

function loadRSS(url, callback)
{
    var aXMLHttpRequest = getXMLHTTPRequest();
    var allData;

    if (aXMLHttpRequest)
    {
        aXMLHttpRequest.open("GET", url, true);

        aXMLHttpRequest.onreadystatechange = function (aEvt) {
            if(aXMLHttpRequest.readyState == 4){
                allData = aXMLHttpRequest.responseText;
                callback(allData)
            }
        };

        //Lets fire off the request
        aXMLHttpRequest.send(null);
    }
    else
    {
        //Oh no, the XMLHttpRequest object couldn't be instantiated.
        alert("A problem occurred instantiating the XMLHttpRequest object.");
    }
}


var load = function()
{
    ENV.initialize();
    loadRSS("./ex.rss",formatRSS);
}

/*function shareFB()
{
	var FBlist = rssFeed[index]
	var x = listItem.link.attributes.href; 
	window.location.assign( + x)
}*/


function itemSelected(index){
    var listItem = rssFeed[index];
    var outS = "";
    outS = outS + "<h1 id='appTitle'>" + listItem.title.label + "</h1>";
    outS = outS + "<p class= 'image'  style='background-image:url(" + listItem['im:image'][0].label +  ")'>" + "</p>";
    outS = outS + "<i class='price'>" + listItem["im:price"].label + "</i>";
    outS = outS + "<p>" + listItem.summary.label + "</p>";
    var x = listItem.link.attributes.href;
    outS = outS + "<a class='href btnTwo shareFB' href='"+"https://www.facebook.com/sharer/sharer.php?u=" + listItem.link.attributes.href + "'>"+ "<p>" + "Share on Facebook" + "</p>" + "</a>";
    outS = outS + "<a class='href btnTwo shareT' href='" + "https://twitter.com/home?status="+ listItem.link.attributes.href + "'>"+ "<p>" + "Share on Twitter" + "</p>" + "</a>";

    if(ENV.screen.big) {
        document.getElementById("details").style.display = "block"
        document.getElementById("list").style.display = "none";
        outS= outS + "<a class='btnTwo btn-default' href = 'javascript:backTolist()'> Back </a> <br>";
    }

    if(ENV.screen.small) {
        document.getElementById("details").style.display = "block"
        document.getElementById("list").style.display = "none";
        outS= outS + "<a class='btnTwo btn-default' href = 'javascript:backTolist()'> Back </a> <br>";
    }
    document.getElementById("details").innerHTML = outS;
}

function backTolist() {
    document.getElementById("details").style.display = "none";
    document.getElementById("list").style.display = "block";
    document.getElementById("details").innerHTML = "";
}

var rssFeed = [];
function formatRSS(data) {
    rssFeed = JSON.parse(data).feed.entry; 
    var output = "";
    for(var i = 0; i < rssFeed.length; i++) {	
        output = output + "<div class='listItems " + rssFeed[i].category.attributes.label.toLowerCase() + "' onclick='javascript:itemSelected(" + i + ")'>";
        output = output + "<p class='title'>" + rssFeed[i].title.label + "</p>";
        output = output + "<p class= 'image'  style='background-image:url(" + rssFeed[i]['im:image'][0].label +  ")'>" + "</p>";
        output = output + "<p class='price'>" + rssFeed[i]['im:price'].label + "</p>";
        output = output + "<a class='href btn1 btn-default' href='" + rssFeed[i].link.attributes.href + "'>Buy Now!</a>";
        output = output + "<hr>";
        output = output + "</div>";
    }
    document.getElementById('list').innerHTML = output;
}


function catChanged() {
    var category = $.map($("#catSel").toArray(), function(e){
        return $(e).val().toLowerCase();
    });
    // does the same as above
    //var category = document.getElementById("catSel").value.toLowerCase();
    
    if (category == "all") {
    
        $("#list div.listItems").slideDown();
       
    }
    else
    {
    $("#list div.listItems").slideUp();
    $("." + category ).slideDown();
    }
}
