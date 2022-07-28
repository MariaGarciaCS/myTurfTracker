"use strict";

import organizations from './data/orgs_and_zips.json' assert {type: 'json'};
import precincts from './data/zip_to_precincts.json' assert {type: 'json'};

var Zips_and_precincts = {}
var organizations_zp = {}
var taken_precints = {}
var taken_zips = {}
var conflicts = {}

function add_conflict(type, number, org){
    if(number in conflicts){ 
        conflicts[number]['orgs'] = conflicts[number]['orgs'] + ", " + org
    }
    else{
        conflicts[number] = {
            "type": type,
            "orgs": org
        }
    }
}

// get the precicts listed based on zip
for (const entry in precincts){
    if(precincts[entry]['Zip Code'] in Zips_and_precincts){ 
        var cincts = [precincts[entry]['Precincts'].split(",")]
        Zips_and_precincts[precincts[entry]['Zip Code']].concat(cincts)
    }else{
        Zips_and_precincts[precincts[entry]['Zip Code']] = precincts[entry]['Precincts'].split(",")
    }
}

//FIND CONFLICTS & DISPLAY TURF
Object.keys(organizations).forEach(function(key) {
    if(key in organizations_zp){
        console.log('Alfready in zp')
    }
    else{
        //get precincts
        var zips = organizations[key]['Zip Codes'].split(",")
        var cincts = organizations[key]['Precincts'].split(",")
        cincts.splice(cincts.indexOf(' '), 1)
        

        for (var i in zips){
            var zip = zips[i].replace(/\D/g,'').trim();
            if (zip in Zips_and_precincts){cincts = cincts.concat(Zips_and_precincts[zip])}
            if(zip in taken_zips){add_conflict("zip", zip, key)}else{taken_zips[zip] = key}
        }
        
        
        for (var i in cincts){
            cincts[i] = cincts[i].trim()
            // console.log(cincts[i])
            var cinctkey = "precinct: " + cincts[i]
            if(cinctkey in taken_precints){add_conflict("precinct", cincts[i], key)}else{taken_precints[cincts[i]] = true}
        }
        

    }

    console.log('**************')
  })

console.log(taken_precints)


// ZIP TABLE ////////////////////////////////////////////////////////////

var zipbox = document.getElementById("zip-box")

var table = document.getElementById("table");
  
var headerRow = document.createElement('tr');
table.appendChild(headerRow)
var headerID = document.createElement('th');
headerID.innerHTML = "ZIP";
headerRow.appendChild(headerID);
var headerName = document.createElement('th');
headerName.innerHTML = "Precinct";
headerRow.appendChild(headerName);
var headerEmail = document.createElement('th');
headerEmail.innerHTML = "Org";
headerRow.appendChild(headerEmail);


// List zips & Precincts
Object.keys(Zips_and_precincts).forEach(function(key) {

    let newRow = document.createElement('tr');
    let newZip = document.createElement('td');
    newZip.innerHTML = key;
    newRow.appendChild(newZip)

    let newCinct = document.createElement('td');
    newCinct.innerHTML = Zips_and_precincts[key];
    newRow.appendChild(newCinct)
    table.appendChild(newRow)
});




// CONFLICT BOX ////////////////////////////////////////////////////////////



console.log(conflicts)

var ctable = document.getElementById("conflicts-table");
  
var headerRow = document.createElement('tr');
ctable.appendChild(headerRow)
var headerID = document.createElement('th');
headerID.innerHTML = "ZIP or Precinct";
ctable.appendChild(headerID)
var headerType = document.createElement('th');
headerType.innerHTML = "Type";
ctable.appendChild(headerType)
var headerOrgs = document.createElement('th');
headerOrgs.innerHTML = "Organizations";
ctable.appendChild(headerOrgs)


Object.keys(conflicts).forEach(function(key) {

    let newRow = document.createElement('tr');
    let newZip = document.createElement('td');
    newZip.innerHTML = key;
    newRow.appendChild(newZip)

    let newType = document.createElement('td');
    newType.innerHTML = conflicts[key]['type'];
    newRow.appendChild(newType)


    let newOrgList = document.createElement('td');
    newOrgList.innerHTML = conflicts[key]['orgs'];
    newRow.appendChild(newOrgList)
    ctable.appendChild(newRow)
});