# Cudos network docs

Repo for the [Cudos Network developer docs](https://cudos-network-docs.netlify.app/) which deploy automatically to https://docs.cudos.org/

## How to use

Pre-requisites:
- [Node.js](https://www.nodejs.org/)
- [Git LFS](https://git-lfs.github.com/)

### Local development:

This site uses Git LFS with Netlify Large Media. So you need to perform some steps BEFORE YOU CLONE THE REPO.
First check your git lfs version:

```
git lfs version
```
Check that the version is 2.5.1 or later. If it is not, install it from [Git LFS](https://git-lfs.github.com/)

Install the netlify-cli and login using the credentials in 1password marketing vault:
```
npm install -g netlify-cli
netlify login
```

Install the git netlify credential helper
```
netlify lm:install
```

You should see output like:
```
$ netlify lm:install
  ✔ Checking Git version [2.30.2]
  ✔ Checking Git LFS version [2.13.2]
  ✔ Checking Git LFS filters
  ✔ Installing Netlify's Git Credential Helper for Linux
  ✔ Configuring Git to use Netlify's Git Credential Helper
```

Verify that it has actually altered your git config:

```
cat ~/.gitconfig
```

You should see something like this at the end:

```
# This next lines include Netlify's Git Credential Helper configuration in your Git configuration.
[include]
  path = /home/<username>/.config/netlify/helper/git-config
```

If not, add it.

Now clone the repo!

### Run the site
```
npm install
npm run dev
```

Open a browser to view the site [http://localhost:8080](http://localhost:8080)

## Documentation
This is a [vuepress](https://vuepress.vuejs.org/) site, so all guidance on editing the site can be found there.
