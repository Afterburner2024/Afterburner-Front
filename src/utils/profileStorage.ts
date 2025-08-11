import { User, ProfileEditForm } from "@/types/user";

const KEY_PREFIX = "ab_profile_override_";

export function saveProfileOverride(userId: number, form: ProfileEditForm) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_PREFIX + userId, JSON.stringify(form));
}

export function loadProfileOverride(userId: number): ProfileEditForm | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY_PREFIX + userId);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ProfileEditForm;
  } catch {
    return null;
  }
}

export function mergeUserWithOverride(user: User): User {
  if (typeof window === "undefined") return user;
  const ov = loadProfileOverride(user.userId);
  if (!ov) return user;
  return {
    ...user,
    userName: ov.userName ?? user.userName,
    bio: ov.bio ?? user.bio,
    company: ov.company ?? user.company,
    location: ov.location ?? user.location,
    blogUrl: ov.blogUrl ?? user.blogUrl,
    githubUsername: user.githubUsername, // 유지
    userTechStacks: ov.userTechStacks?.length
      ? ov.userTechStacks
      : user.userTechStacks,
    isPublic: ov.isPublic ?? user.isPublic,
    showEmail: ov.showEmail ?? user.showEmail,
    showPhone: ov.showPhone ?? user.showPhone,
  };
}
