FROM node:8-alpine
RUN mkdir /code
WORKDIR /code
ADD . /code/
RUN npm i
RUN chmod 777 /code/entrypoint.sh