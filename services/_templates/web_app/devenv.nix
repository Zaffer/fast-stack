{ pkgs, lib, config, ... }:


let path = if builtins.pathExists "${config.env.DEVENV_ROOT}/web" then "$DEVENV_ROOT/web" else "$DEVENV_ROOT/services/_templates/web_app/web";
in
{
    languages = {
        javascript = {
            enable = true;
            pnpm.enable = true;
            directory = "$DEVENV_ROOT/${path}";
        };
        typescript.enable = true;
    };

    packages = with pkgs; [ cacert ];
    
    processes = {
        "web_app" = {
            exec = "cd ${path} && pnpm exec ionic serve --external";
        };
    };
    scripts = {
        "start_web".exec = config.processes."web_app".exec;
        "build_web".exec = config.tasks."web_app:build".exec;
        "install_web".exec = config.tasks."web_app:install".exec;
        "web_app_container".exec = ''
            cd ${path} && devenv container copy web_app
            docker run -p 8100:8100 web_app
        '';
    };
    tasks = {
        "web_app:install" = {
            exec = ''
                cd ${path} && pnpm install
            '';
        };
        "web_app:build" = {
            exec = ''
                cd ${path} && pnpm run build
            '';
            execIfModified = [
                "${path}/src/**/*.ts"  # All TypeScript files in src directory
                "${path}/*.json"       # All JSON files in the current directory
                "${path}/package.json" # Specific file
                "${path}/src"          # Entire directory
                ];
            after = [
                "web_app:install"
            ];
        };
    };

    containers = {
        "web_app" = {
            name = "web_app";
            copyToRoot = "${path}";
            startupCommand = ''
                pnpm install && pnpm build
                pnpm exec ionic serve --external
            '';
        };
    };

    # # Add node_modules/.bin to PATH when entering the devshell
    # enterShell = ''
    #     export PATH="$DEVENV_ROOT/web/node_modules/.bin:$PATH"
    # '';
}