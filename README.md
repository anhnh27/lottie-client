# React PWA

A graphql server's built from Typescript, ReactJs, bundldling tool using Vite.

## Features

- Search animations by keyword, will return animations that have fields(name, tags) contain keyword.
- View animation details, download, like
- Offline mode supports

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_PORT`

`VITE_API_BASE_URL`

## Run Locally

Clone the project

```bash
  git clone https://github.com/anhnh27/lottie-client.git
```

Go to the project directory

```bash
  cd lottie-client
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn dev
```

## Tech Stack

- ReactJS
- Redux toolkit
- Service worker
- Tailwind CSS, MUI Material
- IndexedDB (more storage capacity, structural data)
- react-hook-form to handle form data

* App is using IndexedDB to store data for offline mode.
* Using Dexie to work with IndexedDB, "dexie-react-hooks" to retrive & subscribed to changes from IndexedDB.
* Data is caching while user browsing online.
* When user is offline can access the data from local to view & update. Changes will be synced with server when user is back online again.

## CICD

The intergration and deployment are automated using github actions, client app will be distributed to AWS S3.

- AWS S3
- Cloudfront, Route53, ACM
