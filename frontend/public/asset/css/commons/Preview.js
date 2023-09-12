/* global UI, Capture, Workspace_buttons */


class Preview {
    static preview_box = UI.cls_std_element('div', 'preview_box');
    static prop = {height: 0, width: 0, header: 0, footer: 0, left_w: 0, right_w: 0};
    static make_preview() {

        var preview = UI.cls_std_element('div', 'preview');
        preview.append(UI.cls_std_element('div', 'preview_header ').resizable({
        }).html('header'))
                .append(UI.cls_std_element('div', 'preview_content').html('content'))
                .append(UI.cls_std_element('div', 'preview_footer ').html('footer').resizable({
                    handles: 'n'
                }))
                ;

        Preview.preview_box.height($('#n_2').height());
        Preview.preview_box.append(preview);
        Preview.preview_box.appendTo('#n_2');

        Preview.prop.left_w = $('#n_1').width();
        Preview.prop.left_w = $('#n_3').width();

        var p_h = Preview.prop.height = $('.preview_box').height();
        var p_w = Preview.prop.width = $('.preview_box').width();
        var p_header = Preview.prop.header = $('.preview_header').height();
        var p_footer = Preview.prop.footer = $('.preview_footer').height();
        new Test2('ph', p_h);
        new Test2('overall_ph', p_h + ' ' + p_header + ' ' + p_footer);


        //add some data in content
        var data = '';
        for (var i = 0; i < 38; i++) {
            data += ' some data';
            $('.preview_content').append(data);
        }
        Preview.resize_header();
//        Preview.prev_only_preview();




    }
    static resize_header() {
        $('.preview_header').resizable({
            handles: 's'
        });

    }
    static resize_left() {}
    static resize_right() {}
    static resize_footer() {}

    static prev_only_preview() {
        $('#n_1').hide();
        $('#n_3').hide();
        $('#n_2').css('left', 20 + 'px').css('right', 0 + 'px').css('width', $(window).width());
        $('body').append(Workspace_buttons.vertical_pin(30,0));
    }
    static prev_reset_wprkspace() {
        $('#n_1').show();
        $('#n_3').show();
        Capture.reset_position();
    }
}


