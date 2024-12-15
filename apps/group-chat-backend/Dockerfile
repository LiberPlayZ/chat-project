# Install dependencies only when needed
FROM 192.168.1.50:8082/node:18-alpine AS build
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /usr/src/app
COPY dist/apps/group-chat-backend/package.json ./
RUN npm config set registry http://verdaccio.iaf/
RUN npm install --omit=dev

# Production image, copy all the files and run nest
FROM 192.168.1.50:8082/node:18-alpine AS runner
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
COPY dist/apps/group-chat-backend .
RUN chown -R node:node .
USER node
EXPOSE 3000
CMD ["node", "main.js"]
