/* global UI, Resizer, Preview */

UI.current.obj = $('.workspace_box').attr('id');

Resizer.resize_workspace = true;
var cols = 3, rows = 3;
var parent_w = $(UI.curr_obj()).width();
var parent_h = $(UI.curr_obj()).height();
var perc_w = 100 / cols;
var perc_h = 100 / rows;
var w = Math.round(perc_w * parent_w / 100);
let h = Math.round(perc_h * parent_h / 100);

var left_pos = 0;
var curr_width = 0, curr_height = 0;
var some_text = 'done';

for (var i = 0; i < rows; i++) {
    manage_rows(i);
    for (var j = 0; j < cols; j++) {
        //make side panes small
        if (i === 0) {
            perc_w = 100;
            w = Math.round(perc_w * parent_w / 100);
            left_pos = 0;

        } else if (i === 2) {
            perc_h = 5;
            h = Math.round(perc_h * parent_h / 100);
            top_pos = curr_height - h;
        } else if (i !== 0) {

            if (j === 0) {
                perc_w = 10;
                w = Math.round(perc_w * parent_w / 100);
            }
            if (j === 1) {
                perc_w = 80;
                w = Math.round(perc_w * parent_w / 100);
            }
            if (j === 2) {
                perc_w = 10;
                w = Math.round(perc_w * parent_w / 100);
            }
            left_pos = curr_width;
            curr_width += w;

            if (j === 0) {
                left_pos = 0;
                curr_width = w;
            }
        }

        let cell = UI.cls_std_element('div', 'cell');
        UI.cls_add_cell($('.workspace_box'),
                top_pos + 'px'
                , left_pos + 'px', w + 'px'
                , h + 'px'
                , ' ')
                .attr('id', 'n_' + UI.c);
        UI.c += 1;
    }

}

function manage_row_cols(i, j) {

}
function manage_rows(i) {
//Rows
    if (i === 1) {
        perc_h = 90;
        h = Math.round(perc_h * parent_h / 100);
    }
    if (i === 2) {
        perc_h = 5;
        h = Math.round(perc_h * parent_h / 100);
    }

    top_pos = curr_height;
    curr_height += h;
    if (i === 0) {
        top_pos = 0;
        perc_h = 5;
        h = Math.round(perc_h * parent_h / 100);
        curr_height = h;
        cols = 1;
        perc_w = 100;
        w = Math.round(perc_w * parent_w / 100);
    } else if (i === 2) {
        cols = 1;
        h = Math.round(perc_h * parent_h / 100);
        left_pos = 0;
        perc_w = 100;
        w = Math.round(perc_w * parent_w / 100);
    } else {
        cols = 3;

    }
}

/*
 * Calculating the widths of the cells
 * This must happen after the placement of the while grid. 
 */
var init_width = $(window).width();
var curr_width = $('.workspace_box').width();
var top_cell_width = $('#n_0').width();
var left_cell_width = $('#n_1').width();
var middle_cell_w = $('#n_2').width();
var right_cell_w = $('#n_3').width();
var botton_cell = $('#n_4').width();


//Calculate the width percentage, Initially
var perc_left = left_cell_width / init_width * 100;
var perc_middle = middle_cell_w / init_width * 100;
var perc_right = right_cell_w / init_width * 100;
$(window).resize(function () {
    //with 5 cells, manage the height
    get_items_height();
    get_items_width();

});

function get_items_height() {
    var win_height = $(window).height() - 6;
    var top_cell = $('#n_0').height();
    var botton_cell = $('#n_4').height();
    $('.workspace_box').height(win_height);
    var curr_height = $('.workspace_box').height();
    $('#n_1, #n_2, #n_3').height(curr_height - (botton_cell + top_cell));
    $('#n_4').css('top', top_cell + $('#n_1').height());

}
function get_items_width() {
    var win_width = $(window).width();


//                left_cell_width = Resizer.workspace.left_w = (Resizer.workspace.left_w !== 0)
//                        ? Resizer.workspace.left_w 
//                        : perc_left * win_width / 100;
//                        
//                middle_cell_w = Resizer.workspace.middle_w = (Resizer.workspace.middle_w !== 0)
//                        ? Resizer.workspace.middle_w 
//                        : perc_middle * win_width / 100;
//                        
//                right_cell_w = Resizer.workspace.right_w = (Resizer.workspace.right_w !== 0)
//                        ? Resizer.workspace.right_w 
//                        : perc_right * win_width / 100;


    left_cell_width = perc_left * win_width / 100;
    middle_cell_w = perc_middle * win_width / 100;
    right_cell_w = perc_right * win_width / 100;

    $('#n_0, #n_4').width(win_width - 5);
    $('#n_1').width(left_cell_width);
    $('#n_2').width(middle_cell_w);
    $('#n_3').width(right_cell_w);

    //Calculate the left pos of cells
    $('#n_1').css('left', 0 + 'px');
    $('#n_2').css('left', left_cell_width + 'px');
    $('#n_3').css('left', left_cell_width + middle_cell_w + 'px');

    //Add preview 

}
Preview.make_preview();

