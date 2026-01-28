import type { SVGProps } from 'react';
import { Ref, forwardRef, memo } from 'react';
const SvgHandle = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width={20}
    fill='currentColor'
    stroke='currentColor'
    viewBox='0 0 20 20'
    height={20}
    ref={ref}
    {...props}
  >
    <path d='M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z' />
  </svg>
);
const ForwardRef = forwardRef(SvgHandle);
const Memo = memo(ForwardRef);
export default Memo;
