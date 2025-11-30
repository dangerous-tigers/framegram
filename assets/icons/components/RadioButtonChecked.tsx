import type { SVGProps } from 'react';
import { Ref, forwardRef, memo } from 'react';
const SvgRadioButtonChecked = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' ref={ref} {...props}>
    <g clipPath='url(#radio_button_checked_svg__a)'>
      <path
        fill='currentcolor'
        d='M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5m0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8'
      />
    </g>
    <defs>
      <clipPath id='radio_button_checked_svg__a'>
        <path fill='currentcolor' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgRadioButtonChecked);
const Memo = memo(ForwardRef);
export default Memo;
