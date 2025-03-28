# Stage 1: Build Angular app
FROM node:18 AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build Angular app (dùng lệnh trong package.json)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built Angular files to Nginx public folder
COPY --from=builder /app/dist/mailer-fe /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
