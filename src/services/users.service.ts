import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private username;

  // API keys
  apiKeys: any;
  clientId = 'a3b037c468909cdc00c5'; // TODO for hiding client id change to clientId: any;
  clientSecret: any = '40b1f3890764ef7553d2c87ae3a284231d0ab6a8';  // TODO for hiding client secret change to clientSecret: any;

  constructor(private http: HttpClient) {

    // Load API keys from env endpoint for hiding client and secret id
    /* TODO for hiding client id and client secret uncomment again
    this.http.get('/env')
      .subscribe(result => {
        this.apiKeys = result;
        this.clientId = this.apiKeys.CLIENT_ID;
        this.clientSecret = this.apiKeys.CLIENT_SECRET;
        console.log(this.apiKeys);
      });
      */
  }

  updateUsername(username: string) {
    this.username = username;
  }

  // Gets data from GitHub API of the respective user
  getUserData(): Observable<any> {
    return this.http.get('/githubapi/users'
      + '/'
      + this.username
      + '?client_id={'
      + this.clientId
      + '}?client_secret='
      + this.clientSecret);
  }

  // GET /users/:username/repos
  getUserReposData(): Observable<any> {
    return this.http.get('/githubapi/users'
      + '/'
      + this.username
      + '/repos?per_page=100'
      + '&client_id='
      + this.clientId
      + '&client_secret='
      + this.clientSecret);
  }

  // GET /repos/:owner/:repo/languages
  // E. g. https://api.github.com/repos/johannesstroebele91/Angular_KnowledgeBase/languages
  getUserRepoLanguagesData(repo: any): Observable<any> {
    return this.http.get('/githubapi/repos'
      + '/'
      + repo.owner.login
      + '/'
      + repo.name
      + '/languages');
  }
}
