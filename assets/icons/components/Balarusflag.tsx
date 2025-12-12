import type { SVGProps } from 'react';
import { Ref, forwardRef, memo } from 'react';
const SvgBalarusflag = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={32}
    height={32}
    viewBox='0 0 32 32'
    ref={ref}
    {...props}
  >
    <path
      fill='#be2d27'
      d='M1 8v13h30V8a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4'
    />
    <path
      fill='#367b37'
      d='M27 28H5c-2.208 0-4-1.792-4-4v-4h30v4c0 2.208-1.792 4-4 4'
    />
    <path
      fill='currentcolor'
      d='m4 13 1 3-1 3-1-3zM2.5 8l1 3-1 3-1-3zM5.5 8l1 3-1 3-1-3zM2.5 18l1 3-1 3-1-3zM5.5 18l1 3-1 3-1-3zM1 13v6l1-3zM7 13l-1 3 1 3zM5 6l-.645-1.935q-.405.066-.779.208L3 6l1 3zM1.853 5.558A3.97 3.97 0 0 0 1 8v1l1-3zM6.667 4 6 6l1 3V4zM5 26l-.645 1.935a4 4 0 0 1-.779-.208L3 26l1-3zM1.853 26.442A3.97 3.97 0 0 1 1 24v-1l1 3zM6.667 28 6 26l1-3v5z'
    />
    <path
      d='M27 4H5a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4m3 20c0 1.654-1.346 3-3 3H5c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3h22c1.654 0 3 1.346 3 3z'
      opacity={0.15}
    />
    <path
      fill='currentcolor'
      d='M27 5H5a3 3 0 0 0-3 3v1a3 3 0 0 1 3-3h22a3 3 0 0 1 3 3V8a3 3 0 0 0-3-3'
      opacity={0.2}
    />
  </svg>
);
const ForwardRef = forwardRef(SvgBalarusflag);
const Memo = memo(ForwardRef);
export default Memo;
