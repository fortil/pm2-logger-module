# pm2-logzio

Redirect PM2 app stdout/stderr to [Logz.io](https://logz.io/).

**Note:** This is currently meant for internal use. Use at your own risk.

## Configuration

You can run the following to set configuration options:

```bash
# Set Logz.io token (required)
pm2 set pm2-logger-module:api_token XXXXXXXXXXXXXXXXXXXXXXXX
# Set environment key name from NODE_ENV value (optional, defaults to `env`)
pm2 set pm2-logger-module:env_key_name NODE_ENV
# Set the default environment value if none is found (optional, defaults to `dev`)
pm2 set pm2-logger-module:default_env development
# Set to a truthy value if a string data value should be mapped to a `message` key in logz.io
# (optional, defaults to `true`)
pm2 set pm2-logger-module:log_string_as_message false
```

## Install module

```
# Install
$ pm2 install fortil/pm2-logger-module

# Uninstall
$ pm2 uninstall fortil/pm2-logger-module
```

# Watch the module
`pm2 logs pm2-logger-module`