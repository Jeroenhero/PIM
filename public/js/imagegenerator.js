var paintingNumbers = []
var headingPartLocations = []
var floorPlanLocations = []
var paintings = []

function startUp() {
    getFloorPlanLocations();
    // getHeaderPartLocations();
    // loadPaintingsFromURL();
    // loadPaintingData();
    // setTimeout(setupHeaderImage(), 1000);
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
    base_image.src = 'images/rijksmuseumlegenda.jpg';
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

function getFloorPlanLocations() {
    var request = new XMLHttpRequest();
    request.open("GET", "data/floorplanlocations.json", true);
    request.send(null);
    request.onreadystatechange = function() {
        if ( request.readyState === 4 && request.status === 200 ) {
            var locations = JSON.parse(request.responseText);
            console.log(locations);
            for(var i = 0; i < locations.length; i ++) {
                var location = locations[i];
                var locObj = {id: parseFloat(location.id), x: parseInt(location.x), y:parseInt(location.y)};
                floorPlanLocations.push(locObj);
            }

            setupPlan();
        }
    }
}

function setupPlan() {
    var canvas = document.getElementById("plattegrond");
    var ctx = canvas.getContext("2d");
    var base_image = new Image();
    base_image.src = 'images/plattegrond.jpg';
    base_image.onload = function(){
        ctx.drawImage(base_image, 0, 0);
        for(var i = 0; i < floorPlanLocations.length; i ++) {
            var location = floorPlanLocations[i];
            ctx.beginPath();
            ctx.arc(location.x, location.y, 10,0,2*Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();
        }

    }
    document.getElementById("page-title").innerHTML = "Jouw persoonlijke route door het Rijksmuseum:";
}