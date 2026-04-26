FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY KawiNiveauApi.sln .
COPY KawiNiveauApi/KawiNiveauApi.csproj KawiNiveauApi/
RUN dotnet restore KawiNiveauApi/KawiNiveauApi.csproj

COPY . .
RUN dotnet publish KawiNiveauApi/KawiNiveauApi.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "KawiNiveauApi.dll"]
