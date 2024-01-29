# pull python image
FROM python:3.11-slim as base

# set working directory
WORKDIR /app

# set python environment
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/

# set environment variables
ARG ENVIRONMENT=prod
ENV ENVIRONMENT=${ENVIRONMENT}

# set virtual environment
ENV VIRTUAL_ENV=/venv
RUN python3 -m venv ${VIRTUAL_ENV}
ENV PATH="${VIRTUAL_ENV}/bin:$PATH"

# install system dependencies
RUN apt-get -y update \
  && apt-get -y upgrade \
  # && apt-get -y install netcat gcc postgresql \
  # && apt-get -y install gcc \
  && apt-get clean

# use base for build
FROM base as builder

# prevent poetry virtual environment
ENV POETRY_VIRTUALENVS_CREATE false

# copy in local packages for installation
COPY ./local_package /app/local_package

# install python dependencies
RUN pip install --upgrade pip \
  && pip install --no-cache-dir poetry
COPY ./src/pyproject.toml ./src/poetry.lock ./
RUN bash -c "if [ ${ENVIRONMENT} == 'dev' ] || [ ${ENVIRONMENT} == 'proxy' ] ; \
  then . /venv/bin/activate && poetry install --no-root --no-interaction; \
  else . /venv/bin/activate && poetry install --no-root --no-interaction --no-ansi --only main; fi"

# lint and stop build if fail for CI/CD
# COPY . .
# RUN pip install black flake8 isort
# RUN flake8 .
# RUN black .
# RUN isort .

# use base for final image
FROM base as final

# copy built venv folder
COPY --from=builder /venv /venv

# copy src to app folder
COPY ./src/app .

# use a non-root user
RUN addgroup --system school && adduser --system --ingroup school fish
RUN chown -R fish:school /app
USER fish

# start the worker
CMD uvicorn main:app --workers 1 --host 0.0.0.0 --port ${PORT-8080} --log-level info

# keep container alive for inspection
# CMD sh -c "while true; do sleep 1; done"
