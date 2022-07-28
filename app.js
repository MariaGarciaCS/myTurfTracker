"use strict";

import organizations from './data/orgs_and_zips.json' assert {type: 'json'};
import precincts from './data/zip_to_precincts.json' assert {type: 'json'};

console.log("ORGS")
console.log(organizations)

console.log("\nPRECINCTS")
console.log(precincts)

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

for (const entry in precincts){
    console.log(precincts[entry]['Zip Code'])
}
