import { editUserPassword } from "@/api/edit-user-password";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface EditPasswordDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userId: string;
}

const editPasswordForm = z.object({
  oldPassword: z.string().min(1, {
    message: "Preencha este campo para continuar.",
  }),
  newPassword: z.string().min(1, {
    message: "Preencha este campo para continuar.",
  }),
});

type EditPasswordForm = z.infer<typeof editPasswordForm>;

export function EditPasswordDialog({
  isOpen,
  setIsOpen,
  userId,
}: EditPasswordDialogProps) {
  const form = useForm<EditPasswordForm>({
    resolver: zodResolver(editPasswordForm),
    defaultValues: {
      newPassword: "",
      oldPassword: "",
    },
  });

  async function onSubmit(data: EditPasswordForm) {
    try {
      await editUserPassword({
        userId,
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
      });
      form.reset();
      setIsOpen(false);
      toast.success("Senha alterada com sucesso!");
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        switch (error.status) {
          case 422:
            toast.error("Credenciais invalidas!");
            break;
          case 404:
            toast.error("Usuário não encontrado!");
            break;
          case 400:
            toast.error("Erro ao editar sua conta!");
            break;
        }
        return;
      }

      toast.error("Erro ao editar sua conta!");
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
      <DialogContent className="max-h-[70h]">
        <DialogHeader>
          <DialogTitle>Editar sua senha</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha atual</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite sua senha atual..."
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha nova</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite sua nova senha..."
                      type="password"
                      {...field}
                    />
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
