; JAWS for Windows Logging Tool
; Written by Kazto Kitabatake(Accessible Tools Laboratory)

include "HJConst.jsh"
include "logger.jsh"
include "logger.jsm"

globals
	object g_oFileSystem,
	string g_sFilePath,
	int g_iLoggerEnabled

Function AutoStartEvent ()
g_oFileSystem = CreateObject ("Scripting.FileSystemObject")
g_iLoggerEnabled = FALSE
EndFunction

Function enableLogger ()
var
	string sFolderPath = GetJAWSSettingsDirectory () + "\\" + c_logDir
if !g_oFileSystem.FolderExists (sFolderPath) then
	g_oFileSystem.CreateFolder (sFolderPath)
EndIf
g_sFilePath = sFolderPath + "\\" + SysGetDate ("yyyyMMdd") + SysGetTime ("HHmmss") + ".log"
SayMessage (OT_JAWS_MESSAGE, msg_loggerEnabled_l, msg_loggerEnabled_s)
AddHook (HK_SCRIPT, "scriptHook")
AddHook (HK_EVENT_TRACE, "eventTraceHook")
g_iLoggerEnabled = TRUE
EndFunction

Function disableLogger ()
g_iLoggerEnabled = FALSE
RemoveHook (HK_SCRIPT, "scriptHook")
RemoveHook (HK_EVENT_TRACE, "eventTraceHook")
SayMessage (OT_JAWS_MESSAGE, msg_loggerDisabled_l, msg_loggerDisabled_s)
EndFunction

Function scriptHook (string scriptName)
;SayString (scriptName)
addLog ("script\t" + scriptName)
return TRUE
EndFunction

Function eventTraceHook (string scriptPath, string functionName, string param1, string param2, string param3, string param4, string param5, string param6, string param7, string param8, string param9, string param10)
var
	string data
data = prettifyFunctionData(functionName, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
;SayString (data)
addLog ("event\t" + data)
EndFunction

Function prettifyFunctionData (string functionName, string param1, string param2, string param3, string param4, string param5, string param6, string param7, string param8, string param9, string param10)
return functionName + "(" + param1 + ", " + param2 + ", " + param3 + ", " + param4 + ", " + param5 + ", " + param6 + ", " + param7 + ", " + param8 + ", " + param9 + ", " + param10 + ")"
EndFunction

Function addLog (string text)
var
	object oTextStream
oTextStream = g_oFileSystem.OpenTextFile (g_sFilePath, 8, true)
oTextStream.WriteLine (SysGetDate ("yyyy/MM/dd") + " " + SysGetTime ("HH:mm:ss") + "\t" + text)
oTextStream.Close ()
EndFunction
