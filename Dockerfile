# Base NodeJS Image
FROM node:16.17-bullseye-slim as builder

# Python installation for hummus package issue
RUN apt-get update || : && apt-get install python -y
RUN apt install build-essential -y --no-install-recommends

# Copy package.json to cache
COPY package.json /app/package.json
RUN cd /app && npm install


# Set the application directory
WORKDIR /app
# Copy all files
COPY . .
# Run NPM Install command
RUN npm run build

# Make port 12000 available for links and publish
EXPOSE 50051
# Final startup command
CMD ["npm", "run", "start"]