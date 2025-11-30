import { SidebarItem } from '@/widgets/sidebar/ui/sidebarItem/SidebarItem';
import { Bookmark, HomeOutline, MessageCircle, Person, PlusSquareOutline, Search, TrendingUp } from '@/assets/icons';
import s from './style.module.scss';

export const Sidebar = () => {
  return (
    <aside>
      <div className={s.list}>
        <SidebarItem href='/' Component={<HomeOutline />}>
          {' '}
          Feed
        </SidebarItem>
        <SidebarItem href='/create' Component={<PlusSquareOutline />}>
          {' '}
          Create
        </SidebarItem>
        <SidebarItem href='/profile' Component={<Person />}>
          {' '}
          My Profile
        </SidebarItem>
        <SidebarItem href='/messenger' Component={<MessageCircle />}>
          {' '}
          Messenger
        </SidebarItem>
        <SidebarItem href='/search' Component={<Search />}>
          {' '}
          Search
        </SidebarItem>
        <SidebarItem href='/statistics' Component={<TrendingUp />}>
          {' '}
          Statistics
        </SidebarItem>
        <SidebarItem href='/favorites' Component={<Bookmark />}>
          {' '}
          Favorites
        </SidebarItem>
      </div>
    </aside>
  );
};
