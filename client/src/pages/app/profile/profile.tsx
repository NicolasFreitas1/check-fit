import { getProfile, GetProfileResponse } from "@/api/get-profile";
import { listCheckIns } from "@/api/list-check-ins";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckIn } from "@/types/check-in";
import { useEffect, useState } from "react";
import { DeleteAccountButton } from "./delete-account-button";
import { EditAccountButton } from "./edit-account-button";
import { EditPasswordButton } from "./edit-password-button";
import { LastCheckIns } from "./last-check-ins";

export function Profile() {
  const [userProfile, setUserProfile] = useState<
    GetProfileResponse | undefined
  >(undefined);

  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);

  async function getUser() {
    const profile = await getProfile();
    setUserProfile(profile);
  }

  async function getCheckIns() {
    const checkIns = await listCheckIns({});
    setCheckIns(checkIns.checkIns);
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getCheckIns();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        {userProfile ? (
          <>
            <div className="grid h-full grid-cols-[1fr,2fr] gap-6 overflow-hidden">
              <div className="flex flex-col justify-center items-center space-y-2.5 border rounded-md p-6">
                <Avatar className="bg-secondary h-40 w-40 text-7xl">
                  <AvatarFallback>{userProfile?.user.name[0]}</AvatarFallback>
                </Avatar>

                <h2 className="text-2xl font-bold">{userProfile?.user.name}</h2>
                <h3 className="text-lg font text-muted-foreground">
                  {userProfile?.user.email}
                </h3>
                <h3 className="text-lg font text-muted-foreground">
                  Conta criada em:{" "}
                  {new Date(userProfile?.user.createdAt).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </h3>
                <div className="flex-col space-y-3 w-full">
                  <EditAccountButton user={userProfile.user} />
                  <EditPasswordButton userId={userProfile.user.id} />
                  <DeleteAccountButton />
                </div>
              </div>

              <LastCheckIns checkIns={checkIns} />
            </div>
          </>
        ) : (
          <h1>Perfil não encontrado</h1>
        )}
      </div>
    </>
  );
}
