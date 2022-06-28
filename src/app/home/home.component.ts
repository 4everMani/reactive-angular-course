import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { CourseService } from '../services/course.service';
import { LoadingService } from '../loading/loading.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(private readonly courseService: CourseService,
              private readonly loadingService: LoadingService) {

  }

  ngOnInit() {
    this.reloadCourses();
  }

  public reloadCourses():void {
    const courses$ = this.courseService.loadAllCourses()
                      .pipe(
                        map(courses => courses.sort(sortCoursesBySeqNo))
                      );
                    
    const loadCourses$ = this.loadingService.showLoaderUntilcompleted(courses$);                

    this.beginnerCourses$ = loadCourses$
                            .pipe(
                              map(courses => courses.filter(course => course.category === 'BEGINNER'))
                              );
    
    this.advancedCourses$ = loadCourses$
                              .pipe(
                                map(courses => courses.filter(course => course.category === 'ADVANCED'))
                                );
  }

  

}




