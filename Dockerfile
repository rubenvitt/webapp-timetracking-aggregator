FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm run build
RUN pnpm prune --production # Remove dev dependencies

EXPOSE 5000
ENV HOST=0.0.0.0

CMD [ "pnpm", "start" ]