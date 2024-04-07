import { IncludeProjector } from "./IncludeProjector";

export interface Projection {
  includes?: Array<string>;
  excludes?: Array<string>;
  rename?: { [key: string]: string };
};

export class Projector {
  apply(obj: any, projection: Projection) {
    let result = obj;
    if (projection.includes) {
      result = new IncludeProjector(obj, projection.includes).apply();
    } else if (projection.excludes) {
      // not implemented 
      result = result;
    }

    if (projection.rename) {
      // not implemented
      result = result;
    }

    return result;
  }
}
