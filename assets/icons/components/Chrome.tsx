import { forwardRef, memo, Ref } from 'react';
import type { SVGProps } from 'react';

const SvgChrome = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={36}
    height={36}
    fill='none'
    viewBox='0 0 36 36'
    ref={ref}
    {...props}
  >
    <path
      fill='currentcolor'
      d='M6.007 4.577A17.93 17.93 0 0 1 18 0c6.908 0 12.907 3.89 15.924 9.6H18a8.4 8.4 0 0 0-7.751 5.158z'
    />
    <path
      fill='currentcolor'
      d='M4.19 6.455A17.93 17.93 0 0 0 0 18c0 7.978 5.188 14.743 12.375 17.104l6.746-8.778a8.403 8.403 0 0 1-9.31-6.445 1.2 1.2 0 0 1-.119-.22z'
    />
    <path
      fill='currentcolor'
      d='M14.916 35.737A18 18 0 0 0 18 36c9.942 0 18-8.058 18-18 0-2.108-.363-4.132-1.029-6.012A1 1 0 0 1 34.8 12H23.879a8.37 8.37 0 0 1 2.52 6 8.37 8.37 0 0 1-2.259 5.732l-.029.04z'
    />
    <path
      fill='currentcolor'
      d='M12 18a6 6 0 1 1 12 0 6 6 0 0 1-12 0'
    />
  </svg>
);
const ForwardRef = forwardRef(SvgChrome);
const Memo = memo(ForwardRef);
export default Memo;
