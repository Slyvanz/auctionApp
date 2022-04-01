import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm} from "@angular/forms";
import {Apollo, gql} from 'apollo-angular';
import {CREATE_USER} from '../../queries'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm | undefined;

  users: any[] | undefined;


  constructor(private apollo: Apollo) {}

  ngOnInit() {

    //this one is for getting movies data
    this.apollo
    .watchQuery({
      query: gql`
        query
        {users{username}}
      `,
    })
    .valueChanges.subscribe((result: any) => {
      this.users = result?.data?.users;
    });
  }

  onSubmit(){
    // this one is for adding new movie to movies
    this.apollo
    .mutate({
      mutation: CREATE_USER,
      variables: {
        username: this.signupForm?.value.username,
        password: this.signupForm?.value.password,
      }
    })
    .subscribe();

    // console.log(this.users);

    this.signupForm?.reset();

  }



}
