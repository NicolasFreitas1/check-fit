import { editAccount } from "@/api/edit-account";
import { User } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface EditAccountDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: User;
}

const editAccountForm = z.object({
  name: z.string().min(1, {
    message: "Preencha este campo para continuar.",
  }),
  email: z
    .string()
    .min(1, "Preencha este campo para continuar.")
    .email("E-mail inválido"),
});

type EditAccountForm = z.infer<typeof editAccountForm>;

export function EditAccountDialog({
  isOpen,
  setIsOpen,
  user,
}: EditAccountDialogProps) {
  const form = useForm<EditAccountForm>({
    resolver: zodResolver(editAccountForm),
    defaultValues: {
      email: user.email,
      name: user.name,
    },
  });

  async function onSubmit(data: EditAccountForm) {
    try {
      await editAccount({
        userId: user.id,
        email: data.email,
        name: data.name,
      });
      form.reset();
      setIsOpen(false);
      toast.success("Conta alterada com sucesso!");
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        switch (error.status) {
          case 404:
            toast.error("Usuário não encontrado!");
            break;
          case 409:
            toast.error("E-mail já está em uso!");
            break;
          case 400:
            toast.error("Erro ao editar sua conta!");
            break;
        }
        return;
      }

      toast.error("Erro ao cadastrar sua conta!");
    }
  }

  useEffect(() => {
    form.reset();
  }, [form]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);

        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar seu perfil</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu email..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="text-white text-bold">
                Editar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
