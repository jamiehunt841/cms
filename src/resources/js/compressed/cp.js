!function(n){Craft.CP=Garnish.Base.extend({authManager:null,$container:null,$alerts:null,$globalSidebar:null,$globalSidebarTopbar:null,$siteNameLink:null,$siteName:null,$nav:null,$subnav:null,$pageHeader:null,$containerTopbar:null,$overflowNavMenuItem:null,$overflowNavMenuBtn:null,$overflowNavMenu:null,$overflowNavMenuList:null,$overflowSubnavMenuItem:null,$overflowSubnavMenuBtn:null,$overflowSubnavMenu:null,$overflowSubnavMenuList:null,$notificationWrapper:null,$notificationContainer:null,$main:null,$content:null,$collapsibleTables:null,$primaryForm:null,navItems:null,totalNavItems:null,visibleNavItems:null,totalNavWidth:null,showingOverflowNavMenu:!1,showingNavToggle:null,showingSidebarToggle:null,subnavItems:null,totalSubnavItems:null,visibleSubnavItems:null,totalSubnavWidth:null,showingOverflowSubnavMenu:!1,selectedItemLabel:null,fixedNotifications:!1,taskInfo:null,workingTaskInfo:null,areTasksStalled:!1,trackTaskProgressTimeout:null,taskProgressIcon:null,$edition:null,upgradeModal:null,checkingForUpdates:!1,forcingRefreshOnUpdatesCheck:!1,checkForUpdatesCallbacks:null,init:function(){0!=Craft.authTimeout&&(this.authManager=new Craft.AuthManager),this.$container=n("#container"),this.$alerts=n("#alerts"),this.$globalSidebar=n("#global-sidebar"),this.$pageHeader=n("#page-header"),this.$containerTopbar=n("#container .topbar"),this.$globalSidebarTopbar=this.$globalSidebar.children(".topbar"),this.$siteNameLink=this.$globalSidebarTopbar.children("a.site-name"),this.$siteName=this.$siteNameLink.children("h2"),this.$nav=n("#nav"),this.$subnav=n("#subnav"),this.$sidebar=n("#sidebar"),this.$notificationWrapper=n("#notifications-wrapper"),this.$notificationContainer=n("#notifications"),this.$main=n("#main"),this.$content=n("#content"),this.$collapsibleTables=n("table.collapsible"),this.$edition=n("#edition"),this.addListener(Garnish.$win,"touchend","updateResponsiveGlobalSidebar"),this.navItems=[],this.totalNavWidth=Craft.CP.baseNavWidth;var t=this.$nav.children();this.totalNavItems=t.length,this.visibleNavItems=this.totalNavItems;for(var s=0;s<this.totalNavItems;s++){var i=(a=n(t[s])).width();this.navItems.push(a),this.totalNavWidth+=i}this.subnavItems=[],this.totalSubnavWidth=Craft.CP.baseSubnavWidth;var e=this.$subnav.children();this.totalSubnavItems=e.length,this.visibleSubnavItems=this.totalSubnavItems;for(s=0;s<this.totalSubnavItems;s++){var a;i=(a=n(e[s])).width();this.subnavItems.push(a),this.totalSubnavWidth+=i}this.addListener(this.$sidebar.find("nav ul"),"resize","updateResponsiveSidebar"),this.$sidebarLinks=n("nav a",this.$sidebar),this.addListener(this.$sidebarLinks,"click","selectSidebarItem"),this.addListener(this.$container,"scroll","updateFixedNotifications"),this.updateFixedNotifications(),this.$alerts.length&&this.initAlerts(),"FORM"==this.$container.prop("nodeName")?this.$primaryForm=this.$container:this.$primaryForm=n("form[data-saveshortcut]:first"),this.$primaryForm.length&&Garnish.hasAttr(this.$primaryForm,"data-saveshortcut")&&this.addListener(Garnish.$doc,"keydown",function(t){return Garnish.isCtrlKeyPressed(t)&&t.keyCode==Garnish.S_KEY&&(t.preventDefault(),this.submitPrimaryForm()),!0}),this.$edition.hasClass("hot")&&this.addListener(this.$edition,"click","showUpgradeModal"),n("a").each(function(){this.hostname.length&&this.hostname!==location.hostname&&void 0===n(this).attr("target")&&n(this).attr("target","_blank")}),Garnish.$doc.ready(n.proxy(function(){this.addListener(Garnish.$win,"resize","onWindowResize"),this.onWindowResize();var t=this.$notificationContainer.children(".error"),s=this.$notificationContainer.children(":not(.error)");t.delay(2*Craft.CP.notificationDuration).velocity("fadeOut"),s.delay(Craft.CP.notificationDuration).velocity("fadeOut"),Garnish.requestAnimationFrame(n.proxy(function(){if(this.$confirmUnloadForms=n("form[data-confirm-unload]"),this.$confirmUnloadForms.length){Craft.forceConfirmUnload||(this.initialFormValues=[]);for(var t=0;t<this.$confirmUnloadForms.length;t++){var s=n(this.$confirmUnloadForms);Craft.forceConfirmUnload||(this.initialFormValues[t]=s.serialize()),this.addListener(s,"submit",function(){this.removeListener(Garnish.$win,"beforeunload")})}this.addListener(Garnish.$win,"beforeunload",function(t){for(var s=0;s<this.$confirmUnloadForms.length;s++)if(Craft.forceConfirmUnload||this.initialFormValues[s]!=n(this.$confirmUnloadForms[s]).serialize()){var i=Craft.t("Any changes will be lost if you leave this page.");return t?t.originalEvent.returnValue=i:window.event.returnValue=i,i}})}},this))},this))},submitPrimaryForm:function(){this.trigger("beforeSaveShortcut"),this.$primaryForm.data("saveshortcut-redirect")&&n('<input type="hidden" name="redirect" value="'+this.$primaryForm.data("saveshortcut-redirect")+'"/>').appendTo(this.$primaryForm),this.$primaryForm.trigger("submit")},updateSidebarMenuLabel:function(){Garnish.$win.trigger("resize");var t=n("a.sel:first",this.$sidebar);this.selectedItemLabel=t.html()},onWindowResize:function(){this.onWindowResize._cpWidth=Math.min(Garnish.$win.width(),Craft.CP.maxWidth),this.updateResponsiveGlobalSidebar(),this.updateResponsiveNav(),this.updateResponsiveSidebar(),this.updateResponsiveTables()},updateResponsiveGlobalSidebar:function(){var t=window.innerHeight;this.$globalSidebar.height(t)},updateResponsiveNav:function(){this.onWindowResize._cpWidth<=992?this.showingNavToggle||this.showNavToggle():this.showingNavToggle&&this.hideNavToggle()},showNavToggle:function(){this.$navBtn=n('<a class="show-nav" title="'+Craft.t("Show nav")+'"></a>').prependTo(this.$containerTopbar),this.addListener(this.$navBtn,"click","toggleNav"),this.showingNavToggle=!0},hideNavToggle:function(){this.$navBtn.remove(),this.showingNavToggle=!1},toggleNav:function(){Garnish.$bod.hasClass("showing-nav"),Garnish.$bod.toggleClass("showing-nav")},updateResponsiveSidebar:function(){0<this.$sidebar.length&&(this.onWindowResize._cpWidth<769?this.showingSidebarToggle||this.showSidebarToggle():this.showingSidebarToggle&&this.hideSidebarToggle())},showSidebarToggle:function(){var t=n("a.sel:first",this.$sidebar);this.selectedItemLabel=t.html(),this.$sidebarBtn=n('<a class="show-sidebar" title="'+Craft.t("Show sidebar")+'">'+this.selectedItemLabel+"</a>").prependTo(this.$content),this.addListener(this.$sidebarBtn,"click","toggleSidebar"),this.showingSidebarToggle=!0},selectSidebarItem:function(t){var s=n(t.currentTarget);this.selectedItemLabel=s.html(),this.$sidebarBtn&&(this.$sidebarBtn.html(this.selectedItemLabel),this.toggleSidebar())},hideSidebarToggle:function(){this.$sidebarBtn&&this.$sidebarBtn.remove(),this.showingSidebarToggle=!1},toggleSidebar:function(){this.$content.filter(".has-sidebar").toggleClass("showing-sidebar"),this.updateResponsiveContent()},updateResponsiveContent:function(){var t=this.$content.filter(".has-sidebar");if(t.hasClass("showing-sidebar")){var s=n("nav",this.$sidebar).height();if(t.height()<=s){var i=s+48;t.css("height",i+"px")}}else t.css("min-height",0),t.css("height","auto")},updateResponsiveTables:function(){for(this.updateResponsiveTables._i=0;this.updateResponsiveTables._i<this.$collapsibleTables.length;this.updateResponsiveTables._i++)this.updateResponsiveTables._$table=this.$collapsibleTables.eq(this.updateResponsiveTables._i),this.updateResponsiveTables._containerWidth=this.updateResponsiveTables._$table.parent().width(),this.updateResponsiveTables._check=!1,0<this.updateResponsiveTables._containerWidth&&(void 0===this.updateResponsiveTables._$table.data("lastContainerWidth")?this.updateResponsiveTables._check=!0:(this.updateResponsiveTables._isCollapsed=this.updateResponsiveTables._$table.hasClass("collapsed"),this.updateResponsiveTables._containerWidth>this.updateResponsiveTables._$table.data("lastContainerWidth")?this.updateResponsiveTables._isCollapsed&&(this.updateResponsiveTables._$table.removeClass("collapsed"),this.updateResponsiveTables._check=!0):this.updateResponsiveTables._isCollapsed||(this.updateResponsiveTables._check=!0)),this.updateResponsiveTables._check&&this.updateResponsiveTables._$table.width()>this.updateResponsiveTables._containerWidth&&this.updateResponsiveTables._$table.addClass("collapsed"),this.updateResponsiveTables._$table.data("lastContainerWidth",this.updateResponsiveTables._containerWidth))},addLastVisibleNavItemToOverflowMenu:function(){this.navItems[this.visibleNavItems-1].prependTo(this.$overflowNavMenuList),this.visibleNavItems--},addFirstOverflowNavItemToMainMenu:function(){this.navItems[this.visibleNavItems].insertBefore(this.$overflowNavMenuItem),this.visibleNavItems++},addLastVisibleSubnavItemToOverflowMenu:function(){this.subnavItems[this.visibleSubnavItems-1].prependTo(this.$overflowSubnavMenuList),this.visibleSubnavItems--},addFirstOverflowSubnavItemToMainMenu:function(){this.subnavItems[this.visibleSubnavItems].insertBefore(this.$overflowSubnavMenuItem),this.visibleSubnavItems++},updateFixedNotifications:function(){this.updateFixedNotifications._headerHeight=this.$globalSidebar.height(),this.$container.scrollTop()>this.updateFixedNotifications._headerHeight?this.fixedNotifications||(this.$notificationWrapper.addClass("fixed"),this.fixedNotifications=!0):this.fixedNotifications&&(this.$notificationWrapper.removeClass("fixed"),this.fixedNotifications=!1)},displayNotification:function(t,s){var i=Craft.CP.notificationDuration;"error"==t&&(i*=2);var e=n('<div class="notification '+t+'">'+s+"</div>").appendTo(this.$notificationContainer),a=-e.outerWidth()/2+"px";e.hide().css({opacity:0,"margin-left":a,"margin-right":a}).velocity({opacity:1,"margin-left":"2px","margin-right":"2px"},{display:"inline-block",duration:"fast"}).delay(i).velocity({opacity:0,"margin-left":a,"margin-right":a},{complete:function(){e.remove()}}),this.trigger("displayNotification",{notificationType:t,message:s})},displayNotice:function(t){this.displayNotification("notice",t)},displayError:function(t){t||(t=Craft.t("An unknown error occurred.")),this.displayNotification("error",t)},fetchAlerts:function(){var t={path:Craft.path};Craft.queueActionRequest("app/getCpAlerts",t,n.proxy(this,"displayAlerts"))},displayAlerts:function(t){if(Garnish.isArray(t)&&t.length){this.$alerts=n('<ul id="alerts"/>').insertBefore(this.$containerTopbar);for(var s=0;s<t.length;s++)n("<li>"+t[s]+"</li>").appendTo(this.$alerts);var i=this.$alerts.outerHeight();this.$alerts.css("margin-top",-i).velocity({"margin-top":0},"fast"),this.initAlerts()}},initAlerts:function(){for(var t=this.$alerts.find('a[class^="shun:"]'),s=0;s<t.length;s++)this.addListener(t[s],"click",n.proxy(function(t){t.preventDefault();var i=n(t.currentTarget),s={message:i.prop("className").substr(5)};Craft.queueActionRequest("app/shunCpAlert",s,n.proxy(function(t,s){"success"==s&&(t.success?i.parent().remove():this.displayError(t.error))},this))},this));var i=this.$alerts.find(".edition-resolution:first");i.length&&this.addListener(i,"click","showUpgradeModal")},checkForUpdates:function(t,s){if(this.checkingForUpdates&&!0===t&&!this.forcingRefreshOnUpdatesCheck){var i=s;s=function(){Craft.cp.checkForUpdates(!0,i)}}if("function"==typeof s&&(Garnish.isArray(this.checkForUpdatesCallbacks)||(this.checkForUpdatesCallbacks=[]),this.checkForUpdatesCallbacks.push(s)),!this.checkingForUpdates){this.checkingForUpdates=!0,this.forcingRefreshOnUpdatesCheck=!0===t;var e={forceRefresh:!0===t};Craft.queueActionRequest("app/checkForUpdates",e,n.proxy(function(t){if(this.displayUpdateInfo(t),this.checkingForUpdates=!1,Garnish.isArray(this.checkForUpdatesCallbacks)){var s=this.checkForUpdatesCallbacks;this.checkForUpdatesCallbacks=null;for(var i=0;i<s.length;i++)s[i](t)}this.trigger("checkForUpdates",{updateInfo:t})},this))}},displayUpdateInfo:function(t){var s;(this.$globalSidebarTopbar.children("a.updates").remove(),t.total)&&(s=1==t.total?Craft.t("1 update available"):Craft.t("{num} updates available",{num:t.total}),n('<a class="updates'+(t.critical?" critical":"")+'" href="'+Craft.getUrl("updates")+'" title="'+s+'"><span data-icon="newstamp"><span>'+t.total+"</span></span></span>").insertAfter(this.$siteNameLink),n("#footer-updates").text(s))},runPendingTasks:function(){Craft.runTasksAutomatically?Craft.queueActionRequest("tasks/runPendingTasks",n.proxy(function(t,s){"success"==s&&this.trackTaskProgress(!1)},this)):this.trackTaskProgress(!1)},trackTaskProgress:function(t){this.trackTaskProgressTimeout||(!0===t&&(t=this.workingTaskInfo?(t=1e3*this.workingTaskInfo.age,Math.min(6e4,Math.max(500,t))):6e4),t?this.trackTaskProgressTimeout=setTimeout(n.proxy(this,"_trackTaskProgressInternal"),t):this._trackTaskProgressInternal())},_trackTaskProgressInternal:function(){Craft.queueActionRequest("tasks/getTaskInfo",n.proxy(function(t,s){"success"==s&&(this.trackTaskProgressTimeout=null,this.setTaskInfo(t,!0),this.workingTaskInfo&&this.trackTaskProgress(!0))},this))},setTaskInfo:function(t,s){this.taskInfo=t,this.workingTaskInfo=this.getWorkingTaskInfo(),this.areTasksStalled=this.workingTaskInfo&&"running"===this.workingTaskInfo.status&&this.workingTaskInfo.age>=Craft.CP.minStalledTaskAge,this.updateTaskIcon(this.getRunningTaskInfo(),s),this.trigger("setTaskInfo")},getRunningTaskInfo:function(){for(var t=["running","error","pending"],s=0;s<t.length;s++)for(var i=0;i<this.taskInfo.length;i++)if(0==this.taskInfo[i].level&&this.taskInfo[i].status===t[s])return this.taskInfo[i]},getWorkingTaskInfo:function(){for(var t=this.taskInfo.length-1;0<=t;t--)if("running"===this.taskInfo[t].status)return this.taskInfo[t]},updateTaskIcon:function(t,s){t?(this.taskProgressIcon||(this.taskProgressIcon=new i),this.areTasksStalled?this.taskProgressIcon.showFailMode(Craft.t("Stalled task")):"running"==t.status||"pending"==t.status?(this.taskProgressIcon.hideFailMode(),this.taskProgressIcon.setDescription(t.description),this.taskProgressIcon.setProgress(t.progress,s)):"error"==t.status&&this.taskProgressIcon.showFailMode(Craft.t("Failed task"))):this.taskProgressIcon&&(this.taskProgressIcon.hideFailMode(),this.taskProgressIcon.complete(),delete this.taskProgressIcon)},showUpgradeModal:function(){this.upgradeModal?this.upgradeModal.show():this.upgradeModal=new Craft.UpgradeModal}},{maxWidth:1051,navHeight:38,baseNavWidth:30,subnavHeight:38,baseSubnavWidth:30,notificationDuration:2e3,minStalledTaskAge:300,normalizeTaskStatus:function(t){return"running"===t&&Craft.cp.areTasksStalled?"stalled":t}}),Craft.cp=new Craft.CP;var i=Garnish.Base.extend({$li:null,$a:null,$label:null,hud:null,failMode:!1,_canvasSupported:null,_$bgCanvas:null,_$staticCanvas:null,_$hoverCanvas:null,_$failCanvas:null,_staticCtx:null,_hoverCtx:null,_canvasSize:null,_arcPos:null,_arcRadius:null,_lineWidth:null,_arcStartPos:0,_arcEndPos:0,_arcStartStepSize:null,_arcEndStepSize:null,_arcStep:null,_arcStepTimeout:null,_arcAnimateCallback:null,_progressBar:null,init:function(){if(this.$li=n("<li/>").appendTo(Craft.cp.$nav),this.$a=n('<a id="taskicon"/>').appendTo(this.$li),this.$canvasContainer=n('<span class="icon"/>').appendTo(this.$a),this.$label=n('<span class="label"></span>').appendTo(this.$a),this._canvasSupported=!!document.createElement("canvas").getContext,this._canvasSupported){var t=1<window.devicePixelRatio?2:1;this._canvasSize=18*t,this._arcPos=this._canvasSize/2,this._arcRadius=7*t,this._lineWidth=3*t,this._$bgCanvas=this._createCanvas("bg","#61666b"),this._$staticCanvas=this._createCanvas("static","#d7d9db"),this._$hoverCanvas=this._createCanvas("hover","#fff"),this._$failCanvas=this._createCanvas("fail","#da5a47").hide(),this._staticCtx=this._$staticCanvas[0].getContext("2d"),this._hoverCtx=this._$hoverCanvas[0].getContext("2d"),this._drawArc(this._$bgCanvas[0].getContext("2d"),0,1),this._drawArc(this._$failCanvas[0].getContext("2d"),0,1)}else this._progressBar=new Craft.ProgressBar(this.$canvasContainer),this._progressBar.showProgressBar();this.addListener(this.$a,"click","toggleHud")},setDescription:function(t){this.$a.attr("title",t),this.$label.text(t)},setProgress:function(t,s){this._canvasSupported?s?this._animateArc(0,t):this._setArc(0,t):this._progressBar.setProgressPercentage(100*t)},complete:function(){this._canvasSupported?this._animateArc(0,1,n.proxy(function(){this._$bgCanvas.velocity("fadeOut"),this._animateArc(1,1,n.proxy(function(){this.$a.remove(),this.destroy()},this))},this)):(this._progressBar.setProgressPercentage(100),this.$a.velocity("fadeOut"))},showFailMode:function(t){this.failMode||(this.failMode=!0,this._canvasSupported?(this._$bgCanvas.hide(),this._$staticCanvas.hide(),this._$hoverCanvas.hide(),this._$failCanvas.show()):(this._progressBar.$progressBar.css("border-color","#da5a47"),this._progressBar.$innerProgressBar.css("background-color","#da5a47"),this._progressBar.setProgressPercentage(50)),this.setDescription(t))},hideFailMode:function(){this.failMode&&(this.failMode=!1,this._canvasSupported?(this._$bgCanvas.show(),this._$staticCanvas.show(),this._$hoverCanvas.show(),this._$failCanvas.hide()):(this._progressBar.$progressBar.css("border-color",""),this._progressBar.$innerProgressBar.css("background-color",""),this._progressBar.setProgressPercentage(50)))},toggleHud:function(){this.hud?this.hud.toggle():this.hud=new o},_createCanvas:function(t,s){var i=n('<canvas id="taskicon-'+t+'" width="'+this._canvasSize+'" height="'+this._canvasSize+'"/>').appendTo(this.$canvasContainer),e=i[0].getContext("2d");return e.strokeStyle=s,e.lineWidth=this._lineWidth,e.lineCap="round",i},_setArc:function(t,s){this._arcStartPos=t,this._arcEndPos=s,this._drawArc(this._staticCtx,t,s),this._drawArc(this._hoverCtx,t,s)},_drawArc:function(t,s,i){t.clearRect(0,0,this._canvasSize,this._canvasSize),t.beginPath(),t.arc(this._arcPos,this._arcPos,this._arcRadius,(1.5+2*s)*Math.PI,(1.5+2*i)*Math.PI),t.stroke(),t.closePath()},_animateArc:function(t,s,i){this._arcStepTimeout&&clearTimeout(this._arcStepTimeout),this._arcStep=0,this._arcStartStepSize=(t-this._arcStartPos)/10,this._arcEndStepSize=(s-this._arcEndPos)/10,this._arcAnimateCallback=i,this._takeNextArcStep()},_takeNextArcStep:function(){this._setArc(this._arcStartPos+this._arcStartStepSize,this._arcEndPos+this._arcEndStepSize),this._arcStep++,this._arcStep<10?this._arcStepTimeout=setTimeout(n.proxy(this,"_takeNextArcStep"),50):this._arcAnimateCallback&&this._arcAnimateCallback()}}),o=Garnish.HUD.extend({tasksById:null,completedTasks:null,updateViewProxy:null,init:function(){this.tasksById={},this.completedTasks=[],this.updateViewProxy=n.proxy(this,"updateView"),this.base(Craft.cp.taskProgressIcon.$a),this.$main.attr("id","tasks-hud")},onShow:function(){Craft.cp.on("setTaskInfo",this.updateViewProxy),this.updateView(),this.base()},onHide:function(){if(Craft.cp.off("setTaskInfo",this.updateViewProxy),this.completedTasks.length){for(var t=0;t<this.completedTasks.length;t++)this.completedTasks[t].destroy();this.completedTasks=[]}this.base()},updateView:function(){var t=[];if(Craft.cp.taskInfo)for(var s=0;s<Craft.cp.taskInfo.length;s++)t.push(Craft.cp.taskInfo[s].id);for(var i in this.tasksById)Craft.inArray(i,t)||(this.tasksById[i].complete(),this.completedTasks.push(this.tasksById[i]),delete this.tasksById[i]);if(Craft.cp.taskInfo&&Craft.cp.taskInfo.length)for(s=0;s<Craft.cp.taskInfo.length;s++){var e=Craft.cp.taskInfo[s];if(this.tasksById[e.id])this.tasksById[e.id].updateStatus(e);else{this.tasksById[e.id]=new o.Task(this,e);for(var a=!1,n=s+1;n<Craft.cp.taskInfo.length;n++)if(this.tasksById[Craft.cp.taskInfo[n].id]){this.tasksById[e.id].$container.insertBefore(this.tasksById[Craft.cp.taskInfo[n].id].$container),a=!0;break}if(!a){var r=this.$main.children("object");r.length?this.tasksById[e.id].$container.insertBefore(r):this.tasksById[e.id].$container.appendTo(this.$main)}}}else this.hide()}});o.Task=Garnish.Base.extend({hud:null,id:null,level:null,description:null,status:null,progress:null,$container:null,$statusContainer:null,$descriptionContainer:null,_progressBar:null,init:function(t,s){this.hud=t,this.id=s.id,this.level=s.level,this.description=s.description,this.$container=n('<div class="task"/>'),this.$statusContainer=n('<div class="task-status"/>').appendTo(this.$container),this.$descriptionContainer=n('<div class="task-description"/>').appendTo(this.$container).text(s.description),this.$container.data("task",this),0!=this.level&&(this.$container.css("padding-"+Craft.left,24+24*this.level),n('<div class="indent" data-icon="'+("ltr"==Craft.orientation?"rarr":"larr")+'"/>').appendTo(this.$descriptionContainer)),this.updateStatus(s)},updateStatus:function(t){if(this.status!==(this.status=Craft.CP.normalizeTaskStatus(t.status)))switch(this.$statusContainer.empty(),this.status){case"pending":this.$statusContainer.text(Craft.t("Pending"));break;case"running":this._progressBar=new Craft.ProgressBar(this.$statusContainer),this._progressBar.showProgressBar();break;case"stalled":case"error":if(n('<span class="error">'+("stalled"===this.status?Craft.t("Stalled"):Craft.t("Failed"))+"</span>").appendTo(this.$statusContainer),0==this.level){var s=n('<a class="menubtn error" title="'+Craft.t("Options")+'"/>').appendTo(this.$statusContainer);n('<div class="menu"><ul><li><a data-action="rerun">'+Craft.t("Try again")+'</a></li><li><a data-action="cancel">'+Craft.t("Cancel")+"</a></li></ul></div>").appendTo(this.$statusContainer),new Garnish.MenuBtn(s,{onOptionSelect:n.proxy(this,"performErrorAction")})}}"running"==this.status&&this._progressBar.setProgressPercentage(100*t.progress)},performErrorAction:function(t){for(var s=this.$container.nextAll(),i=0;i<s.length;i++){var e=n(s[i]).data("task");if(!e||0==e.level)break;e.destroy()}switch(n(t).data("action")){case"rerun":Craft.postActionRequest("tasks/rerunTask",{taskId:this.id},n.proxy(function(t,s){"success"==s&&(this.updateStatus(t),Craft.cp.trackTaskProgress(!1))},this));break;case"cancel":Craft.postActionRequest("tasks/deleteTask",{taskId:this.id},n.proxy(function(t,s){"success"==s&&(this.destroy(),Craft.cp.trackTaskProgress(!1))},this))}},complete:function(){this.$statusContainer.empty(),n('<div data-icon="check"/>').appendTo(this.$statusContainer)},destroy:function(){this.hud.tasksById[this.id]&&delete this.hud.tasksById[this.id],this.$container.remove(),this.base()}})}(jQuery);
//# sourceMappingURL=cp.js.map