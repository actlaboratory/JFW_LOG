; JAWS for Windows Logging Tool
; Version: 1.0.0
; Released: 2021-12-31
; Written by Kazto Kitabatake(Accessible Tools Laboratory)

include "HJConst.jsh"
include "logger.jsh"
include "logger.jsm"

globals
	object g_oFileSystem,
	string g_sFilePath,
	int g_iLoggerEnabled

Function AutoStartEvent ()
g_oFileSystem = CreateObject (c_fileSystemObject)
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
addLog (c_logType_script, scriptName)
return TRUE
EndFunction

Function eventTraceHook (string scriptPath, string functionName, string param1, string param2, string param3, string param4, string param5, string param6, string param7, string param8, string param9, string param10)
var
	string data
data = prettifyFunctionData(functionName, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
;SayString (data)
addLog (c_logType_event, data)
EndFunction

Function prettifyFunctionData (string functionName, string param1, string param2, string param3, string param4, string param5, string param6, string param7, string param8, string param9, string param10)
var
	String sRet,
	VariantArray params,
	Int i,
	Int iFlag
let params = New VariantArray[10]
let params[1] = param1
let params[2] = param2
let params[3] = param3
let params[4] = param4
let params[5] = param5
let params[6] = param6
let params[7] = param7
let params[8] = param8
let params[9] = param9
let params[10] = param10
let sRet = ""
let iFlag = FALSE
For i = ArrayLength (params) to 1 Descending
	If !StringIsBlank (params[i]) || iFlag then
		let sRet = FormatString (", %1%2", params[i], sRet)
		let iFlag = TRUE
	EndIf
EndFor
let sRet = stringChopLeft (sRet, 2)
let sRet = FormatString ("%1 (%2)", functionName, sRet)
return sRet
EndFunction

Function addLog (string sType, string sText)
var
	object oTextStream
oTextStream = g_oFileSystem.OpenTextFile (g_sFilePath, 8, true)
oTextStream.WriteLine (SysGetDate ("yyyy/MM/dd") + " " + SysGetTime ("HH:mm:ss") + "\t" + sType + "\t" + sText)
oTextStream.Close ()
EndFunction

String Function GetCharacterByExample (String s)
var
	String result
let result = GetCharacterByExample (s)
addLog (c_logType_ime, FormatString (c_functionLogFormat, "GetCharacterByExample", s, result))
return result
EndFunction

String Function GetPhraseByExample (String s)
var
	String result
let result = GetPhraseByExample (s)
addLog (c_logType_ime, FormatString (c_functionLogFormat, "GetPhraseByExample", s, result))
return result
EndFunction
