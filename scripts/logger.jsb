JFW Script File                                                           À       autostartevent       Scripting.FileSystemObject    createobject    &  g_ofilesystem         &  g_iloggerenabled       X    enablelogger         getjawssettingsdirectory      \   
    logs    
  '   $  g_ofilesystem     %     folderexists         $  g_ofilesystem     %     createfolder          %     \   
       yyyyMMdd      sysgetdate  
       HHmmss    sysgettime  
    .log    
  &  g_sfilepath         1 msg_loggerEnabled_lãããã°ã­ã°ã®åºåãéå§ãã¾ã    1
 msg_loggerEnabled_sã­ã°åºåéå§     saymessage                scriptHook    addhook              eventTraceHook    addhook         &  g_iloggerenabled       0    disablelogger         &  g_iloggerenabled               scriptHook    removehook               eventTraceHook    removehook             1 msg_loggerDisabled_lãããã°ã­ã°ã®åºåãåæ­¢ãã¾ã   1
 msg_loggerDisabled_sã­ã°åºååæ­¢    saymessage        L     scripthook          script  %     addlog             	      ¼     eventtracehook              		 

    %  %  %  %  %  %  %  %  % 	 % 
 %    prettifyfunctiondata    '       event   %    addlog        t    prettifyfunctiondata                		 

  
        ,  '  %       %  +  %       %  +  %       %  +  %       %  +  %       %  +  %       %  +  %       %  +  %       %  +  % 	   	   %  +  % 
   
   %  +        '        '     %    arraylength '  %       
 	       %  %  *    stringisblank     " ¤%  
          , %1%2  %  %  *  %    formatstring    '       '     %       
  '   \      %         stringchopleft  '       %1 (%2) %   %    formatstring    '  %     	          addlog      $  g_ofilesystem     $  g_sfilepath             opentextfile    '  %         yyyy/MM/dd    sysgetdate        
       HH:mm:ss      sysgettime  
    	   
  %   
    	   
  %  
    writeline      %      close         