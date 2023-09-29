FROM node:lts as builder

ENV NODE_ENV build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build \
    && npm prune --production

# ---

FROM node:lts

ENV NODE_ENV production
ENV PORT=8080

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules/ ./node_modules/
COPY --from=builder /usr/src/app/dist/ ./dist/
COPY --from=builder /usr/src/app/client/ ./client/

COPY .env-prod ./.env

CMD ["node", "dist/main.js"]