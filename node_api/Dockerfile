FROM node:0.12.2

# Bundle the application source
COPY . /src

# Install application dependencies
RUN cd /src && npm install

# Start the application
EXPOSE 3000
CMD ["node", "/src/app.js"]

