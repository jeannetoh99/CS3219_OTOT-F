# CS3219 OTOT Task F

## Quick Start
1. Clone this repository.

2. To start mongodb server: run `mongod`

3. To start the backend server:

    - Navigate to the root of the project directory
    - To install the node modules: run `yarn`
    - Ensure redis server is running locally: run `redis-server`
    - To start the server locally on port 8080: run `node index` 

## End Points

1. `GET /api/photos`: returns a large dataset of photo objects.

    - Can be filtered by body field: `albumId` (number)
    

2. `GET /api/photos/:id`: returns the photo object with the particular id

There are up to 5000 fake photo data available, called from http://jsonplaceholder.typicode.com/.

## Redis Caching
Redis caching is used for the endpoints. Notice the difference in time taken for each API call the first time they are called vs subsequent calls. 

Example: `GET /api/photos`
- Performance of first request (Cache Miss): ~250ms
- Performance of subsequent requests (Cache Hit): ~40ms


### To Clear All Redis Cache
- Turn on redis CLI: `redis-cli`
- In the redis console: run `flushall`
