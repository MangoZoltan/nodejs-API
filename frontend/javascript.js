var url = "http://localhost:3000/overview";
var id = "overview";

async function generator(url, id) {
  var request = await new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    view(data, request, id);
  }

  request.send()
}

function view(data, request, id){
  
  if(id == "overview"){
    if (request.status >= 200 && request.status < 400) {
      data.forEach((query) => {
        console.log(request.status);
        var div = document.createElement("tr");
        var mainContainer = document.getElementById(id);
        div.innerHTML = 
        "<td>"+query.id+"</td>"+
        "<td><input id='rendszam"+query.id+"' placeholder='"+query.rendszam+"' value='"+query.rendszam+"'/></td>"+
        "<td><input id='tulaj"+query.id+"'    placeholder='"+query.tulaj+"'    value='"+query.tulaj+"'/></td>"+
        "<td><input id='tipus"+query.id+"'    placeholder='"+query.tipus+"'    value='"+query.tipus+"'/></td>"+
        "<td><input id='modell"+query.id+"'   placeholder='"+query.modell+"'   value='"+query.modell+"'/></td>"+
        "<td><input id='evjarat"+query.id+"'  placeholder='"+query.evjarat+"'  value='"+query.evjarat+"'/></td>"+
        "<td><input id='muszaki"+query.id+"'  placeholder='"+query.muszaki+"'  value='"+query.muszaki+"'/></td>"+
        "<td><button type='submit'class='btn btn-danger'   onclick = 'deleterecord("+query.id+")' >Delete</button>"+
        "<button type='submit'class='btn btn-warning ml-2' onclick = 'update("+query.id+")'       >Update</button></td>";
        mainContainer.appendChild(div);
      })
    } else {
      console.log('Hiba!')
    }
  }
}

async function generate_html(){
  await generator(url, id);
}

//Törlés az adatbázisból
function deleterecord(id){
  const data = String(id);

  navigator.sendBeacon('http://localhost:3000/removecar/'+ data);
  console.log(data);
}

//Az adatbázis frissítése
function update(id){
  var data2 =
    id + "|" +
    document.getElementById("rendszam"+id).value + "|" +
    document.getElementById("tulaj"+id).value    + "|" +
    document.getElementById("tipus"+id).value    + "|" +
    document.getElementById("modell"+id).value   + "|" +
    document.getElementById("evjarat"+id).value  + "|" +
    document.getElementById("muszaki"+id).value;

  navigator.sendBeacon('http://localhost:3000/updatecar/'+ String(id) + "|" + document.getElementById("rendszam"+id).value +"|"+document.getElementById("tulaj"+id).value    + "|" +
  document.getElementById("tipus"+id).value    + "|" +
  document.getElementById("modell"+id).value   + "|" +
  document.getElementById("evjarat"+id).value  + "|" + document.getElementById("muszaki"+id).value +"|");
  console.log(data2);
}

generate_html();