FROM node:20-alpine

WORKDIR /apps

COPY package*.json ./
COPY tsconfig.json ./

COPY apps/shortner-redirect ./apps/shortner-redirect
COPY libs ./libs

RUN npm install

EXPOSE 3000
RUN ls
CMD ["nest start shortner-redirect"]