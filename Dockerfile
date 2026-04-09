FROM node:18-alpine

WORKDIR /app

COPY package*.json .

COPY ./app .

#enviroments variables
ENV OPENAI_API=""
ENV GEO_API=""
ENV DATABASE_URI="" 

EXPOSE 3000

CMD ["node", "index.js"]

