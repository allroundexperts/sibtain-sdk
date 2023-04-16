# Installation

```bash
npm install @allroundexperts/tlor-sdk
```

# API
This SDK uses the API documented [here](https://the-one-api.dev/documentation)

# Usage

```js
import TLOR from '@allroundexperts/tlor-sdk';

const tlor = new TLOR('your-api-key');

const movie = await tlor.movie.getOne();
```

## Resources

### Movie

**Get All Movies**
```js
await sdk.movie.getAll();
```

**Get One Movie**
```js
await sdk.movie.getOne(id);
```

### Pagination

```js
sdk.movie.getAll({
    limit: 20, 
    offset: 10,
    page: 1,
});
```

### Sorting

```js
sdk.movie.getAll({
    sortBy: 'name',
    sortDirection: 'ASC',
});
```

### Filter

Filter tokens available:
```js
EQUAL
NOT_EQUAL
INCLUDE
NOT_INCLUDE
EXISTS
NOT_EXISTS
LIKE
GREATER_THAN
LESS_THAN
GREATER_THAN_EQUAL_TO
LESS_THAN_EQUAL_TO
```

```js
import {FilterToken} from "resource/IResosurce";
sdk.movie.getAll({
    filter: {[
        {key: 'name', op: FilterToken.EQUAL, value: 'Test'},
        {key: 'academyAwardWins', op: FilterToken.GREATER_THAN, value: 10}
    ]}
});
```