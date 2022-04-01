import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

//Apollo GraphQL
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {ApolloLink, InMemoryCache} from '@apollo/client/core';
//Apollo
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, HttpHeaders} from "@angular/common/http";
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {UserPanelComponent} from './components/user-panel/user-panel.component';
import {AuctionDetailComponent} from './components/auctions/auction-detail/auction-detail.component';
import {AuctionsComponent} from './components/auctions/auctions.component';
import {AuctionAddComponent} from './components/user-panel/auction-add/auction-add.component';
import {AuctionListComponent} from './components/user-panel/auction-list/auction-list.component';
import {RegisterComponent} from './components/register/register.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {HeaderComponent} from './components/header/header.component';
import {AuthService} from "./services/auth.service";
import { DenemeComponent } from './deneme/deneme.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserPanelComponent,
    AuctionDetailComponent,
    AuctionsComponent,
    AuctionAddComponent,
    AuctionListComponent,
    RegisterComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    DenemeComponent,
  ],
  imports: [
    ApolloModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    {
      //Apollo
      provide: APOLLO_OPTIONS,
      // useFactory: (httpLink: HttpLink) => {
      //   return {
      //     cache: new InMemoryCache(),
      //     link: httpLink.create({
      //       uri: 'http://localhost:4001/graphql',
      //     }),
      //     //authentication için
      //     fetchOptions: {
      //       //token ise include çerez ise same-origin kullanıyoruz
      //       credentials: 'include'
      //     },
      //     request: operation => {
      //       operation.setContext({
      //         headers: {
      //           authorization: localStorage.getItem('token')
      //         }
      //       })
      //     }
      //   };
      // },
      useFactory(httpLink: HttpLink) {
        const http = httpLink.create({uri: 'http://localhost:4001/graphql'});
        const middleware = new ApolloLink((operation, forward) => {
          operation.setContext({
            headers: new HttpHeaders().set(
              'Authorization',
              `${localStorage.getItem('token') || null}`,
            ),
          });
          return forward(operation);
        });

        const link = middleware.concat(http);

        return {
          link,
          cache: new InMemoryCache(),
          defaultOptions: {
            mutate: {
              fetchPolicy: 'no-cache',
              errorPolicy: 'all'
            },
            watchQuery: {
              fetchPolicy: 'network-only',
              errorPolicy: 'all'
            },
            query: {
              fetchPolicy: 'network-only',
              errorPolicy: 'all'
            }
          }
        };
      },
      deps: [HttpLink],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
