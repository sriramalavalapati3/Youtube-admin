# Use the specific Node.js version
FROM node:16.16.0

# Set the working directory inside the container
WORKDIR /src/index

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Clear npm cache and install the application dependencies
RUN npm cache clean --force && npm install

# Copy the entire source code to the working directory
COPY . .

# Set environment variables
ENV PORT=8080

# Expose the port that the application listens on
EXPOSE 8080

# Specify the command to run the application
CMD ["npm", "start"]
