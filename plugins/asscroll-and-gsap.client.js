import ASScroll from '@ashthornton/asscroll'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from '../vendor/CustomEase'
import { Draggable } from '../vendor/Draggable'
import { InertiaPlugin } from '../vendor/InertiaPlugin'
gsap.registerPlugin(CustomEase, Draggable, InertiaPlugin, ScrollTrigger);

const asscroll = new ASScroll({
  ease: 0.09,
  touchScrollType: 'scrollTop',
  customScrollbar: false,
});

const baseAnimationConfig = {
  duration: 1.0,
  rotate: 3,
}

const easing = {
  transform: CustomEase.create('transform', 'M0,0 C0.44,0.05 0.17,1 1,1'),
  transformReverse: CustomEase.create('transformReverse', 'M0,0 C0,0.852 0.87,0.542 1,1'),
  colorAndOpacity: CustomEase.create('colorAndOpacity', 'M0,0 C0.26,0.16 0.1,1 1,1 '),
}

ScrollTrigger.defaults({
  scroller: asscroll.containerElement
})
ScrollTrigger.scrollerProxy(asscroll.containerElement, {
  scrollTop(value) {
    if (arguments.length) {
      asscroll.currentPos = value;
      return;
    }
    return asscroll.currentPos;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
  },
});
gsap.ticker.add(ScrollTrigger.update);
ScrollTrigger.addEventListener("refresh", asscroll.resize);

export default (context, inject) => {
  inject('asscroll', asscroll);
  inject('gsap', gsap);
  inject('ScrollTrigger', ScrollTrigger);
  inject('Draggable', Draggable);
  inject('easing', easing);
  inject('baseAnimationConfig', baseAnimationConfig);
}

/**
 * ロード時に再度有効化
 * https://github.com/hisamikurita/hisamikurita-portfoliosite/issues/11
 */
window.addEventListener('load', () => {
  asscroll.disable();
  asscroll.enable();
});