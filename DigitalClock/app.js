function app(){
    setInterval(oneSecondFunction, 1000);
};

function oneSecondFunction(){
    var d = new Date();
    var displayString;
    var hours = d.getHours().toString();
    var min = d.getMinutes().toString(); 
    var sec = d.getSeconds().toString();

    //checks if str <10 to make 0X:0X:0X
    if(d.getHours() < 10){
        hours = "0" + d.getHours().toString();
    }
    if(d.getMinutes() < 10){
        min = "0" + d.getMinutes().toString();
    }
    if(d.getSeconds() < 10){
        sec = "0" + d.getSeconds().toString();
    }

    //checks if str = 0 to make 00:00:00
    if(d.getHours() == 0){
        hours = "00";
    }
    if(d.getMinutes() == 0){
        min = "00";
    }
    if(d.getSeconds() == 0){
        sec = "00";
    }

    document.getElementById('hrs1').innerHTML = hours.charAt(0)
    document.getElementById('hrs2').innerHTML = hours.charAt(1)
    document.getElementById('min1').innerHTML = min.charAt(0)
    document.getElementById('min2').innerHTML = min.charAt(1)
    document.getElementById('sec1').innerHTML = sec.charAt(0)
    document.getElementById('sec2').innerHTML = sec.charAt(1)
}

app();


