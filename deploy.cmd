@rem @SET WWWROOT_PATH=c:\progs\nmp\WWW\asm
@if %WWWROOT_PATH% == "" GOTO :ERROR1
@set DESTPATH=%WWWROOT_PATH%\gs
@echo ###############################
@echo DEPLOYING TO "%DESTPATH%"
xcopy /Y /D /I ts\*.ts %DESTPATH%\ts
xcopy /Y /E /D www\*.* %DESTPATH%
xcopy /Y /E /D /I build\*.* %DESTPATH%\build
goto :END

:ERROR1
@echo !DEPLOY ERROR
@echo You have to set up WWWROOT_PATH environment variable to your WEB root

:END