class Capture {

    static init_width = $(window).width();
    static curr_width = $('.workspace_box').width();
    static top_cell_width = $('#n_0').width();
    static left_cell_width = $('#n_1').width();
    static middle_cell_w = $('#n_2').width();
    static right_cell_w = $('#n_3').width();
    static botton_cell = $('#n_4').width();

    //Percentage
    static perc_left = left_cell_width / init_width * 100;
    static perc_middle = middle_cell_w / init_width * 100;
    static perc_right = right_cell_w / init_width * 100;

    static reset_position() {
        //Calculate the left pos of cells
        $('#n_1').css('left', 0 + 'px');
        $('#n_2').css('left', Capture.left_cell_width + 'px');
        $('#n_3').css('left', Capture.left_cell_width + Capture.middle_cell_w + 'px')
                .css('width', );

        var win_width = $(window).width();
        left_cell_width = Capture.perc_left * win_width / 100;
        middle_cell_w = Capture.perc_middle * win_width / 100;
        right_cell_w = Capture.perc_right * win_width / 100;

        $('#n_0, #n_4').width(win_width - 5);
        $('#n_1').width(Capture.left_cell_width);
        $('#n_2').width(Capture.middle_cell_w);
        $('#n_3').width(Capture.right_cell_w);

    }

}


class Workspace_buttons {
    static make_layout() {

        const ws = Workspace_buttons;
        var lay = UI.cls_std_element('div', 'layout_buttons row  relate');

        lay.append(ws.pin_proj_tools_btn());
        var content = UI.cls_std_element('div', 'left_content vertical_scroll').html('content');

        lay.appendTo('#n_1');
        content.appendTo('#n_1');
        $('.layout_buttons').css('width', $('#n_1').width());
              $('.left_content').css('height',$('#n_1').height());
        ws.vertical_pin();

    }
    //<editor-fold defaultstate="collapsed" desc="--btns--">
    static pin_proj_tools_btn() {
        const ws = Workspace_buttons;
        var pt = UI.cls_std_element('div', 'btn_pt top_left  col_lg_10 col_md_10 col_sm_10 row brd');
        pt.append(ws.project());
        pt.append(ws.tools());
        pt.append(ws.remove_btn());
        return pt;
    }
    static remove_btn() {
        const ws = Workspace_buttons;
        return UI.cls_std_element('div', 'btn_remove col_lg_2 col_md_2 col_sm_2  brd hand_cursor')
                .html('X');
    }
    static project() {
        return UI.cls_std_element('div', 'project col_lg_5 col_md_5 col_sm_5 brd').html('project');
    }
    static tools() {
        return UI.cls_std_element('div', 'tools col_lg_5 col_md_5 col_sm_5 brd').html('tools');
    }

    static vertical_pin() {
        return UI.cls_std_element('div', 'vertical_pin full_h_left')
                .append(UI.cls_std_element('div', 'vert_proj').html('project'))
                .append(UI.cls_std_element('div', 'vert_tools').html('Tools'))
                .appendTo($('#n_1'));
    }
    static get_left_pane(x,y){
        return UI.cls_std_element('div', 'vertical_pin full_h_left')
                .append(UI.cls_std_element('div', 'vert_proj').html('project'))
                .append(UI.cls_std_element('div', 'vert_tools').html('Tools'))
                .css('top',y+'px').css('left',x+'px');
    }
    //</editor-fold>

    static click_minimize() {}
    static click_pin_unpin() {}
    static click_close() {}
}

Workspace_buttons.make_layout();

//add some data in content
var data = '';
for (var i = 0; i < 18; i++) {
    data += ' some data';
    $('.left_content').append(data);
}



new Capture();//to get the initial sizes of the panes, so as to help the reset


var height = $('#n_1').height();
$('#n_1').scroll(function () {
    var scroll = $(this).scrollTop();
    new Test2('top_ofleftpane', $('#n_1').css('top') + ' full h: ' + $(this).children('.full_h_right').offset().top);
    $(this).children('.full_h_right').offset().left=19;
});
$('#n_1, #n_3').css('background-color', '#0e1029');
            