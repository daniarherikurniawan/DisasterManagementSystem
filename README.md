# DisasterManagementSystem

install:
	- npm
	- nodejs
	- mongodb (default configuration)

run:
 sudo nodemon --watch controller/ --watch routes/
 or
 npm start

note:
	- make sure that you create disasterdb collections in mongodb
	- check by running "show collections"
	- app will create the necessary table automatically


Import data into the collection.

In the system shell or command prompt, use mongoimport to insert the documents into the restaurants collection in the test database. If the collection already exists in the test database, the operation will drop the restaurants collection first.

mongoimport --db test --collection restaurants --drop --file primer-dataset.json

> db.victims.update({}, {$set: {id_disaster_events:[]}}, false, true)
WriteResult({ "nMatched" : 4, "nUpserted" : 0, "nModified" : 4 })
> db.disasters.drop()

db.test_users.remove( {"_id": ObjectId("4d512b45cc9374271b02ec4f")});

mongoimport --db disasterdb --collection victims --file Downloads/dump/victims.json 
