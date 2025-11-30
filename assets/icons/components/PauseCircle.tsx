import type { SVGProps } from 'react';
import { Ref, forwardRef, memo } from 'react';
const SvgPauseCircle = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' ref={ref} {...props}>
    <g clipPath='url(#pause-circle_svg__a)'>
      <path
        fill='currentcolor'
        d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m-2 13a1 1 0 1 1-2 0V9a1 1 0 0 1 2 0zm6 0a1 1 0 0 1-2 0V9a1 1 0 0 1 2 0z'
      />
    </g>
    <defs>
      <clipPath id='pause-circle_svg__a'>
        <path fill='currentcolor' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgPauseCircle);
const Memo = memo(ForwardRef);
export default Memo;
