# DisasterManagementSystem

install:
	- npm
	- nodejs
	- mongodb (default configuration)

run:
 sudo nodemon --watc controller/ --watch routes/
 or
 npm start

note:
	- make sure that you create disasterdb collections in mongodb
	- check by running "show collections"
	- app will create the necessary table automatically


Import data into the collection.

In the system shell or command prompt, use mongoimport to insert the documents into the restaurants collection in the test database. If the collection already exists in the test database, the operation will drop the restaurants collection first.

mongoimport --db test --collection restaurants --drop --file primer-dataset.json
