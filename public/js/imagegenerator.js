var paintingNumbers = []
var headingPartLocations = []

function startUp() {
    getHeaderPartLocations()
    loadPaintingsFromURL();
    setupHeaderImage(paintingNumbers)

}

function loadPaintingsFromURL() {
    var parameters = location.search.substring(1).split("&");
    var paintings = parameters[0].split("$")[1];
    alert("PaintingsUnparsed: " + paintings);
    var paintingsSplit = paintings.split("n");
    for(var i = 0; i < paintingsSplit.length - 1; i ++) {
        paintingNumbers.push(parseInt(paintingsSplit[i]));
    }
}

function setupHeaderImage() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    base_image = new Image();
    base_image.src = 'rijksmuseumlegenda.png';
    base_image.onload = function(){
        ctx.drawImage(base_image, 0, 0);
        for(var i = 0; i < headingPartLocations.length; i ++) {
            location - headingPartLocations[i];
            if(paintingNumbers.includes(location.id)) {
                ctx.beginPath();
                ctx.arc(location.x, location.y, 13 ,0,2*Math.PI);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.stroke();
            }
        }
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
                var locObj = {id:parseInt(location.id), x: parseInt(location.x), y:parseInt(location.y)};
                headingPartLocations.push(locObj);
            }
        }
    }
    console.log("Parsed " + headingPartLocations.length + " locations!")

}