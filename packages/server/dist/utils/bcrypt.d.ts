export declare const matchPassword: (enteredPassword: string, storedPassword: string) => Promise<boolean>;
export declare const hashPassword: (password: string) => Promise<string>;
