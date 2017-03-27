
--Create table
CREATE TABLE "tasks" (
	id SERIAL PRIMARY KEY,
	task VARCHAR(500)
	);
--add another column
ALTER TABLE "tasks" ADD "status" boolean;

--add a task
INSERT INTO "tasks" (task, status)
VALUES ('complete weekend challenge', 'no');

--delete tasks
SELECT * FROM "tasks" WHERE "id"= 1;
DELETE FROM "tasks" WHERE "id"= 1;

--update task status
UPDATE "tasks" SET "status" = TRUE WHERE "id"= 7;

--put completed tasks in bottom
SELECT * FROM "tasks" ORDER BY status ASC;
