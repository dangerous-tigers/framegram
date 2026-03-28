import { Catpreloader } from '@/assets/icons';

import s from './CatPreloader.module.scss';

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
