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


=== connect PSQL ===
>>daniar@daniar-X450JF:~$ psql -h localhost -p 5432 -U daniar spatial_data
Password for user daniar: daniar
>>psql --pset=format=FORMAT

\l :List databases
\c database-name :Connect to database
\c :Show the database your are connected to
\d :List tables in database
\d table-name :Describe table
SELECT * FROM table-name :List table contents
:q for exit

spatial_data=> \d+
spatial_data=> 
spatial_data=> \d jabar
spatial_data=> \d jabar
spatial_data=> SELECT kelurahan FROM jabar; 

SELECT * FROM bandung_infra BI, bandung_landuse BL WHERE BI.keterangan = 'Bangunan Terpencar' AND BL.keterangan = 'Hutan' AND ST_Intersects(BL.geom, BI.geom);

===================
SELECT ST_Intersects(
		ST_GeographyFromText('SRID=4326;LINESTRING(75.15 29.53,77 29,77.6 29.5, 75.15 29.53)'),
		ST_GeographyFromText('SRID=4326;POINT(-43.23456 72.4567772)')
		);
===================

select ST_AsText(ST_Intersection(linestring, polygon)) As wkt
from  ST_GeomFromText('LINESTRING Z (2 2 6,1.5 1.5 7,1 1 8,0.5 0.5 8,0 0 10)') AS linestring
 CROSS JOIN ST_GeomFromText('POLYGON((0 0 8, 0 1 8, 1 1 8, 1 0 8, 0 0 8))') AS polygon;

SELECT ST_Intersects(ST_MakePolygon(ST_GeomFromText('LINESTRING(75.15 29.53,77 29,77.6 29.5, 75.15 29.53)')),ST_MakePolygon(ST_GeomFromText('LINESTRING(75.15 29.53,77 29,77.6 29.5, 75.15 29.53)'))
		);

SELECT ST_Intersects(ST_GeomFromGeoJSON('{"type":"Point","coordinates":[-48.23456,20.12345]}'),
ST_GeomFromGeoJSON('{"type":"Point","coordinates":[-48.23456,20.12345]}')
		);

SELECT ST_Intersects(
	ST_GeomFromGeoJSON('
		{"type":"Polygon","coordinates":[[[122.398681640625,0.546561534676349],[122.47833251953125,0.6124761280050813],[122.53051757812499,0.5685331504706842],[122.54150390625,0.5245898385048935],[122.5140380859375,0.49987158825889905],[122.42889404296875,0.4833927027896987],[122.398681640625,0.546561534676349]]]} 
	'),
	ST_GeomFromGeoJSON('
		{"type":"Polygon","coordinates":[[[122.40142822265625,0.5932511181408705],[122.431640625,0.6426867176331666],[122.48382568359374,0.6317010689101341],[122.53051757812499,0.6014904163878395],[122.574462890625,0.5657867030024607],[122.58819580078125,0.4916321506079003],[122.5579833984375,0.4833927027896987],[122.48931884765626,0.4696602676283593],[122.44537353515625,0.4614207935306211],[122.40142822265625,0.4806462179537107],[122.3712158203125,0.5438150769842834],[122.40142822265625,0.5932511181408705]]]} 
	')
);


SELECT ST_AsGeoJSON(
	ST_Intersection(
		ST_GeomFromGeoJSON('
			{"type":"Polygon","coordinates":[[[122.398681640625,0.546561534676349],[122.47833251953125,0.6124761280050813],[122.53051757812499,0.5685331504706842],[122.54150390625,0.5245898385048935],[122.5140380859375,0.49987158825889905],[122.42889404296875,0.4833927027896987],[122.398681640625,0.546561534676349]]]} 
		'),
		ST_GeomFromGeoJSON('
			{"type":"Polygon","coordinates":[[[122.40142822265625,0.5932511181408705],[122.431640625,0.6426867176331666],[122.48382568359374,0.6317010689101341],[122.53051757812499,0.6014904163878395],[122.574462890625,0.5657867030024607],[122.58819580078125,0.4916321506079003],[122.5579833984375,0.4833927027896987],[122.48931884765626,0.4696602676283593],[122.44537353515625,0.4614207935306211],[122.40142822265625,0.4806462179537107],[122.3712158203125,0.5438150769842834],[122.40142822265625,0.5932511181408705]]]} 
		')
));