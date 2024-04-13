export const groupAthlete = (date: string) => {
  const dob = new Date(date);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();

  let group = "";
  if (age >= 18) {
    group = "Senior A";
  } else if (age >= 16) {
    group = "Junior B";
  } else if (age >= 14) {
    group = "Junior C";
  } else if (age >= 12) {
    group = "Junior D";
  } else if (age >= 10) {
    group = "Junior E";
  } else {
    group = "Junior F";
  }

  return group;
};
