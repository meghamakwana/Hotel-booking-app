# Use official node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript code if required
RUN npm run build

# Expose the port and start the app
EXPOSE 3000
CMD ["npm", "start"]
