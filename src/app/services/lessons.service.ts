import {inject, Injectable} from "@angular/core";
import {Lesson} from "../models/lesson.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {GetLessonsResponse} from "../models/get-lessons.response";
import {environment} from "../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  env = environment;
  http = inject(HttpClient);


  async loadLessons(config:{courseId?:string,query?:string}){
    const {courseId,query} = config;

    let param = new HttpParams();
    if(courseId){
      param = param.set('courseId',courseId);
    }
    if(query){
      param = param.set('query',query);
    }
    const lessons$ = this.http.get<GetLessonsResponse>(`${this.env.apiRoot}/search-lessons`)
    const response = await firstValueFrom(lessons$)
    return  response.lessons;

  }
}
