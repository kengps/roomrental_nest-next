# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# สร้าง Prisma Client
RUN npx prisma generate  # Add this line to generate Prisma client
# Copy application code
COPY . .

EXPOSE 3000

# Start the application in development mode (สำหรับ development)
CMD ["npm", "run", "start:dev"]
