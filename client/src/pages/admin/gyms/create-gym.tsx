import { createGym } from "@/api/create-gym";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useEffect, useState } from "react";
import { env } from "@/env";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

const createGymForm = z.object({
  description: z
    .string()
    .min(1, { message: "Preencha este campo para continuar." }),
  latitude: z.number({ message: "Selecione uma localização no mapa." }),
  longitude: z.number({ message: "Selecione uma localização no mapa." }),
  name: z.string().min(1, { message: "Preencha este campo para continuar." }),
  phone: z
    .string()
    .min(1, { message: "Preencha este campo para continuar." })
    .max(15, { message: "Esse campo deve conter no máximo 15 caracteres." })
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: "Formato inválido." }),
});

type CreateGymFormType = z.infer<typeof createGymForm>;

const API_KEY = env.VITE_GOOGLE_MAPS_API_KEY;

export function CreateGym() {
  const navigate = useNavigate();

  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: -28.68332608257886,
    lng: -49.33321185232825,
  });

  const form = useForm<CreateGymFormType>({
    resolver: zodResolver(createGymForm),
    defaultValues: {
      name: "",
      description: "",
      latitude: 0,
      longitude: 0,
      phone: "",
    },
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          toast.error("Não foi possível obter sua localização atual.");
        }
      );
    }
  }, []);

  async function onSubmit(data: CreateGymFormType) {
    try {
      await createGym(data);
      toast.success("Academia criada com sucesso!");
      form.reset();
      navigate("/admin/gyms", { replace: true });
    } catch (error) {
      console.log(error);

      toast.error("Erro ao criar a academia!");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[350px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            Cadastro de academia
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2 w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Digite a descrição..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <InputMask
                        mask="(99) 99999-9999"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      >
                        {(inputProps) => (
                          <Input
                            {...inputProps}
                            placeholder="(48) 99999-9999"
                            id="phone"
                          />
                        )}
                      </InputMask>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4">
                <FormLabel>Localização</FormLabel>
                <APIProvider apiKey={API_KEY}>
                  <Map
                    defaultZoom={15}
                    defaultCenter={mapCenter}
                    className="w-full h-[300px] mt-2"
                    disableDefaultUI
                    onClick={(e) => {
                      const { detail } = e;
                      const lat = detail.latLng?.lat;
                      const lng = detail.latLng?.lng;
                      if (lat && lng) {
                        setMarkerPosition({ lat, lng });
                        form.setValue("latitude", lat);
                        form.setValue("longitude", lng);
                      }
                    }}
                  >
                    {markerPosition && <Marker position={markerPosition} />}
                  </Map>
                </APIProvider>
                <FormMessage />
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <Button
                type="reset"
                variant="secondary"
                onClick={() => {
                  form.reset();
                  navigate("/admin/gyms", { replace: true });
                }}
                className="font-bold"
              >
                Cancelar
              </Button>
              <Button type="submit" className="text-white font-bold">
                Cadastrar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
