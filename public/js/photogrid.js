var selected=[];
var buttonValid=false;
var messageVisible = false;

// Highlight a box once it's selected and add the category to the selected list
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
//If the button should be clickable, make it green. If not, make it gray!
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
        // Hide the text which will show when attempting to press the button but it's not clickable.
        document.getElementById("buttontext").style.visibility = "hidden";
        messageVisible = false;
    }
}

// If the button is clickable, redirect the person to the route generation page!
function executeButton() {
    if(selected.length < 1) {
        document.getElementById("buttontext").style.visibility = "visible";
        messageVisible = true;
        return;
    }
    var paintingString = generatePaintingString();
    window.location.href = "route.html?paintings=\42" + paintingString + "\42";
}

// Generate the string containing the category data for the URL.
function generatePaintingString() {
    var s = "$";
    for(var i = 0; i < selected.length; i ++) {
        s = s + selected[i] + "n"
    }
    s = s + "$";
    return s;
}