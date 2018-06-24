var paintingNumbers = []
var headingPartLocations = []
var paintings = []

function startUp() {
    getHeaderPartLocations();
    loadPaintingsFromURL();
    loadPaintingData();
    setTimeout(setupHeaderImage(), 1000);
}

function loadPaintingData() {
    var request = new XMLHttpRequest();
    request.open("GET", "data/paintings.json", true);
    request.send(null);
    request.onreadystatechange = function() {
        if ( request.readyState === 4 && request.status === 200 ) {
            var paintingsUnparsed = JSON.parse(request.responseText);
            console.log(paintingsUnparsed);
            for(var i = 0; i < paintingsUnparsed.length; i ++) {
                paintings.push(paintingsUnparsed[i])
            }
        }
    }
}

function loadPaintingsFromURL() {
    var parameters = location.search.substring(1).split("&");
    var paintings = parameters[0].split("$")[1];
    var paintingsSplit = paintings.split("n");
    for(var i = 0; i < paintingsSplit.length - 1; i ++) {
        paintingNumbers.push(parseInt(paintingsSplit[i]));
    }
}

function setupHeaderImage() {

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var base_image = new Image();
    base_image.src = 'images/rijksmuseumlegenda.png';
    base_image.onload = function(){
        ctx.drawImage(base_image, 0, 0);
        var locationsToGenerate = [];

        for(var i = 0; i < paintings.length; i ++) {
            var painting = paintings[i];
            var id = parseInt(painting.id);
            if(paintingNumbers.includes(id)) {
                for(var l = 0; l < painting.buildinglocs.length; l ++) {
                    if(!locationsToGenerate.includes(painting.buildinglocs[l])){
                        locationsToGenerate.push(painting.buildinglocs[l]);
                    }
                }
            }
        }

        for(var i = 0; i < headingPartLocations.length + 0; i ++) {
            var location = headingPartLocations[i];
            if(locationsToGenerate.includes(location.id)) {
                console.log(location.id);
                ctx.beginPath();
                ctx.arc(location.x, location.y, 13 ,0,2*Math.PI);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.stroke();
            }
        }
        setupPlan();
    }
}

function getHeaderPartLocations() {
    var request = new XMLHttpRequest();
    request.open("GET", "data/buildinglocations.json", true);
    request.send(null);
    request.onreadystatechange = function() {
        if ( request.readyState === 4 && request.status === 200 ) {
            var locations = JSON.parse(request.responseText);
            console.log(locations);
            for(var i = 0; i < locations.length; i ++) {
                var location = locations[i];
                var locObj = {id: parseInt(location.id), x: parseInt(location.x), y:parseInt(location.y)};
                headingPartLocations.push(locObj);
            }
        }
    }
}

function setupPlan() {
    var canvas = document.getElementById("plattegrond");
    var ctx = canvas.getContext("2d");
    var base_image = new Image();
    base_image.src = 'images/plattegrond2.jpg';
    base_image.onload = function(){
        ctx.drawImage(base_image, 0, 0);
    }
    document.getElementById("page-title").innerHTML = "Jouw persoonlijke route door het Rijksmuseum:";
}