export const guardRunTimeError = (typeGuard: () => boolean) => {
  try {
    return typeGuard();
  } catch (e) {
    return false;
  }
};
