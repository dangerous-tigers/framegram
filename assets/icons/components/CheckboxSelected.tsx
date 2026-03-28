import { forwardRef, memo, Ref } from 'react';
import type { SVGProps } from 'react';

const SvgCheckboxSelected = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={18}
    height={18}
    fill='none'
    viewBox='0 0 18 18'
    ref={ref}
    {...props}
  >
    <path
      fill='currentcolor'
      d='M16 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M7 14 2 9l1.41-1.41L7 11.17l7.59-7.59L16 5z'
    />
  </svg>
);
const ForwardRef = forwardRef(SvgCheckboxSelected);
const Memo = memo(ForwardRef);
export default Memo;
