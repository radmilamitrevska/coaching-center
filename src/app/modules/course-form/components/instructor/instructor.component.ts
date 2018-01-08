import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {instructors} from '../../../../data/instructors';
import {InstructorDialog} from "../../../../models/instructor/instructor-dialog";

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html'
})
export class InstructorComponent implements OnInit {
  instructorObject;
    @Input('instructor') instructor: number;
    @Input('index') index: number;
    @Output() deleteInstructor = new EventEmitter();
    @Output() editInstructor = new EventEmitter();

    /**
     * Oninit
     */
    ngOnInit() {
        this.instructorObject = instructors.find(value => value.id === this.instructor);
    }

    /**
     * Emmiter for delete instructor
     */
    deleteInstructorFunc() {
        this.deleteInstructor.emit(this.index);
    }

    /**
     * Emmiter for edit instructor
     */
    editInstructorFunc() {
        this.editInstructor.emit({
            instructor: this.instructor,
            index: this.index
        });
    }
}
