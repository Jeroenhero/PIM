function test() {
    var numbers = [1,2,3,5,4,6,8,9,11];
    setupHeaderImage(numbers)
}

function setupHeaderImage(numbers) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    base_image = new Image();
    base_image.src = 'rijksmuseumlegenda.png';
    base_image.onload = function(){
        ctx.drawImage(base_image, 0, 0);
        for(i = 0; i < numbers.length; i++) {
            var location = getHeaderPartLocation(numbers[i])
            ctx.beginPath();
            ctx.arc(location.x, location.y, 13 ,0,2*Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();
        }
    }
}

function getHeaderPartLocation(number) {
    if(number == 1) {
        var location = {x: 443, y: 253}
        return location;
    }
    if(number == 2) {
        var location = {x: 443, y: 303}
        return location;
    }
    if(number == 3) {
        var location = {x: 443, y: 348}
        return location;
    }
    if(number == 4) {
        var location = {x: 443, y: 380}
        return location;
    }
    if(number == 5) {
        var location = {x: 559, y: 226}
        return location;
    }
    if(number == 6) {
        var location = {x: 651, y: 303}
        return location;
    }
    if(number == 7) {
        var location = {x: 743, y: 226}
        return location;
    }
    if(number == 8) {
        var location = {x: 858, y: 253}
        return location;
    }
    if(number == 9) {
        var location = {x: 858, y: 303}
        return location;
    }
    if(number == 10) {
        var location = {x: 858, y: 346}
        return location;
    }
    if(number == 11) {
        var location = {x: 858, y: 378}
        return location;
    }
    else {
        var location = {x: 10000, y: 30000}
        return location;
    }
}