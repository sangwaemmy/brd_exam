/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Left_right_easings {
    static get_show(item, width_to_slide, time_taken, event) {
        $(item).animate({left: width_to_slide}, time_taken, event);
    }

    static easeInQuad = 'easeInQuad';
    static swing = 'swing';
    static easeOutQuad = 'easeOutQuad';
    static easeInOutQuad = 'easeInOutQuad';
    static easeOutCubic = 'easeOutCubic';
    static easeInCubic = 'easeInCubic';
    static easeInOutCubic = 'easeInOutCubic';
    static easeOutQuart = 'easeOutQuart';
    static easeInQuart = 'easeInQuart';
    static easeInOutQuart = 'easeInOutQuart';
    static easeOutQuint = 'easeOutQuint';
    static easeInQuint = 'easeInQuint';
    static easeInOutQuint = 'easeInOutQuint';
    static easeOutExpo = 'easeOutExpo';
    static easeInExpo = 'easeInExpo';
    static easeInOutExpo = 'easeInOutExpo';
    static easeOutCirc = 'easeOutCirc';
    static easeInCirc = 'easeInCirc';
    static easeInOutCirc = 'easeInOutCirc';
    static easeOutSine = 'easeOutSine';
    static easeInSine = 'easeInSine';
    static easeInOutSine = 'easeInOutSine';
    static easeOutBack = 'easeOutBack';
    static easeInBack = 'easeInBack';
    static easeInOutBack = 'easeInOutBack';
    static easeOutBounce = 'easeOutBounce';
    static easeInBounce = 'easeInBounce';
    static easeInOutBounce = 'easeInOutBounce';
}



class Home{
    static hide_children(){
        $('.off_c').children();
    }
}