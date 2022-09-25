import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) {
  }

  // Creates a snackbar with the provided message, duration and label action for the snackbar
  showSnackbar(message: string, duration: number = 2500, action?: string) {
    this.snackbar.open(message, action, {
      duration: duration
    })
  }
}
