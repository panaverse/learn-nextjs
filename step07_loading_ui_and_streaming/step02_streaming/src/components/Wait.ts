// Function created to intentionally increase the response time
export const wait = async (ms: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
};
