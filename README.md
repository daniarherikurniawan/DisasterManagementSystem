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