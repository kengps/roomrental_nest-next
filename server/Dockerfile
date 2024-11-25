# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# สร้าง Prisma Client
#RUN npx prisma generate  # Add this line to generate Prisma client
RUN if [ -f ./prisma/schema.prisma ]; then npx prisma generate; fi
# Copy application code
COPY . .

EXPOSE 3000

# Start the application in development mode (สำหรับ development)
CMD ["npm", "run", "start:dev"]

# Stage 1: ใช้ Node.js Alpine image สำหรับการติดตั้ง dependencies
# FROM node:18-alpine AS build

# # ตั้งค่า working directory
# WORKDIR /app

# # คัดลอกไฟล์ package.json และ package-lock.json (หรือ yarn.lock)
# COPY package*.json ./

# # ติดตั้ง dependencies
# RUN npm install --development

# # คัดลอกโค้ดโปรเจกต์ทั้งหมด
# COPY . .

# # สร้าง Prisma Client (ถ้ามี schema.prisma)
# # RUN if [ -f ./prisma/schema.prisma ]; then npx prisma generate; fi
# RUN npx prisma generate  # Add this line to generate Prisma client

# # Stage 2: สร้าง image สำหรับ production โดยใช้ Alpine เพื่อให้เล็กลง
# FROM node:18-alpine

# # ตั้งค่า working directory
# WORKDIR /app

# # คัดลอกไฟล์จาก stage build มาใช้
# COPY --from=build /app /app

# # ติดตั้ง dependencies สำหรับ production เท่านั้น (หากไม่ได้ทำใน stage ก่อนหน้า)
# RUN npm ci --only=development

# # เปิดพอร์ต 3000 (หรือพอร์ตที่แอปใช้)
# EXPOSE 3000

# # คำสั่งเริ่มแอปใน production
# CMD ["npm", "run", "start:dev"]
