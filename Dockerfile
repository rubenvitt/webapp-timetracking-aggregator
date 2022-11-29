FROM docker.rubeen.dev/docker/node-18-with-pnpm:latest

WORKDIR /app
ENV PORT=3000
ENV HOST=0.0.0.0
EXPOSE 3000

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .
RUN pnpm run build
RUN pnpm prune --prod --config.ignore-scripts=true

CMD [ "node", "./build/index.js" ]
