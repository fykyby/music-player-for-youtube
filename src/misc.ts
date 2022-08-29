export function convertSeconds(seconds: number): string {
  let result = new Date(seconds * 1000).toISOString().substr(11, 8);
  if (result[0] === "0" && result[1] === "0") {
    result = result.slice(3, result.length);
  }
  return result;
}
