import { DataTable } from "@/components/ui/data-table";
import { gymColumns } from "./gym-columns";
import { useEffect, useState } from "react";
import { Gym } from "@/types/gym";
import { listGyms } from "@/api/list-gyms";

export function Gyms() {
  const [gyms, setGyms] = useState<Gym[]>([]);

  async function fetchGyms() {
    const gymsResponse = await listGyms({});

    setGyms(gymsResponse.gyms);
  }

  useEffect(() => {
    fetchGyms();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Academias</h1>
        <DataTable columns={gymColumns} data={gyms} />
      </div>
    </>
  );
}
