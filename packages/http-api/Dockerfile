FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY . .

RUN pnpm install

RUN pnpm build

ENV NODE_ENV=production

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
CMD wget --quiet --tries=1 --spider http://localhost:4000/api/v1/health || exit 1

CMD ["node", "packages/http-api/dist/server.js"]