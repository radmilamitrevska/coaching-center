import { NgModule } from '@angular/core';
import {
    MatCheckboxModule, MatInputModule, MatFormFieldModule,
    MatDatepickerModule, MatSelectModule, MatNativeDateModule, MatDialog, MatDialogModule, MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
    imports: [
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatNativeDateModule,
        MatDialogModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatNativeDateModule,
        MatDialogModule,
        MatProgressSpinnerModule
    ],
})
export class MaterialModule {}
