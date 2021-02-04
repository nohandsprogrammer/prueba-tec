import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material';
import { GithubService } from './github.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent implements OnInit {

  urlGithub:string;
  issues:object[] = [];
  pagination:number = 1;
  haveData:boolean = false;
  columnsTitles: string[] = ["creacion", "estado", "numero", "titulo", "url"];
  pageEvent: PageEvent;
  index:number = 0;


  constructor(private githubService:GithubService) { }

  ngOnInit() { }

  onSubmit(){
    if(this.urlGithub !== undefined && this.urlGithub !== ""){

      if(this.urlGithub.startsWith("https://github.com/") || 
         this.urlGithub.startsWith("http://github.com/") || 
         this.urlGithub.startsWith("github.com/")){

        this.githubService.getGithubIssues(this.urlGithub).subscribe((data:any) => {

          this.issues.push(data);

          if(data !== [] && !data["message"]){
            
            let numberOfIssues = data[0]["number"];
            
            if(numberOfIssues > 100){

              let issuesAndPulls = Math.round(data[0]["number"]/100.0);

              for(let i = 1; i < issuesAndPulls; i++){
                this.githubService.getGithubIssuesPaginated(this.urlGithub, i + 1).subscribe((resFor:any) => {
                  this.issues.push(resFor);
                })
              }

              //Dificultades técnicas (async/await function)
              setTimeout(() =>{
                this.haveData = true;
                this.issues = this.getOnlyIssues(data);
                
                this.pagination = issuesAndPulls;
                let pages = Math.round(this.issues.length/100.0);

                if(pages == 0){
                  this.pagination = 1;
                } else {
                  this.pagination = pages;
                }

              }, 3000);

            } else {
              this.haveData = true;
              this.issues = this.getOnlyIssues(data);
            }

          } else {
            alert("No se han encontrado issues");
          }
        }), error => alert(`Error ${error}`);

      } else {
        alert("Esta no es una url de Github válida. Asegúrese que la ha escrito correctamente!");
      }

    } else{
      alert("No deje la url vacía!");
    }
  }

  getOnlyIssues(everyIssue){
    return everyIssue.filter(issue => !issue['pull_request']);
  }

  getNewPage(event?:PageEvent){
    //Check events / > index++, < index--;
  }

  /*** Rxjs para controlar el state de la app ***/
  //Reducer para este componente
  //Comprobar el estado de la app con las request
  //Crear cache en la store (2-3 días de renovación)
}
