import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

export function fileTypeValidator(
  files: FileList,
  types: string[]
): ValidatorFn {
  return () => {
    const uploadedFile = files.item(0);
    if (types.includes(uploadedFile.type)) {
      return null;
    } else {
      console.log(uploadedFile.type);

      const error = { invalidFileType: 'invalid file type' };
      return error;
    }
  };
}

export function fileSizeValidator(files: FileList, allowedSize: number) {
  return () => {
    const fileSize = files.item(0).size;
    const fileSizeInMB = Math.round(fileSize / 1024 / 1024);
    if (fileSizeInMB > allowedSize) {
      return {
        invalidFileSize: 'invalid file size',
      };
    } else {
      return null;
    }
  };
}
