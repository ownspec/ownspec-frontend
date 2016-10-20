/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */


CKEDITOR.editorConfig = function (config) {
    config.toolbarGroups = [
        {name: 'document', groups: ['mode', 'document', 'doctools']},
        {name: 'clipboard', groups: ['clipboard', 'undo']},
        {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
        {name: 'forms', groups: ['forms']},
        {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
        {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
        {name: 'links', groups: ['links']},
        {name: 'insert', groups: ['insert']},
        //'/',
        {name: 'styles', groups: ['styles']},
        {name: 'colors', groups: ['colors']},
        {name: 'tools', groups: ['tools']},
        {name: 'others', groups: ['others']},
        {name: 'about', groups: ['about']}
    ];


    config.language = 'fr';
    config.uiColor = '#9AB8F3';
    config.contentsCss = 'global.css';
    config.extraPlugins = 'widget,placeholder,simplebox,sharedspace,divarea,toc';
    /*
     config.sharedSpaces = {
     top: 'someElementId',
     bottom: 'anotherId'
     };
     */


    config.height = "500px";

    config.on = {
        instanceReady: function () {
        }
    };
    config.removeButtons = 'NewPage,Preview,Print,Form,HiddenField,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,BidiRtl,BidiLtr,Language,Flash,Iframe,Maximize';
};

