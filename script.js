var OntologyParser = require("./RDFTripleParser.js");

async function getDataFromRDFFile(){
  var result = await OntologyParser.getOntology("http://vocab.gtfs.org/gtfs.ttl");
  console.log(result);

  var res = await OntologyParser.getPredicatesWithValue(result, "http://vocab.gtfs.org/terms#DropOffType");
  console.log(res);
}

document.addEventListener('DOMContentLoaded', function(){
  var btn = document.getElementById("btnGetData");
  btn.addEventListener("click", getDataFromRDFFile);
});

//var result = await OntologyParser.getOntology("http://velopark.ilabt.imec.be/openvelopark/terms");
//console.log(result);
