{ pkgs, lib, config, inputs, ... }:

{
    # read .env into devenv
    dotenv.enable = true;
    
    processes = {
        "web_app" = lib.mkDefault {
            exec = "cd $DEVENV_ROOT/services/_templates/web_app/web && pnpm exec ionic serve --external";
        };
    };

    # scripts = {
    #     "start_web".exec = "ls -al";
    #     "build_web".exec = config.tasks."web_app:build".exec;
    #     "install_web".exec = config.tasks."web_app:install".exec;
    # };

    tasks = {
        "web_app:install" = lib.mkDefault {
            exec = ''
                cd $DEVENV_ROOT/services/_templates/web_app/web && pnpm install
            '';
        };
        "web_app:build" = {
            exec = lib.mkDefault ''
                cd $DEVENV_ROOT/services/_templates/web_app/web && pnpm run build
            '';
            execIfModified = lib.mkDefault [
                "$DEVENV_ROOT/services/_templates/web_app/web/src/**/*.ts"  # All TypeScript files in src directory
                "$DEVENV_ROOT/services/_templates/web_app/web/*.json"       # All JSON files in the current directory
                "$DEVENV_ROOT/services/_templates/web_app/web/package.json" # Specific file
                "$DEVENV_ROOT/services/_templates/web_app/web/src"          # Entire directory
                ];
            after = lib.mkDefault [
                "web_app:install"
            ];
        };
    };

    containers = {
        "web_app" = {
            copyToRoot = "$DEVENV_ROOT/services/_templates/web_app/web";
            startupCommand = ''
                pnpm install && pnpm build
                pnpm exec ionic serve --external
            '';
        };
    };

}
