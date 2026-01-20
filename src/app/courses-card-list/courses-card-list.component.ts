import {Component, effect, ElementRef, inject, input, output, viewChildren} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Course} from "../models/course.model";
import {MatDialog} from "@angular/material/dialog";
import {openEditCourseDialog} from "../edit-course-dialog/edit-course-dialog.component";
@Component({
    selector: 'courses-card-list',
    imports: [
        RouterLink
    ],
    templateUrl: './courses-card-list.component.html',
    styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {
  dialog = inject(MatDialog);

  courses = input.required<Course[]>();
  courseUpdate = output<Course>()
  courseDeleted = output<string>();

  courseCards = viewChildren<ElementRef>('courseCard')

  constructor(){
    effect(()=>{
      console.log('courseCards', this.courseCards);
    })
  }

  async onEditCourse(course:Course  ){

    const newCourse = await openEditCourseDialog(
      this.dialog,{
        mode:'update',
        title:'Update',
        course
      }
    )
    if(!newCourse){
      return;
    }
      this.courseUpdate.emit(newCourse);
  }


  onCourseDeleted(course:any){
     this.courseDeleted.emit(course.id);
  }
}
