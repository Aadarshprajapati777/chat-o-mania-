FROM node:22

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Copy the custom type definition
# COPY src/types/express.d.ts ./src/types/

# Install additional type declarations
RUN npm install --save-dev @types/pg @types/dotenv

# Install remaining dependencies
RUN npm install

# Bundle app source
COPY . .

# Start the app
CMD ["npx", "ts-node", "src/index.ts"]
