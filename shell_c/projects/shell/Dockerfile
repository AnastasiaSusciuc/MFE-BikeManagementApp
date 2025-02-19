# Use a Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies, including @angular-architects/module-federation
RUN npm install @angular-architects/module-federation

# Install other project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular project
RUN npm run build

# Expose the application port
EXPOSE 4200

# Start the Angular application
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
