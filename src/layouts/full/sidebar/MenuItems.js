import {
  IconLayoutDashboard,
  IconClipboard,
  IconTextSpellcheck,
  IconSpeakerphone,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

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
    icon: IconClipboard,
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
    href: '/announcement',
  },

  {
    id: uniqueId(),
    title: 'Grades',
    icon: IconSpeakerphone,
    href: '/grades',
  },
];

export default Menuitems;
