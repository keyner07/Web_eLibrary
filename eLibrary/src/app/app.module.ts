import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NavComponent } from "./nav/nav.component";
import { ELibraryComponent } from "./e-library/e-library.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "Signin", component: LoginComponent },
  { path: "eLibrary", component: ELibraryComponent },
  { path: "**", redirectTo: "Home", pathMatch: "full" },
  { path: "Home", component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    ELibraryComponent
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
