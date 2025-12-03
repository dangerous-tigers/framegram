import s from './style.module.scss';
import { Navigation } from '@/widgets/sidebar/ui/Navigation';

export const Sidebar = () => {
  return (
    <aside className={s.aside}>
      <Navigation />
    </aside>
  );
};
