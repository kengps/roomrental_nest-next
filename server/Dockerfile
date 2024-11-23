# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm install

# สร้าง Prisma Client
RUN npx prisma generate  # Add this line to generate Prisma client
# Copy application code
COPY . .

# Run Prisma generate (เพื่อสร้าง Prisma client)
RUN npx prisma generate

# Push changes to DB
RUN npx prisma db push
# Expose the port
EXPOSE 3000

# Start the application in development mode (สำหรับ development)
CMD ["npm", "run", "start:dev"]
