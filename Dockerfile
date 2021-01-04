FROM node:alpine
RUN apk update && apk upgrade
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY /package.json .
RUN npm install
COPY . .
ENV PORT 3000
EXPOSE 3000
CMD ["npm", "start"]