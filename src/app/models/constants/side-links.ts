import {
  Bookmark,
  Telescope,
  BookOpenText,
  UsersRound,
  Phone,
  ShieldQuestionMark,
  Settings,
  LucideIconData,
} from 'lucide-angular';

export const SIDE_LIST: { name: string; path: string; icon: LucideIconData }[] =
  [
    {
      name: 'Discover',
      path: '/',
      icon: Telescope,
    },
    {
      name: 'Watchlist',
      path: '/watchlist',
      icon: Bookmark,
    },
    {
      name: 'Blog',
      path: '/blog',
      icon: BookOpenText,
    },
    {
      name: 'Artists',
      path: '/artists',
      icon: UsersRound,
    },
  ];

export const SIDE_LIST_INFOS: {
  name: string;
  path?: string;
  icon: LucideIconData;
}[] = [
  {
    name: 'Contact Us',
    path: '/contact',
    icon: Phone,
  },
  {
    name: 'Help Center',
    icon: ShieldQuestionMark,
  },
  {
    name: 'Settings',
    icon: Settings,
  },
];
