import type { SVGProps } from 'react';
import { Ref, forwardRef, memo } from 'react';
const SvgMove = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='currentColor'
    stroke='currentColor'
    viewBox='0 0 24 24'
    ref={ref}
    {...props}
  >
    <path d='M9.47 6.53a.75.75 0 0 0 1.06 0l.72-.72v5.44H5.81l.72-.72a.75.75 0 1 0-1.06-1.06l-2 2a.75.75 0 0 0 0 1.06l2 2a.75.75 0 0 0 1.06-1.06l-.72-.72h5.44v5.44l-.72-.72a.75.75 0 1 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l2-2a.75.75 0 1 0-1.06-1.06l-.72.72v-5.44h5.44l-.72.72a.75.75 0 1 0 1.06 1.06l2-2a.75.75 0 0 0 0-1.06l-2-2a.75.75 0 1 0-1.06 1.06l.72.72h-5.44V5.81l.72.72a.75.75 0 1 0 1.06-1.06l-2-2a.75.75 0 0 0-1.06 0l-2 2a.75.75 0 0 0 0 1.06Z' />
  </svg>
);
const ForwardRef = forwardRef(SvgMove);
const Memo = memo(ForwardRef);
export default Memo;
