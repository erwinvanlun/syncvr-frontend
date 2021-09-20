# Coding demonstration by Erwin van Lun

# Install and run
to install:
>npm install

to prepare backend
download and run backend repo: https://github.com/erwinvanlun/syncvr-backend.git
your API will be available at the endpoint localhost:3000

to run:
> ng serve
   
## Features
- calculate Fibonacci number
- show history of previous requests from server
- recognize and highlight own requests
- multi-lingual 
- lazy loading
- shared SyncVR library with backend (available on https://www.npmjs.com/package/syncvr)
- typescript strict mode

## Planned features 
- error handling (basic handling already in code)
- integrate validation with backend

## ToDo
- check typescript strict mode consistency
- cross browser testing
- unit testing
- end-to-end testing
- split request number and result component in/from fibonacci component
- split header and footer component in/from root component
- test lazy loading
- set up BIM structure in scss
- check scss for possible optimizations
- ts lint check, align with backend code style
- todo's documented in code

## Know bugs
- initial history doesn't show request in date order, probably caused in relativeDate pipe
- 
