import {
  IconLayoutDashboard,
  IconClipboard,
  IconTextSpellcheck,
  IconSpeakerphone,
  IconTable,
  IconUser,
  IconFileDescription,
  IconFile,
  IconUserPlus,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const userDetails = JSON.parse(localStorage.getItem('userDetails'));

const { userTypeCode = null } = userDetails;

let MenuItems = [];

if (userTypeCode === 'ADMIN') {
  MenuItems = [
    {
      id: uniqueId(),
      title: 'Courses',
      icon: IconFileDescription,
      href: '/courses',
    },
    {
      id: uniqueId(),
      title: 'Create User',
      icon: IconUserPlus,
      href: '/create-user',
    },
  ];
}

if (userTypeCode === 'FACULTY') {
  MenuItems = [
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
      title: 'Announcements',
      icon: IconSpeakerphone,
      href: '/announcements',
    },

    {
      id: uniqueId(),
      title: 'Quiz',
      icon: IconTextSpellcheck,
      href: '/quiz',
    },
  ];
}

if (userTypeCode === 'STUDENT') {
  MenuItems = [
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

    {
      id: uniqueId(),
      title: 'Courses',
      icon: IconFileDescription,
      href: '/courses',
    },
  ];
}

export default MenuItems;
