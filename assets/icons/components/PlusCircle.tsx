import type { SVGProps } from 'react';
import { Ref, forwardRef, memo } from 'react';
const SvgPlusCircle = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' ref={ref} {...props}>
    <g clipPath='url(#plus-circle_svg__a)'>
      <path
        fill='currentcolor'
        d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m3 11h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2V9a1 1 0 0 1 2 0v2h2a1 1 0 0 1 0 2'
      />
    </g>
    <defs>
      <clipPath id='plus-circle_svg__a'>
        <path fill='currentcolor' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgPlusCircle);
const Memo = memo(ForwardRef);
export default Memo;
