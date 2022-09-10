import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

interface IuseUser {
  isPublic: boolean;
}

export default function useUser({ isPublic = false }: IuseUser) {
  const { data, error } = useSWR<ProfileResponse>("/api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok && !isPublic) {
      router.replace("/enter");
    }
  }, [data, router, isPublic]);
  return { user: data?.profile, isLoading: !data && !error };
}
