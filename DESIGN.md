## Architecture
The SDK models each API endpoint described [here](https://the-one-api.dev/documentation) as a `Resource` class that implements
a `IResource` interface.

Furthermore, each resource has access to a singleton `APIClient` through dependency injection.

Filtering the records is made easier by following a specific token format. The `APIClient` is responsible for the conversion
of the filter tokens into query string that the REST API can understand. Actual HTTP requests go in the `APIClient` as well.
