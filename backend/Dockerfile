# Стадия сборки
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копируем файл проекта
COPY Backend.csproj .

# Восстанавливаем зависимости
RUN dotnet restore

# Копируем остальной код
COPY . .

# Собираем проект
RUN dotnet build -c Release -o /app/build

# Публикуем проект
RUN dotnet publish -c Release -o /app/publish

# Стадия рантайма
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Копируем результат сборки из стадии build
COPY --from=build /app/publish .

# Устанавливаем точку входа
ENTRYPOINT ["dotnet", "Backend.dll"]
