# makinox-g11n

Used:

- React
- Nx
- Typescript

This is a framework to manage project translations.

Mainly and in its first version it only works with google sheets but you are welcome to add more, I chose google sheets because it is free.

## Initialize

You must create a file with these private variables

```ts
export default {
  TRANSLATION_DIR: './apps/front/common/translations', // Place where the translations will be saved
  GOOGLE_SHEET_DEFAULT_TITLES: ['foo', 'faa', 'fee'], // Sheets to be read, you can also specify a sheet with this argument --sheet
  GOOGLE_SHEET_ID: 'xxxxxxx', // Google Sheet ID that appears in the URL
  GOOGLE_CLIENT_EMAIL: 'xxxxxxxx', // These last two data are taken from the google developer console creating an IAM user
  GOOGLE_PRIVATE_KEY: 'xxxxxxx',
};
```

## Identify

Identifies the google sheet and create the data with this format

| key     | lang  | lang  | lang  | lang  |
|---------|-------|-------|-------|-------|
| keyName | value | value | value | value |
| keyName | value | value | value | value |
| keyName | value | value | value | value |

## Generate

At this point you already have the data, it only remains to generate those files to json, in the future I would like to be able to generate it in more formats.

```bash
# Install the dependencies
yarn
-----
yarn install
-----
npm install
```

```bash
# Generate all sheets
nx run generator:start
```

```bash
# Generate a specific sheet
nx run generator:start --sheet=Front
```

The files will be generated where you specified in `TRANSLATION_DIR`

## Watch

You can find, see and modify all translations of all your sheets in the app running this command

```bash
nx run front:serve
```

## Contributing

If you're interested in contributing to project, please read our [contributing docs](https://github.com/makinox/makinox-g11n/blob/main/.github/CONTRIBUTING.md) **before submitting a pull request**.