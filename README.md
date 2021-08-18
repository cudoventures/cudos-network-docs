# Cudos network docs

Repo for the [Cudos network wiki docs](https://cudos-network-docs.netlify.app/).

## How to use

Pre-requisites:
- [Node.js](https://www.nodejs.org/)
- [Git LFS](https://git-lfs.github.com/)

### Local development:

This site uses Git LFS with Netlify Large Media. First check your git lfs version:

```
git lfs version
```
Check that the version is 2.5.1 or later. If it is not, install it from [Git LFS](https://git-lfs.github.com/)

Next install the netlify-cli and the git netlify credential helper:
```
npm install -g netlify-cli
netlify lm:install
```

`netlify lm:info` should now respond with something like:
```
  ✔ Checking Git version [Git-130)]
  ✔ Checking Git LFS version [2.13.3]
  ✔ Checking Git LFS filters
  ✔ Checking Netlify's Git Credentials version [0.1.10]
```

If there are any crosses, seek help.

### Running the site
```
npm install
npm run dev
```

Open a browser to view the site [http://localhost:8080](http://localhost:8080)

## Documentation
This is a [vuepress](https://vuepress.vuejs.org/) site, so all guidance on editing the site can be found there.

