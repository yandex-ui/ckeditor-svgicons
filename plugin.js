(function() {
    'use strict';

    CKEDITOR.config.svgicons = false;

    CKEDITOR.addTemplate(
        'buttonSVGIcon',
        '<svg id="{id}_icon" xmlns="http://www.w3.org/2000/svg" class="cke_button_icon cke_svgicon cke_svgicon--{iconName}">' +
            '<use xlink:href="#cke_svgicon--{iconName}"/>' +
            '<rect height="100%" width="100%" style="fill: transparent;"></rect>' +
        '</svg>'
    );

    CKEDITOR.addTemplate(
        'buttonSVGIconRu',
        '<svg id="{id}_icon" xmlns="http://www.w3.org/2000/svg" class="cke_button_icon cke_svgicon cke_svgicon--{iconName}-ru">' +
            '<use xlink:href="#cke_svgicon--{iconName}-ru"/>' +
            '<rect height="100%" width="100%" style="fill: transparent;"></rect>' +
        '</svg>'
    );

    CKEDITOR.addTemplate(
        'buttonSVGIconEn',
        '<svg id="{id}_icon" xmlns="http://www.w3.org/2000/svg" class="cke_button_icon cke_svgicon cke_svgicon--{iconName}-en">' +
            '<use xlink:href="#cke_svgicon--{iconName}-en"/>' +
            '<rect height="100%" width="100%" style="fill: transparent;"></rect>' +
        '</svg>'
    );

    CKEDITOR.addTemplate(
        'buttonSVGIconState',
        '<svg id="{id}_icon" xmlns="http://www.w3.org/2000/svg" class="cke_button_icon cke_svgicon cke_svgicon--{iconName}-{state}">' +
            '<use xlink:href="#cke_svgicon--{iconName}-{state}"/>' +
            '<rect height="100%" width="100%" style="fill: transparent;"></rect>' +
        '</svg>'
    );

    CKEDITOR.plugins.add('svgicons', {
        requires: 'exbutton',
        modes: { 'wysiwyg': 1, 'source': 1 },

        afterInit: function(editor) {
            if (!editor.config.svgicons) {
                return;
            }

            var svgButtons = [
                'Attachment',
                'BGColor',
                'Blockquote',
                'BulletedList',
                'Emoticons',
                'Font',
                'FontSize',
                'JustifyBlock',
                'JustifyCenter',
                'JustifyLeft',
                'JustifyRight',
                'Link',
                'MailBGColor',
                'MailFont',
                'MailFontSize',
                'MailTextColor',
                'Maximize',
                'MenuAlignment',
                'MenuList',
                'NumberedList',
                'PasteFromWord',
                'Redo',
                'RemoveFormat',
                'SwitchMode',
                'TextColor',
                'Undo',
                'Unlink'
            ];

            var svgButtonsLang = [
                'Bold',
                'Italic',
                'MenuSelection',
                'Strike',
                'Underline'
            ];

            svgButtons.forEach(function(buttonName) {
                if (this.ui.items[ buttonName ]) {
                    this.ui.items[ buttonName ].args[0].icoTmpl = CKEDITOR.getTemplate('buttonSVGIcon');
                }
            }, editor);

            var tmplButtonName = (editor.config.language === 'ru' ? 'buttonSVGIconRu' : 'buttonSVGIconEn');

            svgButtonsLang.forEach(function(buttonName) {
                if (this.ui.items[ buttonName ]) {
                    this.ui.items[ buttonName ].args[0].icoTmpl = CKEDITOR.getTemplate(tmplButtonName);
                }
            }, editor);

            editor.on('mode', function() {
                var button = this.ui.get('SwitchMode');
                if (button) {
                    var newIconNode = CKEDITOR.dom.element.createFromHtml(CKEDITOR.getTemplate('buttonSVGIconState').output({
                        'id': button._.id,
                        'iconName': 'switchmode',
                        'state': (this.mode === 'wysiwyg' ? 'on' : 'off')
                    }));

                    newIconNode.replace(button.getElementIcon());
                }
            });
        }
    });
}());
