(function() {
    'use strict';

    CKEDITOR.config.svgicons = false;

    function addTemplate(templateName, separator, state) {
        CKEDITOR.addTemplate(
            templateName,
            '<svg id="{id}_icon" xmlns="http://www.w3.org/2000/svg"'
                + ' class="cke_button_icon cke_svgicon cke_svgicon--{iconName}' + state + '">'
                + '<use xlink:href="#cke_svgicon' + separator + '{iconName}' + state + '"/>'
                + '<rect height="100%" width="100%" style="fill: transparent;"></rect>'
            + '</svg>');
    }

    addTemplate('buttonSVGIcon', '--', '');
    addTemplate('buttonSVGIconRu', '--', '-ru');
    addTemplate('buttonSVGIconEn', '--', '-en');
    addTemplate('buttonSVGIconState', '--', '-{state}');

    addTemplate('lisa_buttonSVGIcon', '_lisa--lisa_', '');
    addTemplate('lisa_buttonSVGIconRu', '_lisa--lisa_', '-ru');
    addTemplate('lisa_buttonSVGIconEn', '_lisa--lisa_', '-en');
    addTemplate('lisa_buttonSVGIconState', '_lisa--lisa_', '-{state}');

    CKEDITOR.plugins.add('svgicons', {
        requires: 'exbutton',
        modes: { 'wysiwyg': 1, 'source': 1 },

        afterInit: function(editor) {
            if (!editor.config.svgicons) {
                return;
            }

            const templateNamePrefix = editor.config.svgicons === 'lisa' ? 'lisa_' : '';

            var svgButtons = [
                'AddImage',
                'Attachment',
                'AttachmentComputer',
                'AttachmentDisk',
                'AttachmentMail',
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
                    this.ui.items[ buttonName ].args[0].icoTmpl = CKEDITOR.getTemplate(templateNamePrefix + 'buttonSVGIcon');
                }
            }, editor);

            var tmplButtonName = (editor.config.language === 'ru' ? 'buttonSVGIconRu' : 'buttonSVGIconEn');

            svgButtonsLang.forEach(function(buttonName) {
                if (this.ui.items[ buttonName ]) {
                    this.ui.items[ buttonName ].args[0].icoTmpl = CKEDITOR.getTemplate(templateNamePrefix + tmplButtonName);
                }
            }, editor);

            editor.on('mode', function() {
                var button = this.ui.get('SwitchMode');
                if (!button) {
                    return;
                }

                var iconNode = button.getElementIcon();
                if (!iconNode) {
                    return;
                }

                var newIconNode = CKEDITOR.dom.element.createFromHtml(CKEDITOR.getTemplate(templateNamePrefix + 'buttonSVGIconState').output({
                    'id': button._.id,
                    'iconName': 'switchmode',
                    'state': (this.mode === 'wysiwyg' ? 'on' : 'off')
                }));

                newIconNode.replace(iconNode);
            });
        }
    });
}());
