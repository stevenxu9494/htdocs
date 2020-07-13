FROM node:8.11.2
RUN mkdir -p /usr/src/frontend
COPY dist /usr/src/frontend/dist
COPY authMiddleware.js /usr/src/frontend/
COPY data.json /usr/src/frontend/
COPY server.js /usr/src/frontend/server.js
COPY deploy-package.json /usr/src/frontend/package.json
WORKDIR /usr/src/frontend
RUN npm install
EXPOSE 3030
CMD ["node", "server.js"]