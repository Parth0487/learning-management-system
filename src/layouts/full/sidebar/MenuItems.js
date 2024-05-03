import {
  IconLayoutDashboard,
  IconClipboard,
  IconTextSpellcheck,
  IconSpeakerphone,
  IconTable,
  IconUser,
  IconFileDescription,
  IconFile,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const userDetails = JSON.parse(localStorage.getItem('userDetails'));
console.log('USER: ', userDetails);

const Menuitems = [
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },

  {
    id: uniqueId(),
    title: 'Assignments',
    icon: IconFile,
    href: '/assignments',
  },

  {
    id: uniqueId(),
    title: 'Quiz',
    icon: IconTextSpellcheck,
    href: '/quiz',
  },

  {
    id: uniqueId(),
    title: 'Announcements',
    icon: IconSpeakerphone,
    href: '/announcements',
  },

  {
    id: uniqueId(),
    title: 'Grades',
    icon: IconTable,
    href: '/grades',
  },

  // {
  //   id: uniqueId(),
  //   title: 'Students',
  //   icon: IconUser,
  //   href: '/students',
  // },
  {
    id: uniqueId(),
    title: 'Courses',
    icon: IconFileDescription,
    href: '/courses',
  },
];

export default Menuitems;
