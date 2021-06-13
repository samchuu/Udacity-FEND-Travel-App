# FEND CAPSTONE - TRAVEL APP

## Overview

This project is the final capstone project of Udacity's Front End Development Nanodegree. From the course:

> This project requires you to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.

## Instructions

### 1. Setting up the Project

Fork the project Github repo, and then clone or download the zip file locally. Once you have the project locally, navigate to the project directory to install all dependencies.

```
cd <project directory>
npm install
```

### 2. API Keys

Register for an account to get your own API key.

```
GeoNames[here](http://www.geonames.org/export/web-services.html)
Weatherbit[here](https://www.weatherbit.io/account/create)
Pixabay[here](https://pixabay.com/api/docs/)
```

At the root of the project, create a new file named `.env`.

```
`GEO_API_KEY = ********************`
`PIX_API_KEY = ********************`
`WEATHERBIT_KEY = ********************`
```

### 3. Run server

```
npm run build-prod
npm run start
```

This will create a `dist` folder and the production server runs on `localhost:8081`
