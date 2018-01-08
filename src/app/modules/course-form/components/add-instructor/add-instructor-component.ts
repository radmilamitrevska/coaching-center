import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {instructors} from "../../../../data/instructors";
import {Instructor} from "../../../../models/instructor/instructor";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InstructorDialog} from "../../../../models/instructor/instructor-dialog";

@Component({
    selector: 'app-add-instructor',
    templateUrl: 'add-instructor.component.html',
})
export class AddInstructorComponent implements OnInit{
    /**
     *
     * Arry for instructors
     */
    public instructors: Array<any> = instructors;
    submitForm = false;
    instructorForm: FormGroup;
    constructor(public dialogRef: MatDialogRef<AddInstructorComponent>,
                @Inject(MAT_DIALOG_DATA) public data: InstructorDialog) {
    }

    /**
     * Oninit
     */
    ngOnInit() {
        this.prepareFormGroup();
    }

    /**
     * Close dialog
     */
    closeDialog(): void {
        this.dialogRef.close();
    }

    /**
     * Prepare form group for adding new Instructor
     */
    private prepareFormGroup() {
        this.instructorForm = new FormGroup ({
            id: new FormControl(this.data.id, Validators.required),
        });
    }

    /**
     * Add instructior
     */
    addInstructorFunc() {
        this.submitForm = true;
        if (this.instructorForm.valid) {
            this.dialogRef.close(new InstructorDialog(this.instructorForm.value.id, this.data.edit, this.data.key));
        }
    }

}
