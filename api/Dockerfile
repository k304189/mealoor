FROM python:3

ENV PYTHONUUNBUFFERED 1

ARG API_GID
ARG API_UID
ARG API_UNAME

RUN groupadd -g ${API_GID} ${API_UNAME} && \
    useradd -m -s /bin/bash -u ${API_UID} -g ${API_GID} ${API_UNAME} && \
    mkdir -p /code/static

WORKDIR /code

COPY requirements.txt /code

RUN pip install -r requirements.txt

COPY . /code

RUN chown -R ${API_UNAME}:${API_UNAME} /code

USER ${API_UNAME}
