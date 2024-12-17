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
  gym: Gym;
}

export function GymDetailsDialog({
  gym,
  isOpen,
  setIsOpen,
}: GymDetailsDialogProps) {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAddress() {
      try {
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
  }, [gym.latitude, gym.longitude]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes da academia</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center flex-col space-y-2">
          <div>
            {" "}
            <strong>Nome:</strong> {gym.name}
          </div>
          <div>
            <strong>Descrição:</strong> {gym.description}
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
                <Marker position={{ lat: gym.latitude, lng: gym.longitude }} />
              </Map>
            </div>
          </APIProvider>
          <div className="mt-6">
            <a
              href={`https://www.google.com/maps?q=${gym.latitude},${gym.longitude}`}
              target="_blank"
              className="mt-6 absolute text-primary"
            >
              Abrir no Maps
            </a>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" className="mt-6">
              Voltar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
