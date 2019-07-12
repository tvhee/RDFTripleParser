const ldfetch = require('ldfetch');

module.exports = {  getOntology: getOntology,
                    getAllNonClasses: getAllNonClasses,
                    getAllClasses: getAllClasses,
                    getPredicatesWithValue: getPredicatesWithValue
                 };

const classURI = [
  "http://www.w3.org/2000/01/rdf-schema#Class",
  "http://www.w3.org/2002/07/owl#Class"
];

async function getOntology(ontologyURL){
  var data = {};
  let fetch = new ldfetch({});
  let response = await fetch.get(ontologyURL);
  for(var i = 0; i < response.triples.length; i++){
    var quad = response.triples[i];

    if(data[quad.subject.value] == undefined){
      data[quad.subject.value] = {};
      data[quad.subject.value]["predicate"] = {};
    }
    var object = {};
    object["value"] = quad.object.value;
    object["datatype"] = quad.object.datatype;
    object["language"] = quad.object.language;
    if(data[quad.subject.value]["predicate"][quad.predicate.value] == undefined){
      data[quad.subject.value]["predicate"][quad.predicate.value] = [];
    }
    data[quad.subject.value]["predicate"][quad.predicate.value].push(object);
  }

  return data;
}

async function getAllNonClasses(ontologyData){

  var nonClasses = {};
  subjects:
  for(var subject in ontologyData) {
  //for(let i = 0; i < ontologyData.length; i++){
    var typePredicates = ontologyData[subject]["predicate"]["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"];
    if(typePredicates == undefined){
      continue;
    }
    predicates:
    for(let j = 0; j < typePredicates.length; j++){
      if(classURI.includes(typePredicates[j].value)){
        continue subjects;
      }
    }
    nonClasses[subject] = ontologyData[subject];
  }
  return nonClasses;
}

async function getAllClasses(ontologyData){

  var classes = {};
  subjects:
  for(var subject in ontologyData) {
  //for(let i = 0; i < ontologyData.length; i++){
    var typePredicates = ontologyData[subject]["predicate"]["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"];
    if(typePredicates == undefined){
      continue;
    }
    predicates:
    for(let j = 0; j < typePredicates.length; j++){
      if(!classURI.includes(typePredicates[j].value)){
        continue subjects;
      }
    }
    classes[subject] = ontologyData[subject];
  }
  return classes;
}

async function getPredicatesWithValue(ontologyData, queryValue){
  var subjectsWithPredicate = {};
  subjects:
  for(var subject in ontologyData) {
    for(var object in ontologyData[subject]["predicate"]){
      for(var i = 0; i < ontologyData[subject]["predicate"][object].length; i++){
        if(ontologyData[subject]["predicate"][object][i].value == queryValue){
          subjectsWithPredicate[subject] = ontologyData[subject];
          continue subjects;
        }
      }
    }
  }
  return subjectsWithPredicate;
}
