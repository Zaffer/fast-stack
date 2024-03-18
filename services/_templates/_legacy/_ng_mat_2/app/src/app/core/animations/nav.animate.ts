import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';

export const animateSnav = trigger('animateSnav', [
  state(
    'collapse',
    style({
      width: '69px',
    })
  ),
  state(
    'expand',
    style({
      width: '225px',
    })
  ),
  transition(
    'collapse <=> expand',
    animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
  ),
]);

export const animateSnavContent = trigger('animateSnavContent', [
  state(
    'collapse',
    style({
      'margin-left': '88px',
    })
  ),
  state(
    'expand',
    style({
      'margin-left': '225px',
    })
  ),
  transition('collapse <=> expand', animate('300ms ease-in')),
]);

export const animateSnavText = trigger('animateSnavText', [
  state(
    'hide',
    style({
      display: 'none',
      position: 'absolute',
      opacity: 0,
    })
  ),
  state(
    'show',
    style({
      'white-space': 'nowrap',
      display: 'block',
      position: 'relative',
      opacity: 1,
    })
  ),
  transition(
    'hide => show',
    animate(
      '200ms ease-in',
      keyframes([
        style({
          display: 'block',
          position: 'relative',
          opacity: 0,
        }),
        style({
          opacity: 1,
        }),
      ])
    )
  ),
  transition(
    'show => hide',
    animate(
      '200ms ease-out',
      keyframes([
        style({
          position: 'absolute',
          left: '3em',
          opacity: 0.5,
        }),
        style({
          opacity: 0,
        }),
      ])
    )
  ),
]);

export const animateSnavLock = trigger('animateSnavLock', [
  state('unlocked', style({ transform: 'rotate(0)' })),
  state('locked', style({ transform: 'rotate(-180deg)' })),
  transition('unlocked <=> locked', animate('300ms ease-in-out')),
]);
