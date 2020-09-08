
# jsreport-typescript-example

This repository contains a set of examples of using typescript with jsreport.
The jsreport types are stored [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) general repository and you will typically want to explicitly install them to your projects.  The most common are:

[@types/jsreport](https://www.npmjs.com/package/@types/jsreport) - should contain types of all extensions delivered in the main jsreport distribution    
[@types/jsreport-client](https://www.npmjs.com/package/@types/jsreport-client) - should contain types of all extensions delivered in the main jsreport distribution and types for the nodejs client

You can build the examples using the following commands. The commands for running examples are listed below.
```
npm i
npm run watch
```

** The types don'tt cover 100% of jsreport yet. Please help us by contributing to the [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

## jsreport client example

This example stored in [src/client.ts](src/client.ts) creates an internal jsreport server for testing purpose and invokes rendering remotely using [nodejs jsreport client](https://jsreport.net/learn/nodejs-client).

Start it using:
```
npm run client
```

## jsreport server example

The most simple way how to start jsreport reporting server. See [src/server.ts](src/server.ts).

Start it using the following command and reach the running server on port 5488
```
npm run server
```

## jsreport and express integration example

A standard nodejs express app with integrated jsreport running on the nested route. See [src/integrated.ts](src/integrated.ts).

Start it using the following command and reach the running express app on http://localhost:3000
```
npm run integrated
```

## jsreport stateless examples

jsreport can be used also in the stateless mode. This means you can specify fully the rendering request without using the template store.
See [src/stateless.ts](src/stateless.ts).

Start it using the following command, it should write file out.pdf
```
npm run stateless
```