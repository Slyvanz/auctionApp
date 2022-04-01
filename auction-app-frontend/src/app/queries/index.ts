import {gql} from 'apollo-angular';

//çalışan otomatik ekleme kodu
        // mutation {
        //     createUser(data: { username: "mert", password: "123" }) {
        //       token
        //        }
        // }

//Kullanıcı eklemek için oluşturulan graphqle yollanan mutation kodu
//token dönmesinin sebebi authentication kısmında kullanmak için
export const CREATE_USER = gql`mutation ($username: String!, $password: String!) {
  createUser(data: {username: $username, password: $password}) {
    token
  }
}`;
//Kullanıcı giriş yaptığı zamanlar için oluşturulan graphqle yollanan mutation kodu
export const SIGNIN_USER = gql`mutation ($username: String!, $password: String!) {
  signIn(data: {username: $username, password: $password}) {
    token
  }
}`;

export const GET_ACTIVE_USER = gql`
    query{
      activeUser{
        username
      }
    }
`;
