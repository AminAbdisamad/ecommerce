# GraphQL Commands

## Get Authorized User

```bash

query{
  authenticatedItem{
    ... on User{
      name
    }
  }
}

```

Let's you're querying Media Type

```
query Media{
    ... on TVShow{
        eposite.length
    }

    ... on Movie{
        time
    }
}
```
