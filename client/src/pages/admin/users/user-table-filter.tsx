import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const userFilterSchema = z.object({
  userName: z.string().optional(),
});

type UserFilterSchemaType = z.infer<typeof userFilterSchema>;

export function UserTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const userName = searchParams.get("userName");

  const form = useForm<UserFilterSchemaType>({
    resolver: zodResolver(userFilterSchema),
    defaultValues: {
      userName: userName ?? "",
    },
  });

  function handleFilter({ userName }: UserFilterSchemaType) {
    setSearchParams((state) => {
      if (userName) {
        state.set("userName", userName);
      } else {
        state.delete("userName");
      }

      state.set("page", "1");

      return state;
    });
  }

  function handleClearFilters() {
    form.reset();

    setSearchParams({});
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFilter)}
        className="flex items-center gap-2"
      >
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem className="min-w-[200px]">
              <FormControl>
                <Input placeholder="Procure por um usuário..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary" size="xs">
          <div className="flex items-center justify-center">
            <Search className="h-4 w-4 mr-2" />
            Filtrar usuários
          </div>
        </Button>
        <Button
          onClick={handleClearFilters}
          type="button"
          variant="outline"
          size="xs"
        >
          <div className="flex items-center justify-center">
            <X className="h-4 w-4 mr-2" />
            Remover Filtros
          </div>
        </Button>
      </form>
    </Form>
  );
}
