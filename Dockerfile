FROM node:20.11.0-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci

COPY backend/ ./
RUN mkdir -p uploads/gym-images && npm run build

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
