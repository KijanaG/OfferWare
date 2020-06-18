FROM node:12
# Add a new user "shopify" with user id 7385
RUN useradd -u 7385 shopify
# Change to non-root privilege
USER shopify
# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app
# Installing dependencies
COPY package*.json ./
RUN npm install
# Copying source files
COPY . .
# Building app
RUN npm run build
EXPOSE 8080
# Running the app
CMD [ "npm", "start" ]
