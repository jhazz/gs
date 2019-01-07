@SET DESTPATH=D:\nmp\WWW\asm
xcopy /Y /D index.html %DESTPATH%
xcopy /Y /D index.js %DESTPATH%
xcopy /Y /D /I build\*.* %DESTPATH%\build