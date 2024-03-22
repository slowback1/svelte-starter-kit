# Svelte Starter Kit

This project was initialized with the Svelte Starter Kit


## Local setup

Run the script in the `scripts directory` for setting up the project:

```shell
./scripts/initial-setup.sh
```


## Features 

### Message Bus

The `MessageBus` class is a framework-agnostic way of sending and receiving messages across discrete parts of the frontend.  Any component can "subscribe" to a message, and fire a callback function whenever a message of a particular type is sent with the message payload as a parameter.  This has many uses in modern web-app development, from storing user session data to firing off notification events to display a toast, or controlling unrelated pieces of the app remotely.  See how it is used in various components in the repo for some examples of how this can be used.

#### Setup

By default, the `MessageBus` uses `localStorage` as a data persistence layer.  If this is undesired, remove the `MessageBus.initialize` method call in the base `+layout.svelte` to remove it.  This will cause the Message Bus to "forget" events each time the user reloads or leaves the page.

Alternatively, if a different way of persisting message bus data is preferred (for example, session storage instead of local storage), replace the implementation in the `getRealStorageProvider` method, and the message bus will start persisting data through that method instead. 

### UI Components

The starter kit houses several UI components in the `src/lib/ui` directory.  These components should all be accessible and function for what they are intended to do.  The list of components available in the starter kit will continue to grow, and any user of the starter kit is encouraged to contribute back any new generic UI components they build back into the starter kit for use in future projects!

Note that all the components have intentionally "rough" designs.  The starter kit is not interested in giving a full-fledged design system out of the box.  Instead, each project should update the styles of these components and make them fit the needs of the project. 

### API

The `baseAPI` class can serve as a basis for all of your project specific data fetching needs.  The class should standardize how requests are made to an application backend, particularly for common tasks such as building authorization headers and converting responses into JS objects that can be used by the rest of the app. 

#### Setup

1.  If your project has a version of the API that you can safely develop against locally, update your default configuration. <br /> In `static/config/config.example.json`, replace the `baseUrl` value with the URL of the local version of your API.
2.  If your API needs some kind of authorization token, set up the logic for including that in requests in the `baseApi` class.  If it is a bearer token, then all you need to do is update the `getBearerToken` method with however you are storing the bearer token (ie: if a logged-in user has a bearer token, you might store that in the message bus).  Additionally, there are unit tests in `baseApi.spec.ts` covering ensuring that the auth header is correctly built.  Update these tests to properly test that your auth headers are being built once you have an implementation in place.

### Runtime Configuration

The starter kit has a default way of retrieving run-time configuration on page load and storing this in the message bus.  Any usage of configuration in the app should go through the `ConfigService` class for consistency and type-safety.

#### Setup

Update the `ApplicationConfig` type to match the configuration structure of your project.  Make sure to keep the example config file (`static/config/config.example.json`) up to date with a good starting point for local development!

It is usually a good idea to re-run `scripts/initial-setup.sh` after making any changes to the example config JSON file, so that those changes are reflected in your local development environment.

At runtime, the application will be looking for `config/config.json` for its runtime config.

### Deploying

The starter kit is set to build as a static site by default.  This should work for websites and web apps with static URLs.  If you need to use dynamic path parameters, or if you would prefer to build a server rendered app instead, follow the steps in the `Switch to a Server Rendered Deployment` section below.

#### Setup

Run `scripts/build-docker-image.sh` in your CI environment to build and push a new docker image (note that this script assumes certain environment files are present, look at the contents of the script for exact details).  The image only exposes port 80, so it is recommended to put the deployed container behind a reverse proxy, such as traefik.

If you need to deploy in a non-docker environment, your CI environment should be able to run `npm run build:ci`, and copy the contents in the `./build` directory to a hosting environment. 

#### Switch to a Server Rendered Deployment

1. In `package.json`, replace the `@sveltejs/adapter-static` dependency with `@sveltejs/adapter-node` (at the time of writing this, version `1.3.1` confirm works with the rest of the versions installed in this starter kit)
2. In `svelte.config.js`, replace the adapter import from `import adapter from '@sveltejs/adapter-static';` to `import adapter from '@sveltejs/adapter-node';`
3. Delete the layout file in `src/routes/+layout.ts`
4. Replace the `final` stage in the dockerfile (found at `docker/Dockerfile`) with the following contents:
```dockerfile
FROM node:18-alpine as final
COPY --from=builder app/build build/
COPY --from=builder app/node_modules node_modules/
COPY package.json .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "build"]
```

Note that this exposes a different port (3000) than the static site build, so if you have any existing deployments, you may need to update the networking to accommodate this.