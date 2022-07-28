// var request = new XMLHttpRequest();
//    request.open("GET", "data/orgs_and_zips.json", false);
//    request.send(null)
//    var my_JSON_object = JSON.parse(request.responseText);
//    console.log(my_JSON_object.result);

   fetch("data/orgs_and_zips.json")
   .then(response => {
      return response.json();
   })
   .then(data => console.log(data));