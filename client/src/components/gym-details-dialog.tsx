import { getGym } from "@/api/get-gym";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { env } from "@/env";
import { Gym } from "@/types/gym";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = env.VITE_GOOGLE_MAPS_API_KEY;

interface GymDetailsDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  gymId: string;
}

export function GymDetailsDialog({
  gymId,
  isOpen,
  setIsOpen,
}: GymDetailsDialogProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [gym, setGym] = useState<Gym | null>(null);

  useEffect(() => {
    fetchGym(gymId);
  }, [gymId]);

  useEffect(() => {
    async function fetchAddress() {
      try {
        if (!gym?.latitude || !gym?.longitude) {
          return;
        }

        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${gym.latitude},${gym.longitude}&key=${API_KEY}`
        );

        const data = response.data;

        if (data.results.length > 0) {
          setAddress(data.results[0].formatted_address);
        } else {
          setAddress("Endereço não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
        setAddress("Erro ao buscar endereço");
      }
    }

    fetchAddress();
  }, [gym?.latitude, gym?.longitude]);

  async function fetchGym(gymId: string) {
    const gym = await getGym({ gymId });

    setGym(gym);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      {gym ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da academia</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center flex-col space-y-2">
            <div>
              {" "}
              <strong>Nome:</strong>{" "}
              <p className="max-w-[400px] break-words">{gym.name}</p>
            </div>
            <div>
              <strong>Descrição:</strong>{" "}
              <p className="max-w-[400px] break-words">{gym.name}</p>
            </div>
            <div>
              <strong>Telefone: </strong>
              {gym.phone}
            </div>
            <APIProvider apiKey={API_KEY}>
              <div className="w-full h-[250px]">
                <strong>Localização: </strong>
                {address}
                <Map
                  mapId={"bf51a910020fa25a"}
                  defaultZoom={5}
                  defaultCenter={{ lat: gym.latitude, lng: gym.longitude }}
                  gestureHandling={"greedy"}
                  disableDefaultUI
                >
                  <Marker
                    position={{ lat: gym.latitude, lng: gym.longitude }}
                  />
                </Map>
              </div>
            </APIProvider>
          </div>
          <DialogFooter>
            <div className="flex items-end justify-center gap-3 mt-20">
              <Button asChild variant="link">
                <a
                  href={`https://www.google.com/maps?q=${gym.latitude},${gym.longitude}`}
                  target="_blank"
                  className="text-primary"
                >
                  Abrir no Maps
                </a>
              </Button>
              <DialogClose asChild>
                <Button variant="secondary" className="relative">
                  Voltar
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Academia não encontrada</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" className="mt-6">
                Voltar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
