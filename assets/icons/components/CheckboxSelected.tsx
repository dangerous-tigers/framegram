import type { SVGProps } from 'react';
import { Ref, forwardRef, memo } from 'react';
const SvgCheckboxSelected = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18' width={18} height={18} fill='none' ref={ref} {...props}>
    <path
      d='M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.11 18 18 17.1 18 16V2C18 0.9 17.11 0 16 0ZM7 14L2 9L3.41 7.59L7 11.17L14.59 3.58L16 5L7 14Z'
      fill='white'
    />
  </svg>
);

const ForwardRef = forwardRef(SvgCheckboxSelected);
const Memo = memo(ForwardRef);
export default Memo;
