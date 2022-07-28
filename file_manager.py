
import csv
import json
 
def make_json_orgs(csvFilePath, jsonFilePath):
     
    data = {}

    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)

        for rows in csvReader:
            org = rows['Organization']
            camp = rows['Campaign']
            key = org + "-"+ camp
            data[key] = rows
 
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))

def make_json(csvFilePath, jsonFilePath):
     
    data = {}

    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)

        for rows in csvReader:
            key = rows['No']
            data[key] = rows
 
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))
         
csvOrgs = r'data/orgs_and_zips.csv'
jsonOrgs= r'data/orgs_and_zips.json'

csvPrecints = r'data/zip_to_precincts.csv'
jsonPrecints= r'data/zip_to_precincts.json'

make_json_orgs(csvOrgs, jsonOrgs)
make_json(csvPrecints, jsonPrecints)

