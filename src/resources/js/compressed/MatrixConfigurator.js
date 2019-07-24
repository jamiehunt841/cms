!function(d){Craft.MatrixConfigurator=Garnish.Base.extend({fieldTypeInfo:null,inputNamePrefix:null,inputIdPrefix:null,$container:null,$blockTypesColumnContainer:null,$fieldsColumnContainer:null,$fieldSettingsColumnContainer:null,$blockTypeItemsOuterContainer:null,$blockTypeItemsContainer:null,$fieldItemsContainer:null,$fieldSettingItemsContainer:null,$newBlockTypeBtn:null,$newFieldBtn:null,blockTypes:null,selectedBlockType:null,blockTypeSort:null,totalNewBlockTypes:0,init:function(e,t){this.fieldTypeInfo=e,this.inputNamePrefix=t,this.inputIdPrefix=Craft.formatInputId(this.inputNamePrefix),this.$container=d("#"+this.inputIdPrefix+"-matrix-configurator:first .input:first"),this.$blockTypesColumnContainer=this.$container.children(".block-types").children(),this.$fieldsColumnContainer=this.$container.children(".fields").children(),this.$fieldSettingsColumnContainer=this.$container.children(".field-settings").children(),this.$blockTypeItemsOuterContainer=this.$blockTypesColumnContainer.children(".items"),this.$blockTypeItemsContainer=this.$blockTypeItemsOuterContainer.children(".blocktypes"),this.$fieldItemsOuterContainer=this.$fieldsColumnContainer.children(".items"),this.$fieldSettingItemsContainer=this.$fieldSettingsColumnContainer.children(".items"),this.setContainerHeight(),this.$newBlockTypeBtn=this.$blockTypeItemsOuterContainer.children(".btn"),this.$newFieldBtn=this.$fieldItemsOuterContainer.children(".btn"),this.blockTypes={};for(var i=this.$blockTypeItemsContainer.children(),n=0;n<i.length;n++){var s=d(i[n]),l=s.data("id");this.blockTypes[l]=new r(this,s);var a="string"==typeof l&&l.match(/new(\d+)/);a&&a[1]>this.totalNewBlockTypes&&(this.totalNewBlockTypes=parseInt(a[1]))}this.blockTypeSort=new Garnish.DragSort(i,{handle:".move",axis:"y"}),this.addListener(this.$newBlockTypeBtn,"click","addBlockType"),this.addListener(this.$newFieldBtn,"click","addFieldToSelectedBlockType"),this.addListener(this.$blockTypesColumnContainer,"resize","setContainerHeight"),this.addListener(this.$fieldsColumnContainer,"resize","setContainerHeight"),this.addListener(this.$fieldSettingsColumnContainer,"resize","setContainerHeight")},setContainerHeight:function(){setTimeout(d.proxy(function(){var e=Math.max(this.$blockTypesColumnContainer.height(),this.$fieldsColumnContainer.height(),this.$fieldSettingsColumnContainer.height(),400);this.$container.height(e)},this),1)},getFieldTypeInfo:function(e){for(var t=0;t<this.fieldTypeInfo.length;t++)if(this.fieldTypeInfo[t].type==e)return this.fieldTypeInfo[t]},addBlockType:function(){this.getBlockTypeSettingsModal();this.blockTypeSettingsModal.show(),this.blockTypeSettingsModal.onSubmit=d.proxy(function(e,t){this.totalNewBlockTypes++;var i="new"+this.totalNewBlockTypes,n=d('<div class="matrixconfigitem mci-blocktype" data-id="'+i+'"><div class="name"></div><div class="handle code"></div><div class="actions"><a class="move icon" title="'+Craft.t("Reorder")+'"></a><a class="settings icon" title="'+Craft.t("Settings")+'"></a></div><input class="hidden" name="types[Matrix][blockTypes]['+i+'][name]"><input class="hidden" name="types[Matrix][blockTypes]['+i+'][handle]"></div>').appendTo(this.$blockTypeItemsContainer);this.blockTypes[i]=new r(this,n),this.blockTypes[i].applySettings(e,t),this.blockTypes[i].select(),this.blockTypes[i].addField(),this.blockTypeSort.addItems(n)},this)},addFieldToSelectedBlockType:function(){this.selectedBlockType&&this.selectedBlockType.addField()},getBlockTypeSettingsModal:function(){return this.blockTypeSettingsModal||(this.blockTypeSettingsModal=new e),this.blockTypeSettingsModal}});var e=Garnish.Modal.extend({init:function(){this.base(),this.$form=d('<form class="modal fitted"/>').appendTo(Garnish.$bod),this.setContainer(this.$form),this.$body=d('<div class="body"/>').appendTo(this.$form),this.$nameField=d('<div class="field"/>').appendTo(this.$body),this.$nameHeading=d('<div class="heading"/>').appendTo(this.$nameField),this.$nameLabel=d('<label for="new-block-type-name">'+Craft.t("Name")+"</label>").appendTo(this.$nameHeading),this.$nameInstructions=d('<div class="instructions"><p>'+Craft.t("What this block type will be called in the CP.")+"</p></div>").appendTo(this.$nameHeading),this.$nameInputContainer=d('<div class="input"/>').appendTo(this.$nameField),this.$nameInput=d('<input type="text" class="text fullwidth" id="new-block-type-name"/>').appendTo(this.$nameInputContainer),this.$nameErrorList=d('<ul class="errors"/>').appendTo(this.$nameInputContainer).hide(),this.$handleField=d('<div class="field"/>').appendTo(this.$body),this.$handleHeading=d('<div class="heading"/>').appendTo(this.$handleField),this.$handleLabel=d('<label for="new-block-type-handle">'+Craft.t("Handle")+"</label>").appendTo(this.$handleHeading),this.$handleInstructions=d('<div class="instructions"><p>'+Craft.t("How you’ll refer to this block type in the templates.")+"</p></div>").appendTo(this.$handleHeading),this.$handleInputContainer=d('<div class="input"/>').appendTo(this.$handleField),this.$handleInput=d('<input type="text" class="text fullwidth code" id="new-block-type-handle"/>').appendTo(this.$handleInputContainer),this.$handleErrorList=d('<ul class="errors"/>').appendTo(this.$handleInputContainer).hide(),this.$deleteBtn=d('<a class="error left hidden" style="line-height: 30px;">'+Craft.t("Delete")+"</a>").appendTo(this.$body),this.$buttons=d('<div class="buttons right" style="margin-top: 0;"/>').appendTo(this.$body),this.$cancelBtn=d('<div class="btn">'+Craft.t("Cancel")+"</div>").appendTo(this.$buttons),this.$submitBtn=d('<input type="submit" class="btn submit"/>').appendTo(this.$buttons),this.handleGenerator=new Craft.HandleGenerator(this.$nameInput,this.$handleInput),this.addListener(this.$cancelBtn,"click","hide"),this.addListener(this.$form,"submit","onFormSubmit"),this.addListener(this.$deleteBtn,"click","onDeleteClick")},onFormSubmit:function(e){if(e.preventDefault(),this.visible){this.handleGenerator.listening&&this.handleGenerator.updateTarget();var t=Craft.trim(this.$nameInput.val()),i=Craft.trim(this.$handleInput.val());t&&i?(this.hide(),this.onSubmit(t,i)):Garnish.shake(this.$form)}},onDeleteClick:function(){confirm(Craft.t("Are you sure you want to delete this block type?"))&&(this.hide(),this.onDelete())},show:function(e,t,i){this.$nameInput.val("string"==typeof e?e:""),this.$handleInput.val("string"==typeof t?t:""),t?this.handleGenerator.stopListening():this.handleGenerator.startListening(),void 0===e?(this.$deleteBtn.addClass("hidden"),this.$submitBtn.val(Craft.t("Create"))):(this.$deleteBtn.removeClass("hidden"),this.$submitBtn.val(Craft.t("Save"))),this.displayErrors("name",i?i.name:null),this.displayErrors("handle",i?i.handle:null),Garnish.isMobileBrowser()||setTimeout(d.proxy(function(){this.$nameInput.trigger("focus")},this),100),this.base()},displayErrors:function(e,t){var i=this["$"+e+"Input"],n=this["$"+e+"ErrorList"];if(n.children().remove(),t){i.addClass("error"),n.show();for(var s=0;s<t.length;s++)d("<li/>").text(t[s]).appendTo(n)}else i.removeClass("error"),n.hide()}}),r=Garnish.Base.extend({configurator:null,id:null,errors:null,inputNamePrefix:null,inputIdPrefix:null,$item:null,$nameLabel:null,$handleLabel:null,$nameHiddenInput:null,$handleHiddenInput:null,$settingsBtn:null,$fieldItemsContainer:null,$fieldSettingsContainer:null,fields:null,selectedField:null,fieldSort:null,totalNewFields:0,fieldSettings:null,init:function(e,t){this.configurator=e,this.$item=t,this.id=this.$item.data("id"),this.errors=this.$item.data("errors"),this.inputNamePrefix=this.configurator.inputNamePrefix+"[blockTypes]["+this.id+"]",this.inputIdPrefix=this.configurator.inputIdPrefix+"-blockTypes-"+this.id,this.$nameLabel=this.$item.children(".name"),this.$handleLabel=this.$item.children(".handle"),this.$nameHiddenInput=this.$item.find('input[name$="[name]"]:first'),this.$handleHiddenInput=this.$item.find('input[name$="[handle]"]:first'),this.$settingsBtn=this.$item.find(".settings"),this.$fieldItemsContainer=this.configurator.$fieldItemsOuterContainer.children('[data-id="'+this.id+'"]:first'),this.$fieldItemsContainer.length||(this.$fieldItemsContainer=d('<div data-id="'+this.id+'"/>').insertBefore(this.configurator.$newFieldBtn)),this.$fieldSettingsContainer=this.configurator.$fieldSettingItemsContainer.children('[data-id="'+this.id+'"]:first'),this.$fieldSettingsContainer.length||(this.$fieldSettingsContainer=d('<div data-id="'+this.id+'"/>').appendTo(this.configurator.$fieldSettingItemsContainer)),this.fields={};for(var i=this.$fieldItemsContainer.children(),n=0;n<i.length;n++){var s=d(i[n]),l=s.data("id");this.fields[l]=new Field(this.configurator,this,s);var a="string"==typeof l&&l.match(/new(\d+)/);a&&a[1]>this.totalNewFields&&(this.totalNewFields=parseInt(a[1]))}this.addListener(this.$item,"click","select"),this.addListener(this.$settingsBtn,"click","showSettings"),this.fieldSort=new Garnish.DragSort(i,{handle:".move",axis:"y",onSortChange:d.proxy(function(){for(var e=0;e<this.fieldSort.$items.length;e++){var t=d(this.fieldSort.$items[e]).data("id");this.fields[t].$fieldSettingsContainer.appendTo(this.$fieldSettingsContainer)}},this)})},select:function(){this.configurator.selectedBlockType!=this&&(this.configurator.selectedBlockType&&this.configurator.selectedBlockType.deselect(),this.configurator.$fieldsColumnContainer.removeClass("hidden").trigger("resize"),this.$fieldItemsContainer.removeClass("hidden"),this.$item.addClass("sel"),this.configurator.selectedBlockType=this)},deselect:function(){this.$item.removeClass("sel"),this.configurator.$fieldsColumnContainer.addClass("hidden").trigger("resize"),this.$fieldItemsContainer.addClass("hidden"),this.$fieldSettingsContainer.addClass("hidden"),this.configurator.selectedBlockType=null,this.selectedField&&this.selectedField.deselect()},showSettings:function(){var e=this.configurator.getBlockTypeSettingsModal();e.show(this.$nameHiddenInput.val(),this.$handleHiddenInput.val(),this.errors),e.onSubmit=d.proxy(this,"applySettings"),e.onDelete=d.proxy(this,"selfDestruct")},applySettings:function(e,t){this.errors&&(this.errors=null,this.$settingsBtn.removeClass("error")),this.$nameLabel.text(e),this.$handleLabel.text(t),this.$nameHiddenInput.val(e),this.$handleHiddenInput.val(t)},addField:function(){this.totalNewFields++;var e="new"+this.totalNewFields,t=d('<div class="matrixconfigitem mci-field" data-id="'+e+'"><div class="name"><em class="light">'+Craft.t("(blank)")+'</em>&nbsp;</div><div class="handle code">&nbsp;</div><div class="actions"><a class="move icon" title="'+Craft.t("Reorder")+'"></a></div></div>').appendTo(this.$fieldItemsContainer);this.fields[e]=new Field(this.configurator,this,t),this.fields[e].select(),this.fieldSort.addItems(t)},selfDestruct:function(){this.deselect(),this.$item.remove(),this.$fieldItemsContainer.remove(),this.$fieldSettingsContainer.remove(),this.configurator.blockTypes[this.id]=null,delete this.configurator.blockTypes[this.id]}});Field=Garnish.Base.extend({configurator:null,blockType:null,id:null,inputNamePrefix:null,inputIdPrefix:null,selectedFieldType:null,initializedFieldTypeSettings:null,$item:null,$nameLabel:null,$handleLabel:null,$fieldSettingsContainer:null,$nameInput:null,$handleInput:null,$requiredCheckbox:null,$typeSelect:null,$typeSettingsContainer:null,$deleteBtn:null,init:function(e,t,i){this.configurator=e,this.blockType=t,this.$item=i,this.id=this.$item.data("id"),this.inputNamePrefix=this.blockType.inputNamePrefix+"[fields]["+this.id+"]",this.inputIdPrefix=this.blockType.inputIdPrefix+"-fields-"+this.id,this.initializedFieldTypeSettings={},this.$nameLabel=this.$item.children(".name"),this.$handleLabel=this.$item.children(".handle"),this.$fieldSettingsContainer=this.blockType.$fieldSettingsContainer.children('[data-id="'+this.id+'"]:first');var n=!this.$fieldSettingsContainer.length;n&&(this.$fieldSettingsContainer=d(this.getDefaultFieldSettingsHtml()).appendTo(this.blockType.$fieldSettingsContainer)),this.$nameInput=this.$fieldSettingsContainer.find('input[name$="[name]"]:first'),this.$handleInput=this.$fieldSettingsContainer.find('input[name$="[handle]"]:first'),this.$requiredCheckbox=this.$fieldSettingsContainer.find('input[type="checkbox"][name$="[required]"]:first'),this.$typeSelect=this.$fieldSettingsContainer.find('select[name$="[type]"]:first'),this.$typeSettingsContainer=this.$fieldSettingsContainer.children(".fieldtype-settings:first"),this.$deleteBtn=this.$fieldSettingsContainer.children("a.delete:first"),n?this.setFieldType("PlainText"):(this.selectedFieldType=this.$typeSelect.val(),this.initializedFieldTypeSettings[this.selectedFieldType]=this.$typeSettingsContainer.children()),this.$handleInput.val()||new Craft.HandleGenerator(this.$nameInput,this.$handleInput),this.addListener(this.$item,"click","select"),this.addListener(this.$nameInput,"textchange","updateNameLabel"),this.addListener(this.$handleInput,"textchange","updateHandleLabel"),this.addListener(this.$requiredCheckbox,"change","updateRequiredIcon"),this.addListener(this.$typeSelect,"change","onTypeSelectChange"),this.addListener(this.$deleteBtn,"click","confirmDelete")},select:function(){this.blockType.selectedField!=this&&(this.blockType.selectedField&&this.blockType.selectedField.deselect(),this.configurator.$fieldSettingsColumnContainer.removeClass("hidden").trigger("resize"),this.blockType.$fieldSettingsContainer.removeClass("hidden"),this.$fieldSettingsContainer.removeClass("hidden"),this.$item.addClass("sel"),this.blockType.selectedField=this,Garnish.isMobileBrowser()||setTimeout(d.proxy(function(){this.$nameInput.trigger("focus")},this),100))},deselect:function(){this.$item.removeClass("sel"),this.configurator.$fieldSettingsColumnContainer.addClass("hidden").trigger("resize"),this.blockType.$fieldSettingsContainer.addClass("hidden"),this.$fieldSettingsContainer.addClass("hidden"),this.blockType.selectedField=null},updateNameLabel:function(){var e=this.$nameInput.val();this.$nameLabel.html((e?Craft.escapeHtml(e):'<em class="light">'+Craft.t("(blank)")+"</em>")+"&nbsp;")},updateHandleLabel:function(){this.$handleLabel.html(Craft.escapeHtml(this.$handleInput.val())+"&nbsp;")},updateRequiredIcon:function(){this.$requiredCheckbox.prop("checked")?this.$nameLabel.addClass("required"):this.$nameLabel.removeClass("required")},onTypeSelectChange:function(){this.setFieldType(this.$typeSelect.val())},setFieldType:function(e){this.selectedFieldType&&this.initializedFieldTypeSettings[this.selectedFieldType].detach(),this.selectedFieldType=e,this.$typeSelect.val(e);var t,i,n=void 0===this.initializedFieldTypeSettings[e];if(n){var s=this.configurator.getFieldTypeInfo(e),l=this.getParsedFieldTypeHtml(s.settingsBodyHtml);t=this.getParsedFieldTypeHtml(s.settingsFootHtml),i=d("<div>"+l+"</div>"),this.initializedFieldTypeSettings[e]=i}else i=this.initializedFieldTypeSettings[e];i.appendTo(this.$typeSettingsContainer),n&&(Craft.initUiElements(i),Garnish.$bod.append(t)),this.$typeSettingsContainer.trigger("resize")},getParsedFieldTypeHtml:function(e){return e="string"==typeof e?(e=e.replace(/__BLOCK_TYPE__/g,this.blockType.id)).replace(/__FIELD__/g,this.id):""},getDefaultFieldSettingsHtml:function(){var e='<div data-id="'+this.id+'"><div class="field" id="'+this.inputIdPrefix+'-name-field"><div class="heading"><label for="'+this.inputIdPrefix+'-name">'+Craft.t("Name")+'</label></div><div class="input"><input class="text fullwidth" type="text" id="'+this.inputIdPrefix+'-name" name="'+this.inputNamePrefix+'[name]" autofocus="" autocomplete="off"/></div></div><div class="field" id="'+this.inputIdPrefix+'-handle-field"><div class="heading"><label class="required" for="'+this.inputIdPrefix+'-handle">'+Craft.t("Handle")+'</label></div><div class="input"><input class="text fullwidth code" type="text" id="'+this.inputIdPrefix+'-handle" name="'+this.inputNamePrefix+'[handle]" autofocus="" autocomplete="off"/></div></div><div class="field" id="'+this.inputIdPrefix+'-instructions-field"><div class="heading"><label for="'+this.inputIdPrefix+'-instructions">'+Craft.t("Instructions")+'</label></div><div class="input"><textarea class="text nicetext fullwidth" rows="2" cols="50" id="'+this.inputIdPrefix+'-instructions" name="'+this.inputNamePrefix+'[instructions]"></textarea></div></div><div class="field checkboxfield"><label><input type="hidden" name="'+this.inputNamePrefix+'[required]" value=""/><input type="checkbox" value="1" name="'+this.inputNamePrefix+'[required]"/> '+Craft.t("This field is required")+"</label></div>";Craft.isLocalized&&(e+='<div class="field checkboxfield"><label><input type="hidden" name="'+this.inputNamePrefix+'[translatable]" value=""/><input type="checkbox" value="1" name="'+this.inputNamePrefix+'[translatable]"/> '+Craft.t("This field is translatable")+"</label></div>"),e+='<hr/><div class="field" id="type-field"><div class="heading"><label for="type">'+Craft.t("Field Type")+'</label></div><div class="input"><div class="select"><select id="type" class="fieldtoggle" name="'+this.inputNamePrefix+'[type]">';for(var t=0;t<this.configurator.fieldTypeInfo.length;t++){var i=this.configurator.fieldTypeInfo[t],n="PlainText"==i.type;e+='<option value="'+i.type+'"'+(n?' selected=""':"")+">"+i.name+"</option>"}return e+='</select></div></div></div><div class="fieldtype-settings"/><hr/><a class="error delete">'+Craft.t("Delete")+"</a></div>"},confirmDelete:function(){confirm(Craft.t("Are you sure you want to delete this field?"))&&this.selfDestruct()},selfDestruct:function(){this.deselect(),this.$item.remove(),this.$fieldSettingsContainer.remove(),this.blockType.fields[this.id]=null,delete this.blockType.fields[this.id]}})}(jQuery);
//# sourceMappingURL=MatrixConfigurator.js.map