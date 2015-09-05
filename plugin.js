(function() {
    'use strict';

    CKEDITOR.addTemplate(
        'buttonSVGIcon',
        '<svg id="{id}_icon" xmlns="http://www.w3.org/2000/svg" class="svgicon cke_svgicon cke_svgicon--{iconName}">' +
            '<use xlink:href="#cke_svgicon--{iconName}"/>' +
            '<rect height="100%" width="100%" style="fill: transparent;"></rect>' +
        '</svg>'
    );

    CKEDITOR.addTemplate(
        'buttonSVGIconRu',
        '<svg id="{id}_icon" xmlns="http://www.w3.org/2000/svg" class="svgicon cke_svgicon cke_svgicon--{iconName}-ru">' +
            '<use xlink:href="#cke_svgicon--{iconName}-ru"/>' +
            '<rect height="100%" width="100%" style="fill: transparent;"></rect>' +
        '</svg>'
    );

    CKEDITOR.addTemplate(
        'buttonSVGIconEn',
        '<svg id="{id}_icon" xmlns="http://www.w3.org/2000/svg" class="svgicon cke_svgicon cke_svgicon--{iconName}-en">' +
            '<use xlink:href="#cke_svgicon--{iconName}-en"/>' +
            '<rect height="100%" width="100%" style="fill: transparent;"></rect>' +
        '</svg>'
    );

    CKEDITOR.addTemplate(
        'buttonSVGIconState',
        '<svg id="{id}_icon" xmlns="http://www.w3.org/2000/svg" class="svgicon cke_svgicon cke_svgicon--{iconName}-{state}">' +
            '<use xlink:href="#cke_svgicon--{iconName}-{state}"/>' +
            '<rect height="100%" width="100%" style="fill: transparent;"></rect>' +
        '</svg>'
    );

    CKEDITOR.plugins.add('svgicons', {
        requires: 'exbutton',
        modes: { 'wysiwyg': 1, 'source': 1 },

        afterInit: function(editor) {
            var svgButtons = [
                'Emoticons',
                'Attachment',
                'Undo',
                'Redo',
                'Link',
                'Unlink',
                'Blockquote',
                'TextColor',
                'BGColor',
                'NumberedList',
                'BulletedList',
                'JustifyLeft',
                'JustifyCenter',
                'JustifyRight',
                'JustifyBlock',
                'RemoveFormat',
                'Maximize',
                'SwitchMode',
                'MailFont',
                'MailFontSize',
                'MailTextColor',
                'MailBGColor',
                'MenuAlignment',
                'MenuList',
                'PasteFromWord'
            ];

            var svgButtonsLang = [
                'Bold',
                'Italic',
                'Underline',
                'Strike',
                'MenuSelection'
            ];

            svgButtons.forEach(function(buttonName) {
                if (this.ui.items[ buttonName ]) {
                    this.ui.items[ buttonName ].args[0].icoTmpl = CKEDITOR.getTemplate('buttonSVGIcon');
                }
            }, editor);

            var tmplButtonName = (Daria.locale === 'ru' ? 'buttonSVGIconRu' : 'buttonSVGIconEn');

            svgButtonsLang.forEach(function(buttonName) {
                if (this.ui.items[ buttonName ]) {
                    this.ui.items[ buttonName ].args[0].icoTmpl = CKEDITOR.getTemplate(tmplButtonName);
                }
            }, editor);

            editor.on('mode', function() {
                var button = this.ui.get('SwitchMode');
                var newIconNode = CKEDITOR.dom.element.createFromHtml(CKEDITOR.getTemplate('buttonSVGIconState').output({
                    'id': button._.id,
                    'iconName': 'switchmode',
                    'state': (this.mode === 'wysiwyg' ? 'on' : 'off')
                }));

                newIconNode.replace(button.getElementIcon());
            });
        }
    });
}());