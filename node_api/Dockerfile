FROM node:0.12.2

# Bundle the application source
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

# Install application dependencies
RUN npm install

# Start the application
EXPOSE 3000
CMD ["node", "./app.js"]

