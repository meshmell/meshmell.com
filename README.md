# Meshmell Website Source

Welcome to the source code repository for [Meshmell.com](https://meshmell.com), an engaging and dynamic public project. We are open to contributions and excited to collaborate with the community!

## Participating

Interested in contributing? Fantastic! Here’s how you can get started:

1. Clone this Repository
2. Change the name of `.env.sample` in the root directory to `.env`
3. Start a Local Server with `npm run dev` at `http://localhost:3000/`

## Technology Stack

- Typescript
- Node.js
- React
- Next.js
- Three.js
- React Three Fiber
- Prisma
- React Hook Form
- Zod
- Tanstack Query
- PostgreSQL
- Google Cloud Run
- Google Cloud Build
- Google Cloud Storage
- Docker

## Construction

### 1. PostgreSQL
We are utilizing PostgreSQL Database to store the following information:
- Exhibition
  - Category
  - 3D Models
  - 3D Models download count with timestamp
  - 3D Models Creators
  - Sponsors of this project
  - Actions of 3D Models
- Share
  -  Users
     - Models


#### Use Postgres in docker
For development purposes, we use the 

### 2. Google Cloud Storage (GCS)
We utilize Google Cloud Storage (GCS) for:
- Downloading 3D model data via client web app.
- Delivering images and displaying 3D models within the web application.

#### Use your own GCS cloud service
If you want to use cloud GCS services for your own 

1. Create a Google Cloud account and set up [GCS](https://cloud.google.com/storage).
2. Upload the content inside [/gcs_dev/test_bucket](https://github.com/meshmell/meshmell.com/tree/main/gcs_dev/test_bucket) directory to the GCS bucket.

3. Add or override each required values below at the `.env` file:
- `GCS_BUCKET_NAME`: Name of your GCS bucket.
- `GCS_TYPE`: Type of client authentication, typically service_account.
- `GCS_CLIENT_ID`: Client ID for your GCS service account.
- `GCS_PROJECT_ID`: GCS project ID.
- `GCS_CLIENT_EMAIL`: Client email associated with your GCS service account.
- `GCS_PRIVATE_KEY`: Private key for your GCS service account, often in JSON format.

#### Use GCS emulator in docker
For development purposes, we are employing a GCS Emulator that runs on Docker

1. inside `.env` file, change the environmental variable status
```
NEXT_PUBLIC_USE_GCS_EMULATOR="true"
```
2. Run `docker compose -f docker-compose.dev.emulators.yaml up gcs-emulator` at root directory in the Terminal to start the GCS emulator with Docker.

Now you can access to GCS emulator running in docker at `localhost:4443`. We use Fake GCS to store the 3D data of the models.

### 3. Client App running on Google Cloud Run

For the client web application, the source code can be found in this repository.

For development purposes, the application runs on your local machine (accessible at localhost:3000). You can start the development mode by executing `npm run dev`.

#### Use Docker for the Web (Next.js) App 

If you wish to run the Next.js web app inside a Docker container, command `docker compose -f docker-compose.dev.yaml up web -d` in the root directory.

## Tips

#### `NEXT_PUBLIC_ENV_STATUS` Environment Variable
We have defined three settings for the `NEXT_PUBLIC_ENV_STATUS` environment variable to accommodate different stages of development and deployment:

- `production`: This setting is for the production environment, utilizing Firebase and Google Cloud Storage (GCS) cloud services.
- `development`: This setting is for the local development environment, 

#### Shortcut command for run both Emulators (firebase and GCS)
You can run `docker compose -f docker-compose.dev.yaml up` to up both GCS and Firebase app container.

## Contributing

If you're interested in assisting with the development of this site, consider using the `develop` branch!

## Get Help, Contact

Feel free to open an issue or contact us at [email us](info.meshmell.com)

## License

[MIT](https://opensource.org/license/mit)

## Sponsors

We would be delighted to receive your support, and we will include your name on the Sponsor display modal. Please go to The menu (From Three line button at the right bottom) then click "For Sponsors"

## Special Thanks
The 3D models used on this website sourced from the following sites and express our gratitude to the creators for their contributions. Here are all the models, along with their source, creator, distributed website, and license on this site:

- Animated Cube by [Yuri Nakanishi](https://yurimell.com/). _CC0 license_
- [Sci-Fi Worker Robot](https://ryankingart.gumroad.com/l/kobsg?layout=profile) by [Yuri Nakanishi](https://yurimell.com/), sourced from [Ryan King Art](https://www.ryankingart.com/). _(Can't be downloaded from this app)_
(Yuri Nakanishi created the Sci-Fi Worker Robot while viewing this Ryan King Art's [video content](https://www.youtube.com/watch?v=3zvz1z5t8zA) on YouTube).
- [Potted Plant 01](https://polyhaven.com/a/potted_plant_01) by [Rico Cilliers](https://www.artstation.com/rico_b3d) from [Poly Heaven](https://polyhaven.com/). _CC0 license_
- [Wooden Crate 01](https://polyhaven.com/a/wooden_crate_01) by [James Ray Cock](https://www.artstation.com/jamesray) from [Poly Heaven](https://polyhaven.com/). _CC0 license_
- [Wooden Table 02](https://polyhaven.com/a/wooden_table_02) by [Serhii Khromov](https://www.artstation.com/serhiikhromov) from [Poly Heaven](https://polyhaven.com/). _CC0 license_
- [Food Apple 01](https://polyhaven.com/a/food_apple_01) by [Oliver Harries](https://oliverharries.myportfolio.com/) from [Poly Heaven](https://polyhaven.com/). _CC0 license_
- [Fox](https://quaternius.com/packs/ultimateanimatedanimals.html) by [Quaternius](https://quaternius.com/). _CC0 license_
- [Wicker Basket 01](https://polyhaven.com/a/wicker_basket_01) by [Kuutti Siitonen](https://www.artstation.com/KuuttiSiitonen) from [Poly Heaven](https://polyhaven.com/). _CC0 license_
- [Wooden Handle Saber](https://polyhaven.com/a/wooden_handle_saber) by [Ulan Cabanilla](https://www.polyhaven.com/a/wooden_handle_saber) from [Poly Heaven](https://polyhaven.com/). _CC0 license_
- [Wine Barrel 01](https://polyhaven.com/a/wine_barrel_01) by [James Ray Cock](https://www.artstation.com/jamesray) from [Poly Heaven](https://polyhaven.com/). _CC0 license_
- [Wolf](https://quaternius.com/packs/ultimateanimatedanimals.html) by [Quaternius](https://quaternius.com/). _CC0 license_
- [Book Encyclopedia Set 01](https://polyhaven.com/a/book_encyclopedia_set_01) by [John Malcolm](https://polyhaven.com/a/book_encyclopedia_set_01) from [Poly Heaven](https://polyhaven.com/). _CC0 license_
- [Round Wooden Table 01](https://polyhaven.com/a/round_wooden_table_01) by [Ulan Cabanilla](https://www.polyhaven.com/a/round_wooden_table_01) from [Poly Heaven](https://polyhaven.com/). _CC0 license_
- [Cardboard Box 01](https://polyhaven.com/a/cardboard_box_01) by [Rahul Chaudhary](https://www.artstation.com/rc12) from [Poly Heaven](https://polyhaven.com/). _CC0 license_
- [Dining Chair 02](https://polyhaven.com/a/dining_chair_02) by [James Ray Cock](https://www.artstation.com/jamesray) from [Poly Heaven](https://polyhaven.com/). _CC0 license_


## Database For Share

`docker compose -f docker-compose.dev.yaml up db -d --build` to up postgres docker container for development environment
`npx prisma migrate dev --name init` to up initiate prisma and migrate