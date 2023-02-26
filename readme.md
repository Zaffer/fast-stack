# Introduction

FAAP Stack
---------
FastAPI
Angular
Auth0
PostgreSQL

SQLModel for database ORM and API schemas
Material Design for admin panel
Ionic for web and mobile app

Docker Containers of everything
Google Cloud Platform for hosting
Auth0 for authentication and SSO


TODO:
- full pnp for yarn (currently Anuglar has issues with Yarn pnp)
- Add Grafana as service to visualise your data


Duplicate _api, _web, or _app for each new service you want to build


## Using this template repo

Copy this repo as a template.
> to pull in updates on the template to your repo:
Add this repo as a remote called "template"
Git fetch from all remotes.
Merge from template using this line:
`git merge template/master --strategy-option ours --squash`


## Services

### API
service: "_api"
FastAPI
SQLModel 

### WEB
service: "_web"
Angular
Firebase
Material Design

### APP
service: "_app"
Angular
Firebase
Ionic


## Tools


### VSCode Settings

## Poetry
Needed in your local environment (not container only) so Python IDE can support  


### Docker Compose


## Alembic
Alembic is a lightweight database migration tool for usage with the SQLAlchemy Database Toolkit for Python. It provides a full suite of revision control and scripting facilities out of the box, as well as more advanced features.

For a new project you need to delete the sql files in db/sql.
Genereate new SQL using Alembic replaces the old SQL files.
On local database start these files will automatically be run because they are mounted into /docker-entrypoint-initdb.d/
For production database you need to run the db-up.sh script to manaully upgrade the live database useing alembic.


### Github Actions
IMPORATANT NOTE: Github Actions secrets is only free from public repos, if you need a private or organisation repo you need to update the workflow to not use secrets.
To do this you remove the references to secrets and replace those environment variables with your Google Cloud Project's WIF provider and service account.

Workload Identity Federation (WIF) is a feature of Google Cloud Platform that allows you to access Google Cloud resources from on-premises or other cloud environments. With WIF, you can access Google Cloud resources from AWS, Azure, or any identity provider that supports OpenID Connect (OIDC).
> more info: https://cloud.google.com/iam/docs/workload-identity-federation


==============================

