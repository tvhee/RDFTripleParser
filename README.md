# RDFTripleParser
This project parses RDF triples and exposes an interface to execute queries on this data.

## Install

```bash
npm install
```

## Usage

Add all the await statements in an asynchronous function.

```javascript
const OntologyParser = require("./parseOntology.js");

const ontologyData = await OntologyParser.getOntology("http://vocab.gtfs.org/gtfs.ttl");
const allClasses = await OntologyParser.getAllClasses(ontologyData);
const allNonClasses = await OntologyParser.getAllNonClasses(ontologyData);
const predicatesQuery = await OntologyParser.getPredicatesWithValue(ontologyData, "value");
```

## License and copyright

This library was developed by Tim Vanhee and contributors. The source code is available under an MIT license.