--TABLE CREATION
CREATE TABLE "tasks" (
	id SERIAL PRIMARY KEY,
	task VARCHAR(500)
	);

ALTER TABLE "tasks" ADD "status" boolean;

SELECT * FROM "tasks";

INSERT INTO "tasks" (task, status)
VALUES ('complete weekend challenge', 'no');
