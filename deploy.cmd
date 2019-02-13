@rem @SET WWWROOT_PATH=c:\progs\nmp\WWW\asm
@cls
@set DESTPATH=%WWWROOT_PATH%\gs
xcopy /Y /D /I ts\*.ts %DESTPATH%\ts
xcopy /Y /E /D www\*.* %DESTPATH%
xcopy /Y /E /D /I build\*.* %DESTPATH%\build