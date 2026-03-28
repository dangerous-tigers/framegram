import { Navigation } from '../Navigation';

import s from './sidebar.module.scss';

export const Sidebar = () => {
  return (
    <aside className={s.aside}>
      <Navigation />
    </aside>
  );
};
