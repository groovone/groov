export const isBrowser = (): boolean => typeof window !== 'undefined';

export const isGlobalPresent = (name: string): boolean => {
  // Calling eval by another name causes eval'ed code to run in a
  // subscope of the global scope, rather than the local scope.
  // eslint-disable-next-line no-eval
  const globalEval = eval;
  try {
    globalEval(name);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Convert JSON schema to AjvSchema
 * for faster validations
 */
export const jsonToAjvSchema = (jsonSchema: any): any => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { version, primaryKey, ...ajvSchema } = jsonSchema;
  return ajvSchema;
};

/**
 * returns positive hash value for a string. copied code
 * @param str string to be hashed
 */
export function hash(str: string): number {
  let hsh = 5381;
  let i = str.length;

  while (i) {
    hsh = (hsh * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hsh >>> 0;
}
