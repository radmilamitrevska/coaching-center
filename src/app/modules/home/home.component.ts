import { Component, OnInit } from '@angular/core';
import {Course} from '../../models/course/course';
import {CourseService} from '../../services/course.service';
import {environment} from '../../../environments/environment';
import {ProgressBar} from '../../models/progress-bar/progress-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    private getCoursesUrl: string = `${environment.apiUrl}/courses`;
    public courseListingVisible = true;
    public httpResponse;
    public courses: Array<Course> = [];
    public loading = true;
    public course: Course;
    public edit = false;
    progressBar: ProgressBar = new ProgressBar;

    constructor(
        public courseService: CourseService
    ) {}

    /**
     * Oninit function
     */
    ngOnInit(): void {
        this.getCourses();
    }

    /**
     * Get all courses
     * @returns {Promise<void>}
     */
    async getCourses(url = this.getCoursesUrl) {
        this.httpResponse = await this.courseService.getCourses(url);
        this.courses = this.httpResponse.data;
        this.loading = false;
    }

    /**
     * Show Course Form
     */
    showCourseForm(course: Course = new Course, edit: boolean = false) {
        this.course = course;
        this.edit = edit;
        this.courseListingVisible = false;
    }

    /**
     * Hide Course Form
     */
    hideCourseForm(reload = false) {
        this.courseListingVisible = true;
        if (reload) {
            this.loading = true;
            this.getCourses();
        }
    }

    /**
     * Pagination get page
     * @param {number} event
     * @returns {Promise<void>}
     */
    async getPage(event: number) {
        this.loading = true;
        const url = `${environment.apiUrl}/courses?page=${event}`;
        await this.getCourses(url);
    }
}
