/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global UI, Resizer */

class Vertical_line {

    static  sel_class;
    static this_obj;
    static show_line = false;
    static flag = false;
    static v_show_line = false;
    static right_this;
    static v_move_line(e) {
        if (Vertical_line.show_line) {
            $('.vertical_line').show();
        }
        $('.vertical_line').css('left', e.clientX + 2);
    }
    static v_same_line(e) {

        function big_item1_item2(item1, item2) {
            return (item1 === (item2 + 1) || item2 === (item1 + 1) || item1 === item2);
        }
        if (!Resizer.resize_workspace) {
            $('.' + this.sel_class).each((index, item) => {
                var right_each = Math.round($(item).offset().left + $(item).width()),
                        right_this = Math.round($('#' + this.this_obj).offset().left)
                        + $('#' + this.this_obj).width();

                if (big_item1_item2(right_each, right_this)  && $(item).attr('id') !== this.this_obj) {
                    $('.vertical_line').show();
                    this.show_line = true;
                    this.v_delay_move();

                } else {
                    $('.vertical_line').hide();
                }
            });
        }
    }
    static v_check_min_width() {
        if ($('#' + Vertical_line.this_obj).width() === min_cell_width) {

            disable_moveAnd_vertical_line();
            console.log('Stopped resizing size reached');
            $(window).css('cursor', ' default;');
        }
    }
    static v_disable_moveAnd_vertical_line() {
        flag = false;
        $('.vertical_line').hide(0);
    }

    static v_delay_move() {
        this.flag = false;
        Resizer.turnoff();
        show_line_timer();
        var c = 0, stopper;
        count_resume();
        function count_resume() {
            stopper = setTimeout(count_resume, 100);
            if (c === 2) {
                Vertical_line.flag = true;
                UI.move_stat.move_status = true;
                Vertical_line.show_line = false;
                clearTimeout(stopper);
            }
            c += 1;
        }
        var show = 0, show_stopper;//hide in 10th time
        function show_line_timer() {
            show_stopper = setTimeout(show_line_timer, 1);

            if (Vertical_line.show_line) {
                $('.vertical_line').show();
            }
            if (show === 50) {
                clearTimeout(show_stopper);
            }
            show += 1;
        }
    }
//</editor-fold>
}