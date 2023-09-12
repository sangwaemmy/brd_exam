/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
 var global=2000;
function glb_show_hide(item) {
    if ($(item).is(':visible')) {
        $(item).hide(0);
    } else {
        $(item).show(0);
    }
}