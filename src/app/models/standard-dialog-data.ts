export interface StandardDialogData<T = any> {
  titleCaption: string;
  /** Data to pass to dialog */
  body?: T;
  confirmCaption?: string;
  cancelCaption?: string;
}
