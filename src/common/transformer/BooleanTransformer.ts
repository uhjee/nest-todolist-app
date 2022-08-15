import { ValueTransformer } from 'typeorm';

export class BooleanTransformer implements ValueTransformer {
  // nest -> db
  to(value: boolean): number | null {
    // if (value === null || value === undefined) return null;
    return !value ? 0 : 1;
  }
  // db -> nest
  from(value: number | null): boolean {
    if (value === null) return null;
    return !value ? false : true;
  }
}
