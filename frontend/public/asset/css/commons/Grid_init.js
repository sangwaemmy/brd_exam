/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Nested, Vertical_line, Option_pane */

class Common {
    static class_name = {name: 'cell'};
}
class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
    }

}
class UI {
    //add element

    static move_stat = {this_obj: '', move_status: 'false'};
    static cell_prop = {cell_w: 0, next_left: 0, second_level_right: false};
    static c = 0;
    static current = {obj: '', items_below: []}
    static cls_std_element(element, class_name) {
        return $(document.createElement(element)).addClass(class_name);
    }

    static cls_add_cell(parent, top, left, w, h, text) {
        let cell = UI.cls_std_element('div', 'cell');
        cell.css('top', top).css('left', left).css('width', w).css('height', h).html(text)
                .on('click', function () {
                    if (!UI.has_children($(this), '.' + Common.class_name.name)) {
                        Nested.this_obj = $(this).attr('id');
                        UI.current.obj = $(this).attr('id');
                        new Test2('clicked cell', $(this).attr('id'));
                    }
                }).on('dblclick', function (e) {
            Option_pane.this_obj = $(this);
            Option_pane.ids = $(this).attr('id');
            Option_pane.x = 20;
            Option_pane.y = 20;

            Option_pane.bkg();
            Option_pane.pane_dialog();
            Option_pane.show_pane();

        }).on('mousemove', function (e) {
            if (($(this).children('.full_h_right').offset().left - e.clientX) <= 15) {
                $(this).children('.full_h_right').addClass('handler_highlight');

            } else {
                $(this).children('.full_h_right').removeClass('handler_highlight');
            }
            new Test2('mouseMove', ' mouse: ' + e.clientX
                    + '  the handler: ' + $(this).children('.full_h_right').offset().left);
        })
                .on('mouseleave', function () {
                    $(this).children('.full_h_right').removeClass('handler_highlight');
                }).resizable({handles: 's', start: function () {

                UI.hight_light_items_below($(this));
            }, resize: function () {
                Resizer.same_height($(this));
            }}
        ).append(UI.cls_add_resizer()).appendTo(parent);

        return cell;
    }
    //Check the item on the next positions
    static item_same_line(item1, item2) {//just check the same top position
        try {
            return ($(item1).offset().top === $(item2).offset().top);
        } catch (e) {
            return false;
        }


    }
    static item_next_right(item, sel_class) {
        return ($(item).next('.' + sel_class).length > 0 && UI.item_same_line($(item), $(item).next('.' + sel_class)));
    }
    //the grid
    static cls_add_resizer() {
        let resizer = UI.cls_std_element('div', 'full_h_right bg_red');
        resizer.on('mousedown', function () {
            UI.resizer_pressed($(this));
        });
        return resizer;
    }
    static resizer_pressed(item) {
        new Test2('start_resize', 'started to resize');
        var c = Common.class_name.name;
        if (!UI.has_children($(item).parent('.' + c), '.' + c)) {
            new Test2('has no children', +$(item).parent('.' + c).attr('id'));
            UI.current.obj = $(item).parent('.' + c).attr('id');
            ;
            if (UI.item_next_right($(item).parent(), Common.class_name.name)) {
                var next = $(item).parent('.' + c).next('.' + c);
                var sl = UI.item_same_line(next.next('.' + c), $(item).parent());
                UI.move_stat.move_status = true;
                UI.move_stat.this_obj = $(item);
                if (next.next().length > 0 && sl) {
                    UI.cell_prop.next_left = $(item).parent().next().next().offset().left;
                    UI.cell_prop.second_level_right = true;
                    new Test2('second level', UI.cell_prop.second_level_right);
                } else {
                    new Test2('no second level', UI.cell_prop.second_level_right);
                    UI.cell_prop.second_level_right = false;
                }
//                new Test('itemright');

            }

        }
    }
    static hight_light_items_below(this_obj) {
        //get my top parent
        var top_from_parent = $(this_obj).offset().top;
        var top_with_my_height = top_from_parent + $(this_obj).innerHeight();
        UI.current.items_below = [];
        this_obj.siblings('.' + Common.class_name.name).each((index, item) => {
            if ($(item).offset().top === top_with_my_height
                    || ($(item).offset().top === top_with_my_height + 1)
                    || ($(item).offset().top === top_with_my_height + 2)
                    || ($(item).offset().top === top_with_my_height + 3)
                    || ($(item).offset().top === top_with_my_height + 4)
                    || ($(item).offset().top === top_with_my_height + 5)
                    || ($(item).offset().top === top_with_my_height + 6)
                    || ($(item).offset().top === top_with_my_height + 7)
                    ) {
                Resizer.resizing.initial_height = $(item).height();
                UI.current.items_below.push($(item).attr('id'));
                Resizer.resizing.top_after_below = $(item).position().top + $(item).height();
            }

        });
        new Test2('items below', UI.current.items_below.length);
    }
    static move() {
        return UI.move_stat.move_status;
    }
    static curr_obj() {
        return UI.current.obj !== '' ? $('#' + UI.current.obj) : '.content';
    }

