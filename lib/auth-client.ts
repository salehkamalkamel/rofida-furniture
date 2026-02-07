import { createAuthClient } from "better-auth/client";
import { adminClient, anonymousClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [adminClient(), anonymousClient()],
});
export const signInGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
  return data;
};
