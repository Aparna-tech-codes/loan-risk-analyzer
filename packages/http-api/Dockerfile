FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY . .

RUN pnpm install

RUN pnpm build

EXPOSE 4000

CMD ["pnpm", "--filter", "@loan-risk/http-api", "dev"]