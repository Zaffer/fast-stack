⚡ Fast Stack
---------

# INTRODUCTION
FastAPI                 backend API
SQLModel                SQL database ORM and API schemas
Angular                 frontend framework
Angular Material        frontend admin dashboard
Angular Ionic           frontend web and native apps
Auth0                   authentication and authorisation
Firestore               document database
PostgreSQL              relational database
Google Cloud Platform   cloud infrastructure
Firebase                web hosting
Docker Compose          containerisation


Roadmap:
- [ ] full pnp for yarn (currently Anuglar has issues with Yarn pnp)
- [x] ~~containerise Angular pgAdmin4~~
- [x] ~~Add Grafana as service to visualise your data~~
- [x] ~~Make a single Mat Web service~~
- [x] ~~Add Ionic service~~
- [ ] iframe grafana oss into angular dashboard
- [ ] fix github actions to pull secrets from Google Secret Manager
- [x] clean up ng templates to do the following only:
  - Angular Ionic, Firebase Auth, Firestore, Cloud Functions
  - Angular, Material Design, Auth0, API

    > The following is get pnp working once Angular supports it again.
    `yarn add -D @types/node`
    `yarn build`
    `yarn start`
    `yarn dlx @yarnpkg/sdks vscode`
    > add paths to your app's .yarn file in workspace root .vscode/settings.json


## Using this template repo

Copy this repo as a template.
> to pull in future updates of these template to your own repo
Add this repo as a remote called "templates"
Git fetch from all remotes.
Merge from template using this line to remove templates' histories:
`git merge template/master --strategy-option ours --squash`
`git pull https://github.com/Zaffer/fast-stack master --ff --allow-unrelated-histories`


# SERVICES

## Web Admin
- Angular
- Material Design
- Auth0

## Web App
- Angular
- Ionic
- Firebase Auth
- Cloud Functions
- Firestore

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


# TOOLS

1. db-local
    - Local Postgres db for development

1.  pgAdmin
    - This is a GUI for postgresql. It is not required but it is very useful for development.

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

1. cloudsql-proxy
    - for connecting to cloud db from your local environment


1. grafana
    - for viewing analytics
    - Dockerfile builds a version that includes a custom branding and pre-installs plugins



## Notes

### Github Actions
IMPORATANT NOTE: Github Actions secrets is only free from public repos, if you need a private or organisation repo you need to update the workflow to not use secrets.
To do this you remove the references to secrets and replace those environment variables with your Google Cloud Project's WIF provider and service account.

Workload Identity Federation (WIF) is a feature of Google Cloud Platform that allows you to access Google Cloud resources from on-premises or other cloud environments. With WIF, you can access Google Cloud resources from AWS, Azure, or any identity provider that supports OpenID Connect (OIDC).
> more info: https://cloud.google.com/iam/docs/workload-identity-federation


==============================

![Continuous Integration and Delivery]"(https://github.com/your-firebase-project/workflows/Continuous%20Integration%20and%20Delivery/badge.svg?branch=master)"


# ENVIRONMENT
1. Ubuntu on Windows using WSL2
    - https://learn.microsoft.com/en-us/windows/wsl/install-manual

1. Visual Studio Code
    - suggest extensions
      - Python
      - Pylance
      - Docker
      - Mypy Type Checker
      - Black Formatter
      - Ruff
      - Prettier - Code Formatter
      - Thunder Client
      - GitHub Copilot
    