![Continuous Integration and Delivery](https://github.com/qr-space/quickdesk-api/workflows/Continuous%20Integration%20and%20Delivery/badge.svg?branch=master)

# ENVIROMENT SETUP

1. Linux
    > WSL2
    https://learn.microsoft.com/en-us/windows/wsl/install-manual

    > or linux
    https://ubuntu.com/tutorials/install-ubuntu-desktop#1-overview


2. Python version 3.11
    https://www.python.org/
    
    > Pyenv (optional)
    https://github.com/pyenv/pyenv
    https://realpython.com/intro-to-pyenv/


3. Docker Desktop
    https://www.docker.com/products/docker-desktop/


4. Visual Studio Code & Extensions
    https://code.visualstudio.com/download

    Suggested visual studio code extensions:
    > Pylance
    > Docker
    > Thunder Client
    > Prettier
    > ZipFS


5.  Poetry
    https://python-poetry.org/
    > after install, add to PATH:
    `export PATH="$HOME/.local/bin:$PATH"`


6. GCloud CLI
    https://cloud.google.com/sdk/docs/install
    (`gcloud init --no-launch-browser` if open in browser error)
    
    > Authorise Docker Cred Helper
    https://cloud.google.com/artifact-registry/docs/docker/authentication#gcloud-helper
    (eg: `gcloud auth configure-docker europe-west1-docker.pkg.dev`)

    > Create Service Account Key of signed in user for ADC
    `gcloud auth application-default login`
    `sudo chmod 644 ~/.config/gcloud/application_default_credentials.json`

    > Remember to revoke when you no longer need access (`gcloud auth application-default revoke`)


7. Github
    > Save credentials
    `git config --global user.name "YOUR USERNAME"`
    `git config --global user.email "YOUR EMAIL"`


8. Node
	> nvm:
	https://github.com/nvm-sh/nvm
  `nvm install --lts`

	> yarn:
	https://yarnpkg.com/getting-started/install


9. Global CLI's:
    > Angular:
    `npm install -g @angular/cli`
    `npm install -g firebase-tools`
    `npm install -g @ionic/cli`


10. Virtual Environment
    > create poetry venv and install packages (then open venv in terminal to use linting)
    ```
      cd services/frontend/src
      poetry shell
      poetry install
    ```


11. VSCode Settings
    > paste into .vscode/settings.json settings (swap 'quickdesk-api-tLv1QZSI-py3.9' with your venv name):
    ```
    {
      "python.defaultInterpreterPath": "~/.cache/pypoetry/virtualenvs/{{{{{quickdesk-api-t4Xs1vGN-py3.10}}}}}/bin/python",
      "python.terminal.activateEnvironment": true,
      "python.analysis.extraPaths": [
        "./services/_api/src"
      ],
      "python.analysis.typeCheckingMode": "basic",
      "python.analysis.diagnosticSeverityOverrides": {"reportGeneralTypeIssues": "information"},
      "python.formatting.provider": "black",
      "python.linting.enabled": true,
      "python.linting.flake8Enabled": true,
      "python.linting.flake8Args": [
        "--max-line-length=119",
        "--exclude=alembic,env.py,git,__pycache__,__init__.py,.pytest_cache"
      ],
      "python.linting.flake8CategorySeverity.E": "Hint",
      "python.linting.flake8CategorySeverity.W": "Warning",
      "python.linting.flake8CategorySeverity.F": "Information",
      "isort.args": ["--profile=black"],
      "search.exclude": {
        "**/.yarn": true,
        "**/.pnp.*": true
      },
      "[typescript]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "vscode.typescript-language-features"
      },
      "prettier.prettierPath": "./services/_web/app/.yarn/sdks/prettier/index.js",
      "typescript.tsdk": "./services/_web/app/.yarn/sdks/typescript/lib",
      "typescript.enablePromptUseWorkspaceTsdk": true,
    }
    ```
    > start new terminal that must automatically load into the poetry virtual environment


# PRODUCTION SERVICES

## _api

## _dash

## _web_srv

## _web

if creating a new service with angular cli directly, then remeber to choose yarn as the package manager.
`ng config cli.packageManager yarn`


cd into the app folder
`yarn set version stable`
`yarn install`


> the following is get pnp working once Angular supports it again.

`yarn add -D @types/node`
`yarn build`
`yarn start`
`yarn dlx @yarnpkg/sdks vscode`

add paths to your app's .yarn file in workspace root .vscode/settings.json


# DEVELOPMENT SERVICES

## pgAmdin
This is a GUI for postgresql. It is not required but it is very useful for development.

`
docker compose up pgadmin
`

http://localhost:5050
postgres@postgres.com
grespost

> add the local server
```
name: db-local
host: db-local
port: 5432
username: postgres
password: postgres
```


# SCRIPTS

## Develop 
> build the images
```
sh scripts/build-dev.sh
```

> run the containers for local development
```
sh scripts/develop-local.sh
```

> run the containers connected to the live database
```
sh scripts/develop-prod.sh
```


## Test
> modify the script to choose options like turning off --build
```
sh scripts/test.sh
```


## Quality
```
docker-compose exec web flake8 .
docker-compose exec web black . --check
docker-compose exec web isort . --check-only
```


## Deploy
> deploy to staging environment
```
sh scripts/deploy-to-stage.sh
```

> deploy to production environment
```
sh scripts/deploy-to-prod.sh
```


# COMMANDS

## Docker
> bring container down
```
docker compose down
```

> Exec into container
```
docker exec -it -u root api bash
```

> Exec bash command into container
```
docker exec -u root api bash -c "alembic upgrade head"
```


## Alembic
> Migrations
```
cd ./database/
```

```
alembic revision --autogenerate -m 'revision message'
```

```
alembic upgrade head --sql > migration.sql
```
```
alembic upgrade head
```
```
alembic downgrade -1
```
```
docker cp ./sql/A_data.sql local-db:/docker-entrypoint-initdb.d/A_data.sql &&
docker exec -u postgres local-db psql postgres postgres -f docker-entrypoint-initdb.d/A_data.sql
```


## PSQL
`
docker compose exec local-db psql -U postgres
`
`
\c quickdesk_db
`
`
\dt
`

## Jupyter Notebook
>Attach shell to backend api
```bash
jupyter-lab
```
or
```bash
jupyter lab --ip=0.0.0.0 --allow-root --NotebookApp.custom_display_url=http://127.0.0.1:8888
```
> Copy the URL of the server
> Open notebook, select remote server, paste URL
> Select remote server as kernel


## GCloud
>Google Cloud Platform SDK commands 

```
gcloud config configurations list
gcloud config configurations create <my-config>
gcloud config configurations activate <config>

gcloud projects list
gcloud config set project <project-name>

gcloud config list
```


## Poetry
> Update dependancy version in pyproject.toml
```bash
poetry add black@latest --group dev
```

## Angular CLI
> Create new service
```bash
ng generate service services/<service-name>
```

> Create new component, then remove dry-run if happy to create
```bash
ng g c feature -m features.module --dry-run
```


## Ionic:
for an ionic, start with:
`ionic start`



# TROUBLESHOOTING

if the container is running different .env file to the one in your local volume, then rebuild the container for local


