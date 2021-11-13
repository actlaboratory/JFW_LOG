; JAWS for Windows Logging Tool
; Written by Kazto Kitabatake(Accessible Tools Laboratory)

include "HJConst.jsh"
include "logger.jsm"

globals
	int g_iLoggerEnabled

Function AutoStartEvent ()
g_iLoggerEnabled = FALSE
EndFunction

Function enableLogger ()
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
SayString (scriptName)
return TRUE
EndFunction

Function eventTraceHook (string scriptPath, string functionName, string params)
SayString (functionName)
EndFunction
