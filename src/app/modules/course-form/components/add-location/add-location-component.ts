import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocationDialog} from '../../../../models/location/location-dialog';

@Component({
    selector: 'app-add-location',
    templateUrl: 'add-location.component.html',
})
export class AddLocationComponent implements OnInit  {
    submitForm = false;
    locationForm: FormGroup;
    @Output() addLocation = new EventEmitter();
    constructor(public dialogRef: MatDialogRef<AddLocationComponent>,
                @Inject(MAT_DIALOG_DATA) public data: LocationDialog) {
    }

    /**
     * Oniti
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
     * Emmiter for add location
     */
    addLocationFunc() {
        this.submitForm = true;
        if (this.locationForm.valid) {
            this.dialogRef.close(new LocationDialog(this.locationForm.value, this.data.edit, this.data.key));
        }
    }

    /**
     * Prepare form group for adding new Location
     */
    private prepareFormGroup() {
        this.locationForm = new FormGroup ({
            title: new FormControl(this.data.location.title, Validators.required),
            address: new FormControl(this.data.location.address, Validators.required),
            city: new FormControl(this.data.location.city, Validators.required),
        });
    }
}
