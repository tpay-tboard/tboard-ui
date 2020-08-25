# @tboard-ui

![Github Actions](https://github.com/tpay-tboard/tboard-ui/workflows/chromatic/badge.svg)

React UI Components library

[Storybook](https://master--5f22922f5d292e0022d686b2.chromatic.com)

## Requirement

- nvm
- node@lts

## Install

```shellscript
# install root dependencies
npm install

# install each packages dependencies
npm run lerna:bootstrap
```

## Update packages dependencies

```shellscript
npx lernaupdate

# you need to delete package-lock.json generated in each packages manually for now
# delete each packages' node_modules
npm run lerna:bootsrap
```

## Development

```shellscript
npm run storybook
```

## Deploy Storybook

- workflow 참고
  - chromatic: `.github/workflows/chromatic.yml`

## Publish

```shellscript
npm run lerna:publish
```
