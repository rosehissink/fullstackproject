import Landing from './Landing/Landing';
import Dashboard from './Dashboard/Dashboard';
import EventCreate from './EventCreate/EventCreate';
import EventDetail from './Events/EventDetail';
import EventDetails from './EventDetails/EventDetails';
import SquadCreate from '../Forms/SquadForm/SquadCreate';

const routes = [
  {
    name: 'Landing',
    component: Landing,
    menu: false,
    path: '/',
    exact: true
  },
  {
    name: 'Dashboard',
    component: Dashboard,
    menu: true,
    path: '/dashboard',
    exact: true
  },
  {
    name: 'New Event',
    component: EventCreate,
    menu: false,
    path: '/events/new',
    exact: false
  },
  {
    name: 'Event Response',
    component: EventDetail,
    menu: false,
    path: '/events/response',
    exact: false
  },
  {
    name: 'Event Details',
    component: EventDetails,
    menu: false,
    path: '/events/details',
    exact: false
  },
  {
    name: 'New Squad',
    component: SquadCreate,
    menu: false,
    path: '/squads/new',
    exact: false
  }
];

export default routes;
