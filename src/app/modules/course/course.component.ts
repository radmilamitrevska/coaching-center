import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {courseStatus} from "../../data/courses-status";
import {Course} from "../../models/course/course";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html'
})
export class CourseComponent {
    @Output() editCourse: EventEmitter<Course> = new EventEmitter();
    @Input('course') course: Course;

    /**
     * Find status name from status id
     * @returns {string}
     */
    getStatus() {
        return courseStatus.find(status => status.id === this.course.status).name;
    }

    /**
     * Emit function for course edit
     */
    editCourseFunc() {
        this.editCourse.emit(this.course);
    }

}