1. Google Cloud CLI
    - https://cloud.google.com/sdk/docs/install
      - `snap install google-cloud-cli --classic`
    - add to bashrc: `source /snap/google-cloud-cli/current/completion.bash.inc`

    - Create Service Account Key of signed in user for ADC
      - `gcloud auth application-default login`
      - `sudo chmod 644 ~/.config/gcloud/application_default_credentials.json`
      > Remember to revoke when you no longer need access (`gcloud auth application-default revoke`)

    - Authorise Docker Cred Helper (https://cloud.google.com/artifact-registry/docs/docker/authentication#gcloud-helper): 
      - `gcloud auth configure-docker europe-west1-docker.pkg.dev`

    - Default settings:
    `glcoud config list`
    `cloud config set project PROJECT_ID`
    `gcloud config set billing/quota_project`
    `gcloud config set compute/region europe-west-1`
    `gcloud config unset compute/region`


1. Docker
    - install Docker Desktop: https://www.docker.com/products/docker-desktop/

1. Github
    - `git config --global user.name "YOUR USERNAME"`
    - `git config --global user.email "YOUR EMAIL"`

1. Pip
   - install pip 
     - `sudo apt install python3-pip`

1. Pyenv
    - (optional) https://github.com/pyenv/pyenv
      > note: currently poetry will only install using the system version of python, it wont use the pyenv shims


1.  Poetry
    - https://python-poetry.org/
    - add to bashrc: `export PATH="$HOME/.local/bin:$PATH"`


1. Node
   - install fnm ([https://github.com/nvm-sh/nvm](https://github.com/Schniz/fnm))
     - `curl -fsSL https://fnm.vercel.app/install | bash`
     - `source ~/.bashrc`
     - `fnm use --install-if-missing 22`
     - `node -v`
     - `npm -v`

   - install global Angular CLI's:
     - `npm install -g @angular/cli`
     - `npm install -g firebase-tools`
     - `npm install -g @ionic/cli`


1. Yarn
    - Install Yarn: https://yarnpkg.com/getting-started/install
      - `corepack enable`

    - Project setup:
      - cd into the app folder
      - `yarn set version stable`
      - `yarn install`

    - Angular compatability:
      - add `nodeLinker: node-modules` to .yarnrc.yml


1. Angular

    - Project Setup:
      - create new project using CLI: `ng new my-project --package-manager yarn`
      - Set yarn as you package manager globally: `ng config -g cli.packageManager yarn`

    
1. bashrc

    - `nano ~/.bashrc`
    - should look like this at the end of the file
    ```sh
    ...

    # pyenv
    export PYENV_ROOT="$HOME/.pyenv"
    command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
    eval "$(pyenv init -)"
    eval "$(pyenv virtualenv-init -)"

    # poetry
    export PATH="/home/james/.local/bin:$PATH"

    # gcloud cli
    source /snap/google-cloud-cli/current/completion.bash.inc

    # nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

    # Load Angular CLI autocompletion.
    source <(ng completion script)

    # terminal tab completion
    bind 'set show-all-if-ambiguous on'
    bind 'TAB:menu-complete'
    bind '"\e[Z":menu-complete-backward'
    ```

## Visual Studio Code Settings

  - paste into .vscode/settings.json
  > swap `{-api-QN8QTDzb-py3.10-}` with your venv name

  ```json
  {
    "python.defaultInterpreterPath": "~/.cache/pypoetry/virtualenvs/{-api-QN8QTDzb-py3.10-}/bin/python",
    "python.terminal.activateEnvironment": true,
    "python.analysis.extraPaths": ["services/_api/src"],
    "python.analysis.autoFormatStrings": true,
    "mypy-type-checker.severity": { "error": "Information", "note": "Hint" },
    "[python]": {
      "editor.formatOnSave": true,
      "editor.codeActionsOnSave": {
        "source.fixAll.ruff": true,
        "source.organizeImports.ruff": true
      }
    },
    "[typescript]": {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[html]": {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "search.exclude": {
      "/.yarn": true,
      "/.pnp.*": true,
      "/node_modules": true,
      "/.angular": true,
      "/android/": true,
      "/www": true
    }
  }
  ```



# SCRIPTS

## Start
Customise and run start.sh to bring all the services you want to develop on:
```sh
sh start.sh
```

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

## Linux
Update and upgrade Ubuntu packages
```sh
apt-get -y update
&& apt-get -y upgrade
&& apt-get clean
```

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

New Angular setup:
```bash
ng new my_app --package-manager=yarn
```

Set package manager to yarn:
```bash
ng config cli.packageManager yarn
```

Create new service
```bash
ng generate service services/<service-name>
```

Create new component, then remove dry-run if happy to create
```bash
ng g c feature -m features.module --dry-run
```

Options for generating componets
```bash
ng g c manage-users-layout --style none --skip-tests --flat --skip-import --dry-run
```

## Yarn

Upgrade all packages in repo at once
```sh
yarn upgrade-interactive --latest
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

Generate modules, pages, components, and services (add `--dry-run` to test first):
`ionic generate module things --routing --dry-run`
`ionic generate page /pages/thing --module=things`
`ionic generate compenent /components/thing`
`ionic generate service api/user`



### Build Android APK
`sudo apt install default-jre`
`sudo apt install default-jdk`
`sudo apt install android-sdk`
`sudo apt install sdkmanager`

`sudo sdkmanager "platforms;android-32" "build-tools;30.0.3"`
`sudo cp -R /opt/android-sdk/licenses/* /usr/lib/android-sdk/licenses`
`sudo cp -R /opt/android-sdk/build-tools/* /usr/lib/android-sdk/build-tools`
`sudo cp -R /opt/android-sdk/platforms/* /usr/lib/android-sdk/platforms`
`sudo sdkmanager --licenses`

Create a `local.properties` file inside `app/android`:
insert this into the file: `sdk.dir=/usr/lib/android-sdk`

`ionic cap build --no-open --androidreleasetype APK android`
`cd android`
> test on for unsigned apk
`./gradlew assembleDebug`

> test for signed apk
`./gradlew assembleRelease`

## Firebase

`firebase deploy -m "Deploying the best new feature ever."`

Emulater mode UI
`firebase emulators:start`
`firebase emulators:start --only auth`


## OpenAPI Generator
1. Download openapi.json from API page
2. Replace */openapi.json* file in root
3. Run recreate_api.sh script


# TROUBLESHOOTING

### GCloud CLI:
- if using linux and getting "open in browser error" then use `gcloud init --no-launch-browser` to login

- if you mess up with Application Default Credentials sometimes it makes a folder where it expects a file at this location: `~/.config/gcloud/application_default_credentials.json`. Delete and the directory and recreate the json file.


- "OCI runtime exec failed: exec failed: unable to start container process: exec: "alembic": executable file not found in $PATH: unknown"
  - likely that your image running locally is the production version, rebuild your image for dev environment first then run start-dev.sh again.

### WSL disk out of space
- Get the full path to your VHDX file.
- Find by going to WSL2 instance package directory in: "C:\Users\james\AppData\Local\Packages\."
- Followed by vendor name: ie. "CanonicalGroupLimited" for Ubuntu.
- VHDX is in the LocalState subdirectory: eg. "C:\Users\james\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu_79rhkp1fndgsc\LocalState\ext4.vhdx"

1. Shutdown Docker Desktop.
1. Open Powershell as administrator
1. `wsl.exe --shutdown`
1. `diskpart`
1. `select vdisk file="C:\Users\james\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu_79rhkp1fndgsc\LocalState\ext4.vhdx"`
1. `attach vdisk readonly`
1. `compact vdisk`
1. `detach vdisk`

### EACCESS
> "EACCES issues with mkdir for /.angular"
You got some issue with the permissions of your directories. Most likely caused be the docker container generating files in mounted directory. You need to delete those generated files yourself, or changes the permissions yourself.
Fall back option is to clone the whole repo again, unless you have those generated files in your github. Then you need to do the above or start a new branch from master again.

### IsADirectoryError
> "IsADirectoryError: [Errno 21] Is a directory: '/tmp/keys/application_default_credentials.json'"

You did you not complete the glcoud app default login process correctly, and now taht json file is actuall a dir.
You need to go to that dir, delete it, and do the gcloud login process again. Is must be a .json file, not a directory. 

# BONUS

### terminal tab completions
add this to your .bashrc for tab completion in the terminal:

```
# terminal tab completion
bind 'set show-all-if-ambiguous on'
bind 'TAB:menu-complete'
bind '"\e[Z":menu-complete-backward'
```

### terminal prompt
https://starship.rs/
