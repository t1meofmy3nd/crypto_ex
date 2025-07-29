/*
 * Minimal ambient module declarations for third‑party packages used by this
 * project. In the absence of the corresponding @types packages these
 * declarations allow TypeScript to compile without complaining about missing
 * type definitions. They simply define the modules as having an `any`
 * export type which disables type checking for their usage. If you later
 * install the official type declarations these can be removed.
 */

declare module 'express' {
  const value: any;
  export = value;
}
declare module 'cors' {
  const value: any;
  export = value;
}
declare module 'bcryptjs' {
  const value: any;
  export = value;
}
declare module 'jsonwebtoken' {
  const value: any;
  export = value;
}
declare module 'dotenv' {
  const value: any;
  export = value;
}

// Additional declarations for modules that are used elsewhere in this project
// but are not available or do not ship with their own type definitions in
// this environment. Declaring them as `any` silences TypeScript errors.
declare module 'helmet' {
  const value: any;
  export = value;
}
declare module 'morgan' {
  const value: any;
  export = value;
}
declare module 'cookie-parser' {
  const value: any;
  export = value;
}
declare module 'express-rate-limit' {
  const value: any;
  export = value;
}
declare module 'express-validator' {
  const value: any;
  export = value;
}
declare module 'supertest' {
  const value: any;
  export = value;
}

// Jest global functions used in tests. Declaring them avoids TS2582
// errors when compiling the test files with ts-jest.
declare const describe: any;
declare const it: any;
declare const expect: any;