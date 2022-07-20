FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm install --frozen-lockfile --ignore-scripts
RUN npm run build
RUN npm prune --production # Remove dev dependencies

EXPOSE 5000
ENV HOST=0.0.0.0

CMD [ "npm", "run", "preview" ]