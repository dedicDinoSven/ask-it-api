FROM node:17-alpine3.14
RUN mkdir -p /opt/app
WORKDIR /opt/
RUN adduser -S app
COPY . .
RUN npm install
RUN chown -R app /opt/app
USER app
EXPOSE 5000
CMD [ "npm", "run", "dev" ]