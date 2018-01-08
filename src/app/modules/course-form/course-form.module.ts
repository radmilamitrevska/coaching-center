import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseFormComponent} from './course-form.component';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {MaterialModule} from '../angular-materials/angular-materials';
import {ReactiveFormsModule} from '@angular/forms';
import {SingleLocationComponent} from './components/single-location/single-location.component';
import {AddLocationComponent} from './components/add-location/add-location-component';
import {AddInstructorComponent} from './components/add-instructor/add-instructor-component';
import {InstructorComponent} from './components/instructor/instructor.component';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        MaterialModule,
        PerfectScrollbarModule
    ],
    declarations: [
        CourseFormComponent,
        SingleLocationComponent,
        AddLocationComponent,
        AddInstructorComponent,
        InstructorComponent
    ],
    exports: [
        CourseFormComponent
    ],
    entryComponents: [
        AddLocationComponent,
        AddInstructorComponent
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class CourseFormModule { }
