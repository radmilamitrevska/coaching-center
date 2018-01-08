import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {CourseModule} from '../course/course.module';
import {CourseFormModule} from '../course-form/course-form.module';
import {CourseService} from "../../services/course.service";
import {NgxPaginationModule} from 'ngx-pagination';
import {MaterialModule} from "../angular-materials/angular-materials";

@NgModule({
    imports: [
        CommonModule,
        NgxPaginationModule,
        MaterialModule,
        CourseModule,
        CourseFormModule
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ],
    providers: [
        CourseService
    ]
})
export class HomeModule { }
