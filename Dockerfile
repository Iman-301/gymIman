# Silver task Dockerfile for AAAGym backend
FROM node:20.11.0

WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install dependencies using lockfile (required by Silver)
RUN npm ci

# Copy backend source
COPY backend/ ./

# Build the NestJS application
RUN npm run build

# Expose port (optional, for documentation)
EXPOSE 3000

# Default command
CMD ["npm", "run", "start:prod"]
