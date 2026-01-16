import s from './CatPreloader.module.scss';

import { Catpreloader } from '@/assets/icons';

export const CatPreloader = () => {
  return (
    <div
      className={s.root}
      aria-label='loading...'
    >
      <Catpreloader />
    </div>
  );
};
