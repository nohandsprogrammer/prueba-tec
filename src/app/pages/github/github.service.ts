import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }
  
  getGithubIssues(url:string) {

    let newUrl = new URL(url).pathname;
    let issuesUrl = `https://api.github.com/repos${newUrl}/issues?state=all&per_page=100`;
    return this.http.get(issuesUrl);
  }

  getGithubIssuesPaginated(url:string, page:number) {

    let newUrl = new URL(url).pathname;
    let issuesUrl = `https://api.github.com/repos${newUrl}/issues?state=all&per_page=100&page=${page}`;
    return this.http.get(issuesUrl);
  }
}