import type { SVGProps } from 'react';
import { Ref, forwardRef, memo } from 'react';
const SvgBlock1 = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' ref={ref} {...props}>
    <g clipPath='url(#block-1_svg__a)'>
      <path fill='currentcolor' d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m0 18a8 8 0 1 1 0-16.001A8 8 0 0 1 12 20' />
      <path
        stroke='currentcolor'
        strokeDasharray='6 6'
        strokeLinecap='round'
        strokeWidth={2.3}
        d='m7.681 18.405 8.724-13.086'
      />
    </g>
    <defs>
      <clipPath id='block-1_svg__a'>
        <path fill='currentcolor' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgBlock1);
const Memo = memo(ForwardRef);
export default Memo;
