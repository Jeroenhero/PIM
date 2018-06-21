var selected=[];
var buttonValid=false;
var messageVisible = false;

function selectImage(container) {
    var containerName = "container" + container;
    if(selected.includes(container)) {
        document.getElementById(containerName).style.border = '5px double white';
        document.getElementById(containerName).style.padding = '1';
        var index = selected.indexOf(container);
        if (index>-1){
            selected.splice(index,1)
        }
    }
    else {
        document.getElementById(containerName).style.border = '5px double green';
        document.getElementById(containerName).style.padding = '1';
        selected.push(container);

    }
    testButtonValidity();
}
function testButtonValidity(){
    if (selected.length > 0 && buttonValid == false){
        buttonValid = true
        document.getElementById("confirmbutton").style.backgroundColor ='#4CAF50';

    }
    else if( selected.length == 0 && buttonValid == true){
        buttonValid = false
        document.getElementById("confirmbutton").style.backgroundColor ='grey';
    }
    if(messageVisible == true && selected.length > 0) {
        document.getElementById("buttontext").style.visibility = "hidden";
        messageVisible = false;
    }
}

function executeButton() {
    if(selected.length < 1) {
        document.getElementById("buttontext").style.visibility = "visible";
        messageVisible = true;
        return;
    }
    var paintingString = generatePaintingString();
    window.location.href = "route.html?paintings=\42" + paintingString + "\42";
}

function generatePaintingString() {
    var s = "$";
    for(var i = 0; i < selected.length; i ++) {
        s = s + selected[i] + "n"
    }
    s = s + "$";
    return s;
}