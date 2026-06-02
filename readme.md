# distilled-spec-clerk

A git mirror of Clerk's API spec. The spec is fetched and committed as a JSON file so the repo serves as a versioned snapshot.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Spec source(s)

- https://raw.githubusercontent.com/clerk/openapi-specs/main/platform/beta.yml
- https://raw.githubusercontent.com/clerk/openapi-specs/main/bapi/2025-11-10.yml

## Usage as a submodule

```sh
git submodule add https://github.com/alchemy-run/distilled-spec-clerk.git
```

## Updating specs

From `.meta/`:

```sh
bun install
bun run fetch-specs
```
