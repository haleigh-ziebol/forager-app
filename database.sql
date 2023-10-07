
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "observations" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT,
	"species_id" INT,
	"location" VARCHAR[],
	"photo" VARCHAR(500),
	"date_added" DATE
)

INSERT INTO "observations" ("user_id", "species_id", "location", "photo", "date_added")
VALUES ("hi", "11", ARRAY ['44.9778', '93.2650'], "", "" )