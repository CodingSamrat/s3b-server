@echo off

rem Extract version from package.json using jq
for /f "delims=" %%i in ('jq -r ".version" package.json') do set VERSION=%%i

rem Echo installation message
echo.
echo Installing s3b-server...
echo Version: %VERSION%
echo ----------------------------------

rem Check if the branch 'production' already exists
git show-ref --quiet --verify -- "refs/heads/production"
if %ERRORLEVEL% neq 0 (
    rem If 'production' branch does not exist, create it
    echo.
    echo > Creating `production` branch...
    git branch production
)

rem Check if current branch is not 'production'
for /f "delims=" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
if not "%CURRENT_BRANCH%"=="production" (
    rem If not on 'production', switch to it
    git checkout production
)

echo.
echo > Installing dependencies...
rem Install npm packages globally and locally
npm install -g .
npm install
npm install -g pm2

rem Create /volume directory and set permissions
set VOLUME_DIR=C:\Users\%USERNAME%\s3b-cloud
echo.
echo > Creating cloud directory %VOLUME_DIR%

rem Check if directory doesn't exist
if not exist "%VOLUME_DIR%" (
    rem Create the directory
    mkdir "%VOLUME_DIR%"
)

rem Change owner of %VOLUME_DIR%
echo > Changing owner of %VOLUME_DIR% to %USERNAME%:%USERNAME%
rem Windows does not have a direct equivalent for chown, but you can use icacls to modify permissions if needed

rem Create .env file and add variables
(
    echo # Url of s3b server. Ex: https://cdn.your-domain.com
    echo # HOST_URL will be used in s3b client to connect with server.
    echo # Also all files will be delivered from HOST_URL.
    echo # By default s3b-server run on prot 8800
    echo HOST_URL=http://localhost:8800    # Replace it
    echo.
    echo # Secret token used for authentication
    echo # new key can be generated by running comand 's3b keygen'
    echo ACCESS_TOKEN_SECRET=uDKseoo1/6xmHYYU/d5pBkcUofnYZVMPcReybIuoS5y147Z3MS
) > .env

rem Make .env file secure
icacls .env /inheritance:r /grant %USERNAME%:F /deny "Everyone:(X)"

node .\src\libs\create-admin-user.js

rem Clean up install.bat if no longer needed
echo.
echo > Cleaning up project...
del install.bat
del install.sh
echo > Done.
