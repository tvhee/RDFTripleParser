# RDFTripleParser
This project parses RDF triples and exposes an interface to execute queries on this data.

## Install



```bash
npm install
```
Browserify is used to build the script to by usable in a browser.
```bash
npm install browserify
npm run build
```
Include the bundle.js in your html.
```html
<script src="bundle.js" charset="utf-8"></script>
```

## Usage

Add all the await statements in an asynchronous function.
How to use in a node.js environment:

```javascript
const OntologyParser = require("./RDFTripleParser.js");

const ontologyData = await OntologyParser.getOntology("http://vocab.gtfs.org/gtfs.ttl");
const allClasses = await OntologyParser.getAllClasses(ontologyData);
const allNonClasses = await OntologyParser.getAllNonClasses(ontologyData);
const predicatesQuery = await OntologyParser.getPredicatesWithValue(ontologyData, "value");
```
## License and copyright

This library was developed by Tim Vanhee and contributors. The source code is available under an MIT license.
