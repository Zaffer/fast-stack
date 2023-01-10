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

COMMIT;

