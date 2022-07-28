"use strict";

import organizations from './data/orgs_and_zips.json' assert {type: 'json'};
import precincts from './data/zip_to_precincts.json' assert {type: 'json'};

// console.log("ORGS")
// console.log(organizations)

// console.log("\nPRECINCTS")
// console.log(precincts)

var zipbox = document.getElementById("zip-box")

var table = document.getElementById("table");

  var headerRow = document.createElement('tr');
  table.appendChild(headerRow)
  var headerID = document.createElement('th');
  headerID.innerHTML = "ZIP";
  headerRow.appendChild(headerID);
  var headerName = document.createElement('th');
  headerName.innerHTML = "Start";
  headerRow.appendChild(headerName);
  var headerUserName = document.createElement('th');
  headerUserName.innerHTML = "Status";
  headerRow.appendChild(headerUserName);
  var headerEmail = document.createElement('th');
  headerEmail.innerHTML = "Org";
  headerRow.appendChild(headerEmail);
  var headerPhone = document.createElement('th');
  headerPhone.innerHTML = "Universe Desc";
  headerRow.appendChild(headerPhone);


var Zips_and_precincts = {}
var organizations_zp = {}
var taken_precints = {}
var taken_zips = {}
var conflicts = {}

for (const entry in precincts){
    if(precincts[entry]['Zip Code'] in Zips_and_precincts){ 
        var cincts = [precincts[entry]['Precincts'].split(",")]
        Zips_and_precincts[precincts[entry]['Zip Code']].concat(cincts)
    }else{
        Zips_and_precincts[precincts[entry]['Zip Code']] = precincts[entry]['Precincts'].split(",")
    }
}

function add_conflict(type, number, org){
    var key = type + ": " + number
    if(key in conflicts){ conflicts[key].concat(", " + org)}
    else{conflicts[key] = org}
}
console.log(Zips_and_precincts)

console.log(organizations)

Object.keys(organizations).forEach(function(key) {
    console.log(key)
    console.log(organizations[key]['Zip Codes'])
    console.log(organizations[key]['Precincts'])

    if(key in organizations_zp){
    }
    else{
        //get precincts
        var zips = organizations[key]['Zip Codes'].split(",")
        console.log(zips)
        var cincts = []
        for (var i in zips){
            var zip = i.replace(/\D/g,'').trim();
            console.log(zip)
            if (zip in Zips_and_precincts){cincts.concat(Zips_and_precincts[zip])}
            if(zip in taken_zips){add_conflict("zip", zip, key)}else{taken_zips[zip] = true}
            
        }
        for (cinct in cincts){
            var cinctkey = "precinct: " + cinct
            if(cinctkey in taken_precints){add_conflict("precinct", cinct, key)}
        }
        //check if precincts conflict
        //check if zips conflict
        //add to organizations_zp
    }

    console.log('**************')
  })

  console.log("CONFLICTS")
  console.log(conflicts)
  console.log("TAKEN PRECINCTS")
  console.log(taken_precints)
  console.log("TAKEN ZIPS")
  console.log(taken_zips)
