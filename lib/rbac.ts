// lib/rbac.ts
export const Roles = {
  ADMIN: "admin",
  USER: "user",
  EDITOR: "editor",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export const RolePermissions = {
  admin: ["dashboard", "users", "settings"],
  editor: ["dashboard", "posts"],
  user: ["dashboard"],
};
