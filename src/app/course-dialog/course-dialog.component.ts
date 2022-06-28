import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { CourseService } from '../services/course.service';
import { LoadingService } from '../loading/loading.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers: [
        LoadingService
      ]
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course:Course;

    constructor(
        private readonly loadingService: LoadingService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,
        private readonly courseService: CourseService) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngAfterViewInit() {

    }

    save() {

      const changes = this.form.value;
      const saveCourse$ = this.courseService.saveCourse(this.course.id, changes);
      this.loadingService.showLoaderUntilcompleted(saveCourse$)
      .subscribe((value)=>{
        this.dialogRef.close(value);
    })

                        
    }

    close() {
        this.dialogRef.close();
    }

}
