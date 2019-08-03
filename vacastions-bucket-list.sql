-- CREATE DATABASE mynextvacation;

use sjs4cydlaupisok1;

CREATE TABLE users 
(id integer NOT NULL AUTO_INCREMENT, 
 firstName VARCHAR(15),
 lastName VARCHAR(15),
 email VARCHAR(30),
 userPassword VARCHAR(100),
isAdmin BOOL,
PRIMARY KEY (id)
);

CREATE TABLE vacations
(id integer NOT NULL AUTO_INCREMENT,
vacationDescription VARCHAR(200),
image VARCHAR(200),
startingDate DATE,
endingDate DATE,
price INTEGER,
followers INTEGER,
PRIMARY KEY (id)
);

CREATE TABLE savedvacations
(id integer NOT NULL AUTO_INCREMENT,
userID integer,
vacationId integer,
PRIMARY KEY (id),
FOREIGN KEY (userID) REFERENCES users(id),
FOREIGN KEY (vacationID) REFERENCES vacations(id)
);

-- make one admin user in the database (password is 123456)
INSERT INTO `sjs4cydlaupisok1`.`users` (`firstName`, `lastName`, `email`, `userPassword`, `isAdmin`) VALUES ('sharon', 'reshef', 'sharon@gmail.com', '$2a$10$7PUUgNHHvaMhS6zPXuVK8uvmWYrGvxuDkUfxpEZA7uRUQIZUHyVTm', '1');




INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ( 'Walk along the Great Wall of China', 'https://i.ibb.co/LnYtHBR/2.png', '2019-09-12', '2019-09-20', '4000');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ( 'Visit the Colosseum', 'https://i.ibb.co/8gc8JsK/3.png', '2020-03-01', '2020-03-05', '2000');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ( 'Get stunned by the Great Pyramid of Giza', 'https://i.ibb.co/WzHpDkt/1.png', '2019-09-01', '2019-09-06', '1500');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ('Trek to Machu Picchu', 'https://i.ibb.co/WDCwccR/4.png', '2020-04-08', '2020-04-20', '8000');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ( 'Sail on Ha Long Bay', 'https://i.ibb.co/DG5vY24/5.png', '2020-08-15', '2020-08-30', '7500');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ('Discover the magnificent Angkor Wat', 'https://i.ibb.co/XDcz9DK/7.png', '2019-10-10', '2019-10-25', '8500');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ( 'Drink wine under the Eiffel Tower', 'https://i.ibb.co/zmnvCZG/6.png', '2020-09-08', '2020-09-14', '3500');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ( 'Dive on the Great Barrier Reef', 'https://i.ibb.co/GPsS1CL/8.png', '2020-12-12', '2020-12-30', '8900');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ( 'Participate in a Hiking Tour in the Grand Canyon', 'https://i.ibb.co/mXHymbR/9.png', '2020-02-19', '2020-02-28', '1200');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ( 'Climb the Kilimanjaro', 'https://i.ibb.co/6sxc7Dq/10.png', '2020-07-04', '2020-07-19', '6700');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ( 'Admire an Aurora borealis in Norway', 'https://i.ibb.co/K0CsNYN/11.png', '2020-11-12', '2020-11-17', '4300');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ( 'Exolore the Incredible Temples of Bagan', 'https://i.ibb.co/0CMtL6W/12.png', '2019-08-01', '2019-08-10', '5600');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ( 'Walk around on Cinaque Terre', 'https://i.ibb.co/Bn7sTmk/13.png', '2020-06-12', '2020-06-18', '7800');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ('Walk along the Canals of Amsterdam', 'https://i.ibb.co/Jqq6ZV8/15.png', '2020-08-05', '2020-08-16', '5400');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ('Admire the Forbidden City', 'https://i.ibb.co/MZN0P0s/17.png', '2020-05-10', '2020-05-23', '7300');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ('Get splashed at Niagra Falls', 'https://i.ibb.co/87NtQ5B/18.png', '2020-03-08', '2020-03-17', '3100');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ('Walk through the Times Square', 'https://i.ibb.co/d0LjDHn/19.png', '2020-09-20', '2020-09-16', '2800');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ('Drive through the Black Forest', 'https://i.ibb.co/RBtbS8M/20.png', '2020-05-03', '2020-05-17', '6800');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ('Bath in the Dead Sea', 'https://i.ibb.co/q55FK5R/22.png', '2020-09-12', '2020-09-20', '5500');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ('Ride a horse in Mongolia', 'https://i.ibb.co/JKHRDyQ/23.png', '2020-12-01', '2020-12-18', '9000');
INSERT INTO `sjs4cydlaupisok1`.`vacations` (`vacationDescription`, `image`, `startingDate`, `endingDate`, `price`) VALUES ('Hike on Trolltunga', 'https://i.ibb.co/61SVy5s/24.png', '2020-07-12', '2020-07-20', '6600');





