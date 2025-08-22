# BASE #
# pull python image
FROM python:3.10-slim as base

# set working directory
WORKDIR /app

# set python environment
ENV PYTHONDONTWRITEBYTECODE=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONPATH=/app

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
  && apt-get -y install libzbar0 \
  && apt-get -y install poppler-utils \
  && apt-get -y install ffmpeg libsm6 libxext6 \
  && apt-get clean

# BUILDER #
# use base for build
FROM base as builder

# prevent poetry virtual environment
ENV POETRY_VIRTUALENVS_CREATE false

# install python dependencies
RUN pip install --upgrade pip \
  && pip install --no-cache-dir poetry
COPY ./src/pyproject.toml ./src/poetry.lock ./
RUN bash -c "if [ ${ENVIRONMENT} == 'dev' ] ; \
  then . /venv/bin/activate && poetry install --no-root --no-interaction; \
  else . /venv/bin/activate && poetry install --no-root --no-interaction --no-ansi --without dev; fi"

# lint and stop build if fail
COPY . .
# RUN pip install black flake8 isort
# RUN flake8 .
# RUN black .
# RUN isort .

# FINAL #
# use base for final image
FROM base as final

# copy built venv folder
COPY --from=builder /venv /venv

# copy src to app folder
COPY ./src .

# use a non-root user
RUN addgroup --system monkies && adduser --system --ingroup monkies monkey
# RUN chown -R monkey:monkies /app /venv
RUN chown -R monkey:monkies /app
USER monkey

# start the worker
CMD gunicorn --bind :${PORT-8080} app.main:app --workers 1 --threads 8 --timeout 0 --preload

# keep container alive for inspection
# CMD sh -c "while true; do sleep 1; done"
