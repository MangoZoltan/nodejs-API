var url = "http://localhost:3000/view";
var id = "view";

async function generator(url, id) {
    var request = await new XMLHttpRequest()

request.open('GET', url, true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
view(data, request, id);

}

request.send()
  }

  function view(data, request, id){
      if(id == "view"){
    if (request.status >= 200 && request.status < 400) {
         data.forEach((query) => {
          console.log(request.status);
          var div = document.createElement("tr");
            var mainContainer = document.getElementById(id);
          div.innerHTML = "<td>"+query.id+"</td>"+
          "<td><input id='name"+query.id+"' placeholder='"+query.name+"' value='"+query.name+"'/></td>"+
          "<td><input id='email"+query.id+"' placeholder='"+query.email+"' value='"+query.email+"'/></td>"+
          "<td><input id='address"+query.id+"' placeholder='"+query.address+"' value='"+query.address+"'/></td>"+
          "<td><button class='btn btn-danger' onclick = 'deleterecord("+query.id+")' type = 'submit' value='Submit'>Delete</button>"+
          "<button class='btn btn-warning ml-2' onclick = 'update("+query.id+")'>Update</button></td>" ;
          mainContainer.appendChild(div)
        })
      } else {
        console.log('error')
      }}
  }

async function generate_html(){
await generator(url, id);
}

function deleterecord(id){
  navigator.sendBeacon('http://localhost:3000/deleterecord/'+ id);
  console.log(id);
}
function update(id){
  const data = id + ";"+ document.getElementById("name"+id).value + ";"+ document.getElementById("email"+id).value + ";"+ document.getElementById("address"+id).value;
  
  navigator.sendBeacon('http://localhost:3000/update/'+ data);
  console.log(data);
}

generate_html();