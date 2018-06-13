
function setupHeaderImage() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    base_image = new Image();
    base_image.src = 'rijksmuseumlegenda.png';
    base_image.onload = function(){
        ctx.drawImage(base_image, 0, 0);
        ctx.beginPath();
        ctx.arc(450,303,13,0,2*Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
    }
}