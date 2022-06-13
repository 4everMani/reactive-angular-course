import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { CourseService } from '../services/course.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(private readonly courseService: CourseService) {

  }

  ngOnInit() {
    this.reloadCourses();
  }

  public reloadCourses():void {
    const courses$ = this.courseService.loadAllCourses()
                      .pipe(
                        map(courses => courses.sort(sortCoursesBySeqNo))
                      )

    this.beginnerCourses$ = courses$
                            .pipe(
                              map(courses => courses.filter(course => course.category === 'BEGINNER'))
                              );
    
    this.advancedCourses$ = courses$
                              .pipe(
                                map(courses => courses.filter(course => course.category === 'ADVANCED'))
                                );
  }

  

}




