// var request = new XMLHttpRequest();
// request.open("GET", 'data/orgs_and_zips.json')
// request.send(null)

// var Orgs = JSON.parse(request.responseText);


var request = new XMLHttpRequest();
   request.open("GET", "data/orgs_and_zips.json", false);
   request.send(null)
   var my_JSON_object = JSON.parse(request.responseText);
   console.log(my_JSON_object.result);

// function readSingleFile(e) {
//     var file = e.target.files[0];
//     if (!file) {
//       return;
//     }
//     var reader = new FileReader();
//     reader.onload = function(e) {
//       var contents = e.target.result;
//       displayContents(contents);
//     };
//     reader.readAsText(file);
//   }


// const Orgs = JSON.parse(readSingleFile('data/zip_to_precinct.json'))
// const jsonPrecints = 'data/zip_to_precinct.json'

// console.log(Orgs)