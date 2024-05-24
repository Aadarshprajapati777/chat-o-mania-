FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install additional type declarations
RUN npm install --save-dev @types/pg @types/dotenv

# Install remaining dependencies
RUN npm install

# Bundle app source
COPY . .

# Start the worker
CMD ["npx", "ts-node", "src/index.ts"]
