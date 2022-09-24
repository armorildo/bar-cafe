import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { StandardDialogData } from '../models/standard-dialog-data';
@Injectable({
  providedIn: 'root',
})
export class DialogService {

  private dialogRef: MatDialogRef<any> | undefined;

  constructor(private dialog: MatDialog) {
  }

  openStandardDialog(data: StandardDialogData, component: any, minHeight?: string): MatDialogRef<any> {
    return this.dialog
      .open(component, {
        data,
        minWidth: "22rem",
        maxWidth: "98vw",
        minHeight: minHeight,
        maxHeight: "98vh",
        disableClose: true,
        autoFocus: false,
        // maxHeight: '80vh',
      });
  }

  getInstance() {
    return this.dialogRef?.componentInstance;
  }
}
