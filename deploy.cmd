@SET DESTPATH=D:\nmp\WWW\asm
@cls
xcopy /Y /D /I ts\*.ts %DESTPATH%\ts
xcopy /Y /E /D www\*.* %DESTPATH%
xcopy /Y /E /D /I build\*.* %DESTPATH%\build