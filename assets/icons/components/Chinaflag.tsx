import { forwardRef, memo, Ref } from 'react';
import type { SVGProps } from 'react';

const SvgChinaflag = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={32}
    height={32}
    viewBox='0 0 32 32'
    ref={ref}
    {...props}
  >
    <rect
      width={30}
      height={24}
      x={1}
      y={4}
      fill='#db362f'
      rx={4}
      ry={4}
    />
    <path
      d='M27 4H5a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4m3 20c0 1.654-1.346 3-3 3H5c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3h22c1.654 0 3 1.346 3 3z'
      opacity={0.15}
    />
    <path
      fill='#ff0'
      d='M7.958 10.152 7.19 7.786l-.769 2.366H3.934l2.012 1.462-.769 2.365 2.013-1.462 2.012 1.462-.769-2.365 2.013-1.462zM12.725 8.187l.427.711.072-.826.808-.186-.763-.324.073-.826-.544.625-.763-.324.426.711-.544.625zM14.865 10.372l.117.821.388-.733.817.142-.577-.595.387-.733-.744.365-.578-.595.118.821-.745.365zM15.597 13.612l.653-.511-.829.029-.284-.778-.228.797-.828.03.688.463-.228.797.653-.511.687.463zM13.26 15.535l.038-.828-.518.647-.775-.292.455.692-.518.648.8-.22.456.693.038-.828.8-.22z'
    />
    <path
      fill='currentcolor'
      d='M27 5H5a3 3 0 0 0-3 3v1a3 3 0 0 1 3-3h22a3 3 0 0 1 3 3V8a3 3 0 0 0-3-3'
      opacity={0.2}
    />
  </svg>
);
const ForwardRef = forwardRef(SvgChinaflag);
const Memo = memo(ForwardRef);
export default Memo;
