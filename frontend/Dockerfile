# Стадия сборки
FROM node:20 AS build
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json* ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной код
COPY . .

# Собираем проект
RUN npm run build

# Стадия рантайма
FROM nginx:alpine AS runtime

# Удаляем содержимое директории nginx
RUN rm -rf /usr/share/nginx/html

# Копируем результат сборки из стадии build
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]

