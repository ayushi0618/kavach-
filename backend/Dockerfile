FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
# Create standard directories for runtime
RUN mkdir -p uploads/assets uploads/documents logs
EXPOSE 5000
CMD ["npm", "start"]
