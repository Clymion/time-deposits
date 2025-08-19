# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# These are copied separately to take advantage of Docker layer caching.
COPY package.json ./
COPY package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application's source code from the context to the working directory
COPY . .

# Make port 5173 available to the world outside this container
EXPOSE 5173

# Run the app when the container launches
# Use --host to expose the server to the host machine
CMD ["npm", "run", "dev", "--", "--host"]
