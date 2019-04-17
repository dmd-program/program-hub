# program-hub

## Default (Git Pages - Automatic when changes are pushed to the repo)
To manually build for git pages: ```bundle exec jekyll build```

## Local Development
See this page to install Jekyll for Github Pages development: https://help.github.com/en/articles/setting-up-your-github-pages-site-locally-with-jekyll

To develop locally: ```bundle exec jekyll serve```  
Follow instructions in terminal

Note: ```bundle exec jekyll serve``` fails to include production server config files, even if specified.

## Setting up a build and rsync deploy file (preferred method)

rsync must be installed on the server. This will sync only changed files.

```
#!/bin/sh
bundle exec jekyll build --config=_config.yml,_config-prod.yml && rsync -crz --delete-after --rsh='ssh -p2222'  _site/ user@example.org:/path-to-server-directory/
```

## Setting up a build and SCP deploy file

This will sync all files, even if they didn't change.

1. Create a `deploy.sh` file and modify the following code with your server connection settings (include the asterisk):

```
#!/bin/bash
bundle exec jekyll build --config=_config.yml,_config-prod.yml && scp -rp /local-source-path/* userna5@example.com:/path-to-put-files-on-server/
```  

2. `cd` into the folder with the `deploy` file.

3. Run `sudo chmod +x deploy.sh` to make it executable.

4. Run `./deploy.sh` to deploy to a production server.


## Production deployment
Run build command with an additional production configuration file: ```bundle exec jekyll build --config=_config.yml,_config-prod.yml```

Upload to server: ```./deploy```