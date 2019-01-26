import {
  transition,
  trigger,
  query,
  style,
  animate,
} from '@angular/animations';

export const FadeInAnimation =
  trigger('routeAnimations', [
    transition('* => *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(
        ':enter',
        [
          style({
            opacity: 0
          })
        ],
        { optional: true }
      ),
      query(
        ':leave',
        // here we apply a style and use the animate function to apply the style over 0.4 seconds
        [
          style({
            opacity: 1
          }),
          animate('0.4s',
            style({
              opacity: 0
            })
          )
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({
            opacity: 0
          }),
          animate('0.4s',
            style({
              opacity: 1
            })
          )
        ],
        { optional: true }
      )
    ])
  ]);
