const { error } = require("console");
const fetch = require("node-fetch");

async function getContributors(reponame) {
  const url = `https://api.github.com/repos/${reponame}/contributors`;
  const data = await fetch(url);
  return data.json();
}

async function getStarred(username) {
  const url = `https://api.github.com/users/${username}/starred`;
  const data = await fetch(url);
  return data.json();
}

async function getStarredRepos(reponame) {
  try{
    let contributors = await getContributors(reponame);
    let contributorsList = contributors.map(user => user.login)

    let starredRepos = await Promise.all(contributorsList.map((user) => {
      return getStarred(user)
    }))

    let starredReposList = starredRepos[0].map(repo => repo.name)
    console.log(starredReposList)

  } catch (error) {
    console.log("Unable to fetch starred repos:", error)
  }
}

getStarredRepos("khaleelibraheem/nodejs-modules-live");

