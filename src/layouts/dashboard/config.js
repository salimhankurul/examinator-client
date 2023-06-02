import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    type: 'student',
    title: 'My Results',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    type: 'student',
    title: 'Join Exam',
    path: '/exam-session/list',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    type: 'student',
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    type: 'teacher',
    title: 'Create Exam',
    path: '/exam-create/create',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    type: 'teacher',
    title: 'Exam Results',
    path: '/exam-results/all',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  }
];

export const courses = [
  {
    id: 'COME125',
    name: 'Introduction to Computer Science',
  },
  {
    id: 'COME225',
    name: 'Data Structures and Algorithms',
  },
  {
    id: 'COME325',
    name: 'Database Systems',
  },
  {
    id: 'COME425',
    name: 'Software Engineering',
  },
  {
    id: 'COME525',
    name: 'Artificial Intelligence',
  },
  {
    id: 'COME625',
    name: 'Computer Networks',
  },
  {
    id: 'COME725',
    name: 'Computer Security',
  },
  {
    id: 'COME825',
    name: 'Distributed Systems',
  },
  {
    id: 'COME925',
    name: 'Cloud Computing',
  },
  {
    id: 'COME1025',
    name: 'Machine Learning',
  },
  {
    id: 'COME1125',
    name: 'Mobile Application Development',
  },
  {
    id: 'COME1225',
    name: 'Web Development',
  },
  {
    id: 'COME1325',
    name: 'Computer Graphics',
  },
  {
    id: 'COME1425',
    name: 'Human-Computer Interaction',
  },
  {
    id: 'COME1525',
    name: 'Natural Language Processing',
  },
]