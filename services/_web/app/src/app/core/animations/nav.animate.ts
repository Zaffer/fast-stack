import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';


export const animateSideNav = trigger('animateSideNav', [
  state('close',
    style({
      'width': '64px'
    })
  ),
  state('open',
    style({
      'width': '256px'
    })
  ),
  transition('close => open', animate('200ms ease-in')),
  transition('open => close', animate('200ms ease-out')),
]);


export const animateMainContent = trigger('animateMainContent', [
  state('close',
    style({
      'margin-left': '88px'
    })
  ),
  state('open',
    style({
      'margin-left': '2056px'
    })
  ),
  transition('close => open', animate('300ms ease-in')),
  transition('open => close', animate('300ms ease-in')),
]);


export const animateText = trigger('animateText', [
  state('hide',
    style({
      // display: 'none',
      // position: 'absolute',
      // opacity: 0
    })
  ),
  state('show',
    style({
      // 'white-space': 'nowrap',
      // display: 'block',
      // position: 'relative',
      // opacity: 1
    })
  ),
  transition('hide => show', animate('100ms ease-in',
    // keyframes([
    //   style({
    //     display: 'block',
    //     position: 'relative',
    //     opacity: 0,
    //   }),
    //   style({
    //     opacity: 1,
    //   }),
    // ])
  )),
  transition('show => hide', animate('100ms ease-out',
    // keyframes([
    //   style({
    //     position: 'absolute',
    //     left: '3em',
    //     opacity: 0.5,
    //   }),
    //   style({
    //     opacity: 0,
    //   }),
    // ])
  )),
]);