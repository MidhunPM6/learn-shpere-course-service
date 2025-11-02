# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package.json and install all dependencies (including devDependencies)
COPY package*.json ./
RUN npm install

# Copy TypeScript config and source code
COPY tsconfig.json ./
COPY src ./src

# Compile TypeScript
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine
WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy compiled files from builder stage
COPY --from=builder /app/dist ./dist

# Environment variables
ENV PORT=6001
ENV HOST=0.0.0.0

EXPOSE 6001

# Start the app
CMD ["node", "dist/index.js"]
