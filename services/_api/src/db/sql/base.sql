BEGIN;

CREATE TABLE alembic_version (
    version_num VARCHAR(32) NOT NULL, 
    CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
);

-- Running upgrade  -> e6024baad4be

CREATE TABLE "user" (
    name VARCHAR NOT NULL, 
    id INTEGER GENERATED ALWAYS AS IDENTITY, 
    PRIMARY KEY (id)
);

INSERT INTO alembic_version (version_num) VALUES ('e6024baad4be') RETURNING alembic_version.version_num;

-- Running upgrade e6024baad4be -> 54738a63b50d

ALTER TABLE "user" ADD COLUMN email VARCHAR NOT NULL;

ALTER TABLE "user" ALTER COLUMN name DROP NOT NULL;

ALTER TABLE "user" ADD UNIQUE (email);

UPDATE alembic_version SET version_num='54738a63b50d' WHERE alembic_version.version_num = 'e6024baad4be';

-- Running upgrade 54738a63b50d -> d6a8dc21c57d

UPDATE alembic_version SET version_num='d6a8dc21c57d' WHERE alembic_version.version_num = '54738a63b50d';

COMMIT;

