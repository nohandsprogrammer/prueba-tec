import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { HomeComponent } from './pages/home/home.component';
import { GithubComponent } from './pages/github/github.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'github', component: GithubComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }