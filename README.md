# Svelte Starter Kit

This project was initialized with the Svelte Starter Kit


## Local setup

Run the script in the `scripts directory` for setting up the project:

```shell
./scripts/initial-setup.sh
```


## Features 

### API

The `baseAPI` class can serve as a basis for all of your project specific data fetching needs.  The class should standardize how requests are made to an application backend, particularly for common tasks such as building authorization headers and converting responses into JS objects that can be used by the rest of the app. 

#### Setup

1.  If your project has a version of the API that you can safely develop against locally, update your default configuration. <br /> In `static/config/config.example.json`, replace the `baseUrl` value with the URL of the local version of your API.
2.  If your API needs some kind of authorization token, set up the logic for including that in requests in the `baseApi` class.  If it is a bearer token, then all you need to do is update the `getBearerToken` method with however you are storing the bearer token (ie: if a logged-in user has a bearer token, you might store that in the message bus).  Additionally, there are unit tests in `baseApi.spec.ts` covering ensuring that the auth header is correctly built.  Update these tests to properly test that your auth headers are being built once you have an implementation in place.