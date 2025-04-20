export const Role = {
  creator: "creator",
  developer: "developer",
  sponsor: "sponsor",
  admin: "admin",
  user: "user",
} as const;

export type RoleKeyType = keyof typeof Role;

export const roleArray: RoleKeyType[] = Object.values(Role);
