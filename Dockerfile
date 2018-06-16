FROM node:8-alpine
RUN mkdir /code
WORKDIR /code
RUN npm i
ADD . /code/
RUN chmod 777 /code/entrypoint.sh