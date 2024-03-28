# Serve Query CLI


 Serve Query CLI makes easy to manage your back office application directly from the terminal.

## Install

    $ npm install -g servequery-cli

## Commands

    $ servequery [command]

### General

- `user` display the current logged in user.
- `login` sign in to your Serve Query account.
- `logout` sign out of your Serve Query account.
- `help [cmd]` display help for [cmd].

### Projects

Manage Serve Query projects.

- `projects` list your projects.
- `projects:create <appName>` generate a backend application with an ORM/ODM configured.
- `projects:get` get the configuration of a project.

### Environments

Manage Serve Query environments.

- `environments` list your environments.
- `environments:get` get the configuration of an environment.
- `environments:create` create a new environment.
- `environments:delete` delete an environment.

Without the Development Workflow experience.
- `environments:copy-layout` copy the layout from one environment to another.

With the Development Workflow activated.
- `init` set up your development environment in your current folder.
- `branch` create a new branch or list your existing branches.
- `switch` switch to another branch in your local development environment.
- `push` push layout changes of your current branch to a remote environment.
- `deploy` deploy layout changes of an environment to the reference one.
- `environments:reset` reset a remote environment by removing all layout changes.

### Schema

Manage Serve Query schema.

- `schema:apply` apply the current schema of your repository to the specified environment (using your `.servequery-schema.json` file).
- `schema:diff` allow to compare two environment schemas.
- `schema:update` refresh your schema by generating files that do not currently exist.

## Docker

### ENV variables

- `DATABASE_SCHEMA` the schema used by the database. (not for all commands)
- `DATABASE_URL` the connection string. (not fot all commands)
- `SERVEQUERY_ENV_SECRET` the env secret token used to access your Serve Query environment.
- `SILENT` used to not log commands results. (optional)
- `TOKEN_PATH` path where store the session token. (need to be "/usr/src/cli" to work with the docker image)

If you have an `.env` file in you current folder docker should take it to run commands. So you can define the missing ENV variable inside.
Otherwise you should pass all env variable you need in the `docker run` command, eg: `-e TOKEN_PATH="/usr/src/app"`.

### Using Serve Query CLI
- `TOKEN_PATH`="/usr/src/cli"

```bash
docker run --rm --init -it -v `pwd`:/usr/src/app -v ~/.servequery.d:/usr/src/cli/.servequery.d -e TOKEN_PATH="/usr/src/cli" servequery/:latest [command]
```

