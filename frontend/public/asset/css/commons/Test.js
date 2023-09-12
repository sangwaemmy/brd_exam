/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class Test2 {
    constructor(label, item) {
        this.item = item;
        this.label = label;
        if (label === 'index') {
            console.log('The index: ' + item);
        }
        if (label === 'ratio') {
            console.log('ratio ' + item);
        }
        if (label === 'cell_width') {
            console.log('cell width: ' + item);
        }
        if (label === 'calc') {
            console.log('the size on the left remains; ' + item);
        }
        if (label === 'second level') {
            console.log('tgere is a second level');
        }
        if (label === 'no second level') {
//            console.log('There is no second level');
        }
        if (label === 'clicked cell') {
//            console.log('the id of the clicked cell: ' + item);
        }
        if (label === 'has no children') {
//            console.log('has no children at all id is: ' + item);
        }
        if (label==='items below') {
            console.log('item below total: '+ item);
        }
        if (label==='captured items beow') {
            console.log('id: '+ item);
        }
        if (label==='mouseMove') {
//            console.log('The mouse os moving on the cell: '+item);
        }
        
        if (label==='ph') {
//            console.log('preview header: '+ item);
        }
        if (label==='overall_ph') {
            console.log('the overall: '+ item);
        }
        if (label==='resizing_workspace') {
//            console.log('class of the item is: '+item); 
        }
        if (label==='top_ofleftpane') {
            console.log('left pane top: '+ item);
        }
    }
}
class Test {
    constructor(item) {
        this.item = item;
        try {
            if (item.hasClass('full_h_right')) {
                $('.full_h_right').click(function () {
                    console.log('Click test passed');
                });
            }

        } catch (e) {

        }
        try {

            if (item === 'itemright') {
                console.log('we have item on the right');
            }
            if (item === 'noitemright') {
                console.log('we have no item on the right');
            }
            if (item === 'nesting') {
                console.log('We have started nesting, ...');
            }

//            if (item === 'move') {
//                console.log('we are moving');
//            }
//            if (item === 'cant move') {
//                console.log('cant move (flag off)');
//            }
//       
//            if (item === 'resizeoff') {
//                console.log('Turned off resizing');
//            }
//
//        
//            if (item.subsstring(0, 5) === 'move_e') {
//                console.log('where moving: ' + item.subsstring(5, 6));
//            }

        } catch (e) {

        }


    }

}
