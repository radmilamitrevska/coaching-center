import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../../models/course/course';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {courseStatus} from '../../data/courses-status';
import {AddLocationComponent} from './components/add-location/add-location-component';
import {MatDialog} from '@angular/material';
import {AddInstructorComponent} from './components/add-instructor/add-instructor-component';
import {Location} from '../../models/location/location';
import {LocationDialog} from '../../models/location/location-dialog';
import {InstructorDialog} from '../../models/instructor/instructor-dialog';
import {CourseService} from '../../services/course.service';
import {ProgressBar} from '../../models/progress-bar/progress-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html'
})
export class CourseFormComponent implements OnInit {
    @Output() closeForm: EventEmitter<any> = new EventEmitter();
    @Input('course') course: Course;
    @Input('edit') edit: boolean;
    /**
     * Arry for course status
     */
    public courses_status: Array<any> = courseStatus;

    /**
     * editorOptions
     */
    public editorOptions: Object = {
        charCounterCount: false,
        toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    };
    courseForm: FormGroup;
    submitForm = false;
    progressBar: ProgressBar = new ProgressBar;
    callServerLoader = false;
    constructor(
        public dialog: MatDialog,
        public courseService: CourseService
    ) {}

    /**
     * Oninit
     */
    ngOnInit() {
       this.prepareFormGroup();
    }

    /**
     * Close form with cancel button
     */
    closeFormFunc() {
        this.closeForm.emit();
    }

    /**
     * Prepare form group for adding Course
     */
    private prepareFormGroup() {
        this.courseForm = new FormGroup ({
            title: new FormControl(this.course.title, Validators.required),
            start_date: new FormControl(this.course.start_date, Validators.required),
            end_date: new FormControl(this.course.end_date, Validators.required),
            status: new FormControl(this.course.status),
            continuous: new FormControl(this.checkIfIsStringOrInteger(this.course.continuous)),
            contact: new FormControl(this.course.contact, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')),
            details: new FormControl(this.course.details),
            is_remote: new FormControl(this.checkIfIsStringOrInteger(this.course.is_remote)),
        });
    }


    /**
     * Check if value is string or integer and convert to integer
     * @param value
     * @returns {any}
     */
    private checkIfIsStringOrInteger(value) {
        if (typeof value === 'string') {
            return parseInt(value);
        }

        return value;
    }

    /**
     * Open dialog for Location
     * @param {Location} location
     * @param {boolean} edit
     * @param {number} key
     */
    openLocationDialog(location: Location = new Location(), edit: boolean = false, key: number = 0): void {
        const dialogRef = this.dialog.open(AddLocationComponent);
        dialogRef.componentInstance.data = new LocationDialog(location, edit, key);

        dialogRef.afterClosed().subscribe((result: LocationDialog) => {
            if (result) {
                this.addOrUpdateLocation(result);
            }
        });
    }

    /**
     * Add/Update location
     * @param {LocationDialog} result
     */
    private addOrUpdateLocation(result: LocationDialog): void {
        if (result.edit) {
            this.course.location[result.key] = result.location;
        } else {
            this.course.location.push(result.location);
        }
    }

    /**
     * Open dialog for instructor
     * @param {string} id
     * @param {boolean} edit
     * @param {number} key
     */
    openInstructorDialog(id: string = '', edit: boolean = false, key: number = 0): void {
        const dialogRef = this.dialog.open(AddInstructorComponent);
        dialogRef.componentInstance.data = new InstructorDialog(id, edit, key);
        dialogRef.afterClosed().subscribe((result: InstructorDialog) => {
            if (result) {
                this.addOrUpdateInstructor(result);
            }
        });
    }

    /**
     * Add/Edit instructor
     * @param {LocationDialog} result
     */
    private addOrUpdateInstructor(result: InstructorDialog): void {
        if (result.edit) {
            this.course.instructors[result.key] = result.id;
        } else {
            this.course.instructors.push(result.id);
        }
    }

    /**
     * Delete location
     * @param index
     */
    deleteLocation(index) {
        this.course.location.splice(index, 1);
    }

    /**
     * Edit location
     * @param data
     */
    editLocation(data) {
        this.openLocationDialog(data.location, true, data.index);
    }

    /**
     * Delete instruction
     * @param index
     */
    deleteInstructor(index) {
        this.course.instructors.splice(index, 1);
    }

    /**
     * Edit instruction
     * @param data
     */
    editInstructor(data) {
        this.openInstructorDialog(data.instructor, true, data.index);
    }

    /**
     * Submit form
     */
    async submitCourseForm() {
        this.submitForm = true;
        if (this.courseForm.valid) {
            this.callServerLoader = true;
            await this.prepareSubmitData();
            this.edit ? await this.courseService.updateCourse(this.course) : await this.courseService.createCourse(this.course);
            this.closeForm.emit(true);
            this.callServerLoader = false;
        }
    }
    /**
     * Prepare submit form,ading form values in object
     */
    async prepareSubmitData() {
        for (const variable in this.courseForm.value) {
            if (variable === 'start_date' || variable === 'end_date') {
                this.course[variable] = this.convertDate(this.courseForm.value[variable]);
            } else {
                this.course[variable] = this.courseForm.value[variable];
            }
        }
    }

    /**
     * Convert date format
     */
    private convertDate(value) {
        if (typeof value === 'string') {
            return value;
        }
        return value.getFullYear() + '-' + (value.getMonth() + 1) + '-' +  value.getDate();
    }
}
