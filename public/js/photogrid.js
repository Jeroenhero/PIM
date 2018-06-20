var selected=[];
var buttonValid=false;

function selectImage(container) {
    var containerName = "container" + container;
    if(selected.includes(container)) {
        document.getElementById(containerName).style.border = '0';
        document.getElementById(containerName).style.padding = '0';
        var index = selected.indexOf(container);
        if (index>-1){
            selected.splice(index,1)
        }
    }
    else {
        document.getElementById(containerName).style.border = '5px solid #021a40';
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
}