    static has_children(item, item_class) {
        return $(item).children(item_class).length > 0;

    }

    static display_grid(rows, cols) {
        var parent_w = $(UI.curr_obj()).width();
        var parent_h = $(UI.curr_obj()).height();
        var perc_w = 100 / cols;
        var perc_h = 100 / rows;
        let w = Math.round(perc_w * parent_w / 100);
        UI.cell_prop.cell_w = w;
        let h = Math.round(perc_h * parent_h / 100);
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                UI.cls_add_cell(UI.curr_obj(), (i * h) + 'px', (j * w) + 'px', w + 'px', h + 'px', '(' + i + ',' + j + ')').attr('id', UI.c);
                UI.c += 1;
            }
        }
    }

}
class Resizer {
//initialise mousedown

    static resizing = {
        item1: '', item2: '', clicked_down: 'false', initial_height: 0, top_after_below: 0
    }
    static resize_workspace = false;
    static workspace = {left_w: 0, middle_w: 0, right_w: 0};
    static equal_children_width(this_obj, item_class) {
        var c = 0, w = 0, top = 0;
        $(this_obj).children(item_class).each((index, item) => {
            if ($(item).next(item_class).length < 1) {
                $(item).width($(item).parent().width() - $(item).position().left);
                if ($(item).width() === 50) {
                    Resizer.turnoff();
                    $(item).css('border', 'red');
                    $(item).prev().width($(item).position().left - $(item).prev().position().left);
                } else {

                }
            }

        });

    }
    static turnoff() {
        UI.move_stat.move_status = false;
        $('.vertical_line').hide(0);
        new Test('resizeoff');
    }

    static resizing_moving(e, item, item_class) {
        if (UI.move() === true) {
            item = $(UI.move_stat.this_obj);
            var item_next = item.parent(item_class).next(item_class);
            var pos_left = item.parent(item_class).offset().left;
            var pos_left_parent = $(UI.curr_obj()).parent().offset().left;
            var pos_x = e.clientX;
            item.parent(item_class).width(pos_x - pos_left);
            item_next.css('left', pos_x - pos_left_parent + 1);
            if (UI.cell_prop.second_level_right) {
                item_next.width(UI.cell_prop.next_left - pos_x - 2);
            } else {//resize the last cell
                var left_to_x = pos_x - pos_left_parent;
                let rem_width = $(UI.curr_obj()).parent().width() - left_to_x - 2;
                item_next.width(rem_width);
            }

            //resize the next's children
            Resizer.equal_children_width(item_next, '.' + Common.class_name.name);
            Vertical_line.sel_class = Common.class_name.name;
            Vertical_line.v_move_line(e);
            Vertical_line.v_same_line(e);
             
            if (Resizer.resize_workspace) {
                Resizer.workspace_cell_width(item);
            }
        }


    }

    static same_height(this_obj) {
        this_obj.siblings('.' + Common.class_name.name).each((index, item) => {
            if ($(this_obj).position().top === $(item).position().top) {
                $(item).height(this_obj.height());
            }
            console.log('\n\n-----');
            UI.current.items_below.forEach((id, index) => {
                new Test2('captured items beow', id);
                if ($(item).attr('id') === id) {
                    $(item).css('top', $(this_obj).position().top + $(this_obj).height());
                    var init_h = Resizer.resizing.initial_height;
                    var diff = $(this_obj).height() - init_h;
                    $(item).height(Resizer.resizing.top_after_below - ($(this_obj).position().top + $(this_obj).height()));
                }
            });
        });
    }

    /*
     * This give the width of the top cell and the bottom cell 100% of the total window
     */
    static workspace_cell_width(item) {
        //if we are resizing left pane
        var real_item=$(item).parent();
        var width=real_item.width();
        $(real_item).children('.layout_buttons').width(width);
        new Test2('resizing_workspace',$(item).attr('class'));
    }
}

//document.addEventListener('DOMContentLoaded', UI.display_grid(2, 8));
$(document).ready(() => {
    var cols = 0;
    var rows = 0;
    $('#txt_cols, #txt_rows').change(function () {
        cols = $('#txt_cols').val();
        rows = $('#txt_rows').val();
        $(UI.curr_obj()).children('.' + Common.class_name.name).remove();
        UI.display_grid(rows, cols);
    });
    $('.gridable').click(function () {
        if (!UI.has_children($(this), '.' + Common.class_name.name)) {
            UI.current.obj = $(this).attr('id');
        }
    });
    //You content
});

window.addEventListener('mousemove', (e) => {
    Resizer.resizing_moving(e, '.full_h_right', '.cell');
});
window.addEventListener('mouseup', () => {
    Resizer.turnoff();
}
);



        