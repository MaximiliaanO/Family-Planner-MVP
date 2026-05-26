FROM node:alpine3.22
WORKDIR /app
COPY ./family-planner .
RUN npm install
RUN npm run build
RUN npm install -g serve
USER node
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]