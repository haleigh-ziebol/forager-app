/* data for tables is here: 'https://tinyurl.com/forager-table-data' */


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
	"notes" VARCHAR(500),
	"date_observed" DATE,
	"time_stamp" DATE
)

/* data to import for species table is in linked folder*/
CREATE TABLE "species" (
	"id" SERIAL PRIMARY KEY,
	"USDA_CODE" VARCHAR(20),
	"scientific_name" VARCHAR(200),
	"common_name" VARCHAR(500),
	"growth_type" VARCHAR(30)
)

CREATE TABLE "regions" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20),
	"center" VARCHAR[]
)

INSERT INTO "regions" ("name", "center")
VALUES ('Midwest', ARRAY['42.280644', '-93.223132']), ('Northeast', ARRAY['42.588240', '-74.253321']), ('Southeast', ARRAY['33.239689', '-85.263921']), ('Southwest', ARRAY['34.078167', '-103.435275']), ('West', ARRAY['42.371375', '-116.601928'])


/* data to import for states table is in linked folder*/
CREATE TABLE "states" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20),
	"region_id" INT REFERENCES "regions"
)


/* data to import for species_state table is in linked folder*/
CREATE TABLE "species_state" (
	"id" SERIAL PRIMARY KEY,
	"species_id" INT REFERENCES "species",
	"state_id" INT REFERENCES "states"
)

/* data to import for state_abbrevs table is in linked folder*/
CREATE TABLE "state_abbrevs"(
"abbrev_id" INT REFERENCES "states",
"state_name" VARCHAR(20),
"state_abbrev" VARCHAR(20))