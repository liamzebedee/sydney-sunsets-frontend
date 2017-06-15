FROM node:8

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN mkdir -p /code/
WORKDIR /code/

COPY . /code/

ENTRYPOINT ["sh", "./entrypoint.sh"]

CMD ["npm", "run", "haveagreattime"]