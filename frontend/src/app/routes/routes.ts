import { NavComponent } from '../nav/nav.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';

export const routes = [

  {
    path: '',
    component: NavComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'bookings',
        loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsModule),
      }
    ]
  },

  // Not lazy-loaded routes
  {
    path: 'login',
    component: LoginComponent
  },
  // Not found
  { path: '**', redirectTo: 'notfound' }

];
