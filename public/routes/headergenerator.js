
var headingPartLocations = []

function setupHeaderImageJustInts(ints) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var base_image = new Image();
    base_image.src = '../images/rijksmuseumlegenda.jpg';
    base_image.onload = function(){
        ctx.drawImage(base_image, 0, 0);
        var locationsToGenerate = ints;

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
    }
}

function startJustHeader(ints) {
    paintings = ints;
    getHeaderPartLocations();
    setupHeaderImageJustInts(ints);
}

function getHeaderPartLocations() {
    var request = new XMLHttpRequest();
    request.open("GET", "../data/buildinglocations.json", true);
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