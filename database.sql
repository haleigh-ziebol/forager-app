
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
	"access_level" INT DEFAULT 0,
	"region_id" INT REFERENCES "regions",
	"icon" VARCHAR(20)
);

CREATE TABLE "observations" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"species_id" INT REFERENCES "species",
	"location" VARCHAR[],
	"photo" VARCHAR(500),
	"date_observed" DATE,
	"time_stamp" DATE
)

INSERT INTO "observations" ("user_id", "species_id", "location", "photo", "date_observed", "date_added")
VALUES ("hi", "11", ARRAY ['44.9778', '93.2650'], "", "", "" )


CREATE TABLE "species" (
	"id" SERIAL PRIMARY KEY,
	"USDA_CODE" VARCHAR(20),
	"scientific_name" VARCHAR(200),
	"common_name" VARCHAR(500),
	"growth_type" VARCHAR(30)
)

CREATE TABLE "states" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20),
	"region_id" INT REFERENCES "regions"
)

CREATE TABLE "regions" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20),
	"center" VARCHAR[]
)

INSERT INTO "regions" ("name", "center")
VALUES ('Midwest', ARRAY['42.280644', '-93.223132']), ('Northeast', ARRAY['42.588240', '-74.253321']), ('Southeast', ARRAY['33.239689', '-85.263921']), ('Southwest', ARRAY['34.078167', '-103.435275']), ('West', ARRAY['42.371375', '-116.601928'])


CREATE TABLE "species_state" (
	"id" SERIAL PRIMARY KEY,
	"species_id" INT REFERENCES "species",
	"state_id" INT REFERENCES "states"
)

--import USDA data
CREATE TABLE "USDA" (
	"USDA_Code" VARCHAR(10),
	"scientific_name" VARCHAR(100),
	"group" VARCHAR(100),
	"duration" VARCHAR(100),
	"growth_habit" VARCHAR(100)
);

--import edible USDA data
CREATE TABLE "edibles" (
	"symbol" VARCHAR(10),
	"s_name" VARCHAR(100),
	"common_name" VARCHAR(100)
);

SELECT * FROM bird b
JOIN "USDA" u
ON u.'USDA_CODE' = b.'USDA_ID'

CREATE TABLE species AS
SELECT * FROM edibles e
JOIN "USDA" u 
ON u.growth_habit = e.common_name


CREATE TABLE species_table AS
SELECT * FROM species s
JOIN bird b
ON b."USDA_ID" = s.symbol


CREATE TABLE "edibles" (
	"symbol" VARCHAR(10),
	"s_name" VARCHAR(100),
	"common_name" VARCHAR(100)
);


CREATE TABLE "almost_species_state" as
SELECT CONCAT('*_', TRIM(UNNEST(STRING_TO_ARRAY("states", ','))), '_*')
as "state", "species_id" 
FROM pre_species_state;


CREATE TABLE "state_abbrevs"(
"abbrev_id" INT REFERENCES "states",
"state_name" VARCHAR(20),
"state_abbrev" VARCHAR(20))

SELECT p.id, 
FROM almost_species_state a
JOIN state_abbrevs s
ON a.state = s.state_abbrev
JOIN species p
on a.species_id = p."USDA_CODE"
