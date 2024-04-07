export class IncludeProjector {
  private obj: any;
  private fields: Set<string>;
  constructor(obj: any, fields: Array<string>) {
    this.obj = obj;
    this.fields = new Set(fields);
  }

  apply() {
    if ( this.fields == null || this.fields.size == 0) {
        return {};
    }
    else {
        return this.applyOnObject(this.obj, "");
    }
  }
  
  private applyOnObject(obj: any, parent: string) {
    let projectedObj: any = {};
    for (let [key, value] of Object.entries(obj)) {
      if (this.isPathMatched(parent + "." + key)) {
        projectedObj[key] = value;
      } else if (this.isObject(value)) {
        const projectedValue = this.applyOnObject(value, parent + "." + key)
        if (Object.keys(projectedValue).length > 0) {
          projectedObj[key] = projectedValue;
        }
      }
    }
    return projectedObj;
  }

  private isPathMatched(key: string) {
    return this.fields.has(key);
  }

  private isObject(value: any) {
    //ref: https://blog.sarojkdb.com/javascript-isObject/
    return typeof value === 'object' && value !== null && ! Array.isArray(value)
  }
}
