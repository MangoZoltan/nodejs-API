
function sendPost(){
    const data =
    document.getElementById("rendszam").value + "|" +
    document.getElementById("tulaj").value    + "|" +
    document.getElementById("tipus").value    + "|" +
    document.getElementById("modell").value   + "|" +
    document.getElementById("evjarat").value  + "|" +
    document.getElementById("muszaki").value;
    
    console.log(data);
    navigator.sendBeacon('http://localhost:3000/addcar/'+ data);
    console.log(data);
    }
