FAAP Stack
---------

# Introduction
FastAPI
Firebase
Angular
Auth0
PostgreSQL
Google Cloud Platform

SQLModel for database ORM and API schemas
Material Design for admin panel
Ionic for web and mobile app

Docker Containers of everything
Google Cloud Platform for hosting
Auth0 for authentication and SSO


TODO:
- full pnp for yarn (currently Anuglar has issues with Yarn pnp)
- ~~containerise Angular pgAdmin4~~
- ~~Add Grafana as service to visualise your data~~
- Make a single Mat Web service
- Add Ionic service


Duplicate _api, _web, or _app for each new service you want to build


## Using this template repo

Copy this repo as a template.
> to pull in updates on the template to your repo:
Add this repo as a remote called "template"
Git fetch from all remotes.
Merge from template using this line:
`git merge template/master --strategy-option ours --squash`


## Template Services

### _fast_api
FastAPI
SQLModel

### _ng_mat
Angular
Firebase
Material Design

### _ng_ion
Angular
Firebase
Ionic

### _flask_dash
Flask
Plotly Dash


## Notes

### Github Actions
IMPORATANT NOTE: Github Actions secrets is only free from public repos, if you need a private or organisation repo you need to update the workflow to not use secrets.
To do this you remove the references to secrets and replace those environment variables with your Google Cloud Project's WIF provider and service account.

Workload Identity Federation (WIF) is a feature of Google Cloud Platform that allows you to access Google Cloud resources from on-premises or other cloud environments. With WIF, you can access Google Cloud resources from AWS, Azure, or any identity provider that supports OpenID Connect (OIDC).
> more info: https://cloud.google.com/iam/docs/workload-identity-federation


==============================

![Continuous Integration and Delivery](https://github.com/your-firebase-project/workflows/Continuous%20Integration%20and%20Delivery/badge.svg?branch=master)

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


4. Visual Studio Code & suggest extensions
    https://code.visualstudio.com/download

    > suggested extensions:
    - Thunder Client
    - Docker
    - Pylance
    - Prettier


5.  Poetry (needed for IDE support)
    https://python-poetry.org/

    > after install, add to PATH:
    `nano ~/.bashrc`
    `export PATH="$HOME/.local/bin:$PATH"`

    > create poetry venv and install packages (then open venv in terminal to use linting)
    > copy the name of this new venv into your vscode settings
    ```
      cd services/_api/src
      poetry shell
      poetry install
    ```


6. GCloud CLI
    https://cloud.google.com/sdk/docs/install
    > (`gcloud init --no-launch-browser` if open in browser error)
    
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

  > global Angular CLI's:
    `npm install -g @angular/cli`
    `npm install -g firebase-tools`
    `npm install -g @ionic/cli`


9. yarn:
	https://yarnpkg.com/getting-started/install

  > cd into the app folder
    `yarn set version stable`
    `yarn install`


10. VSCode Settings
    > paste into .vscode/settings.json settings (swap 'api-tLv1QZSI-py3.9' with your venv name):
    ```
    {
      "python.defaultInterpreterPath": "~/.cache/pypoetry/virtualenvs/{{{{{_api-py3.11}}}}}/bin/python",
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
      "flake8.severity": {
        "E": "Warning",
        "F": "Warning",
        "W": "Hint"
      },
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


(angular note)

> the following is get pnp working once Angular supports it again.

`yarn add -D @types/node`
`yarn build`
`yarn start`
`yarn dlx @yarnpkg/sdks vscode`
> add paths to your app's .yarn file in workspace root .vscode/settings.json


# DEVELOPMENT SERVICES


## db-local
Local Postgres db for development


## pgAmdin
This is a GUI for postgresql. It is not required but it is very useful for development.

`docker compose up pgadmin`

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

## cloudsql-proxy
for connecting to cloud db from your local environment


## grafana
for viewing analytics


# SCRIPTS

## Develop 
> run the containers for local development
```
sh ./scripts/develop-local.sh
```

> run the containers connected to the live database
```
sh ./scripts/develop-prod.sh
```

## Database migrations
```
sh ./scripts/db-revise.sh
```
```
sh ./scripts/db-up.sh
```
```
sh ./scripts/db-down.sh
```

## Test & Quality
> modify the script to choose options like turning off --build
```
sh ./scripts/test.sh
```

> quality
```
docker-compose exec web flake8 .
docker-compose exec web black . --check
docker-compose exec web isort . --check-only
```


## Deployment
> deploy to staging environment
```
sh ./scripts/deploy-stage.sh
```

> deploy to production environment
```
sh scripts/deploy-prod.sh
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


## Ionic
`ionic serve`

> view ionic on native devices with Ionic Lab
`ionic serve -l`

> natice 
`ionic capacitor add`

web
`ionic build --prod --aot`

android
`ionic capacitor build android`
post android build:
> copy `google-services.json` from firebase to `/android/app/`

`ionic generate module things --routing --dry-run`
`ionic generate module things --routing`

`ionic generate page /pages/thing --module=things`

`ionic generate compenent /components/thing`



## Firebase

`firebase deploy -m "Deploying the best new feature ever."`

Emulater mode UI
`firebase emulators:start`
`firebase emulators:start --only auth`


## OpenAPI generator
1. Download openapi.json from API page
2. Replace */openapi.json* file in root
3. Run recreate_api.sh script

