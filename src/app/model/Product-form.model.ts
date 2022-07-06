export interface FormControlObject {
  key: string,
  type: string,
  option: Options
}

export interface Options {
  label?: string,
  placeholder?: string,
  required?: boolean,
  type?: string,
}


export interface ImageFile {
  target: {
    files: fileType[],
    result?: string;
  }

}

export interface fileType {
  type: string;
  size: number;
  lastModified?: number;
}

export interface FormType {
  default: {} | []
}
