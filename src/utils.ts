import { UserFragment } from "./types/graphql";

export function toTitleCase(input: string): string {
  return `${input.toUpperCase()[0]}${input.toLowerCase().slice(1)}`
}

export function convertSubmittedAt(submittedAt: string): string {
  const timeInMilliseconds = Date.now() - Number(submittedAt) 
  return convertTimeInMilliseconds(timeInMilliseconds)

}

export function convertTimeEstimate(timeEstimate: string): string {
  const timeInMilliseconds = Number(timeEstimate) 
  return convertTimeInMilliseconds(timeInMilliseconds)
}

function convertTimeInMilliseconds(timeInMilliseconds: number): string {
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365.25 * day;

  if (timeInMilliseconds === NaN) {
    return '0 sec'
  }
  if (timeInMilliseconds < hour) {
    return `${Math.floor(timeInMilliseconds / minute)} mins`;
  }
  if (timeInMilliseconds === hour) {
    return '1 hour';
  }
  if (timeInMilliseconds < day) {
    return `${Math.floor(timeInMilliseconds / hour)} hours`;
  }
  if (timeInMilliseconds < week) {
    return `${Math.floor(timeInMilliseconds / day)} days`;
  }
  if (timeInMilliseconds < month) {
    return `${Math.floor(timeInMilliseconds / week)} weeks`;
  }
  if (timeInMilliseconds < year) {
    return `${Math.floor(timeInMilliseconds / month)} months`;
  }
  return `${Math.floor(timeInMilliseconds / year)} years`;
}

export function convertUserToFullname(user: UserFragment) {
  return `${user.firstName} ${user.lastName}`;
}