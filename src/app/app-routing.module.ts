import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterGuardService } from './services/core/router-guard.service';

// Layout component
// import { BackstageTopbannerComponent as BackstageLayoutComponent} from './layouts/backstage-topbanner/backstage-topbanner.component';
import { BackstageDefaultComponent as BackstageLayoutComponent } from './layouts/backstage-default/backstage-default.component';

const routes: Routes = [
  {
    path: 'frontstage',
    loadChildren: () =>
      import('./pages/frontstage/frontstage.module').then(
        (m) => m.FrontStageModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./pages/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: '',
    component: BackstageLayoutComponent,
    canActivate: [RouterGuardService],
    children: [
      { path: '', redirectTo: 'home/dashboard', pathMatch: 'full' },

      {
        path: 'home',
        loadChildren: () =>
          import('./pages/backstage/home/home.module').then((m) => m.HomeModule)
      },

      {
        path: 'examples',
        loadChildren: () =>
          import('./pages/backstage/examples/examples.module').then(
            (m) => m.ExamplesModule
          ),
      },
      // {
      //   path: 'system',
      //   loadChildren: () =>
      //     import('./pages/backstage/system/system.module').then(
      //       (m) => m.SystemModule
      //     ),
      // },
      {
        path: 'subscribers',
        loadChildren: () =>
          import('./pages/backstage/subscribers/subscribers.module').then(
            (m) => m.SubscribersModule
          ),
      },

      {
        path: 'email',
        loadChildren: () =>
          import('./pages/backstage/email/email.module').then((m) => m.EmailModule)
      },

      {
        path: 'workflows',
        loadChildren: () =>
          import('./pages/backstage/workflows/workflows.module').then((m) => m.WorkflowsModule)
      },

      // Settings (1 module cha, 1 component hoặc nhiều component con)
      {
        path: 'settings',
        loadChildren: () =>
          import('./pages/backstage/settings/settings.module').then((m) => m.SettingsModule)
      },

      {
        path: 'exception',
        loadChildren: () =>
          import('./pages/commons/exception/exception.module').then(
            (m) => m.ExceptionModule
          ),
      },
    ],
  },
  // Fallback route for undefined paths
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
