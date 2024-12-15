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

const gymFilterSchema = z.object({
  gymName: z.string().optional(),
});

type GymFilterSchemaType = z.infer<typeof gymFilterSchema>;

export function GymTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const gymName = searchParams.get("gymName");

  const form = useForm<GymFilterSchemaType>({
    resolver: zodResolver(gymFilterSchema),
    defaultValues: {
      gymName: gymName ?? "",
    },
  });

  function handleFilter({ gymName }: GymFilterSchemaType) {
    setSearchParams((state) => {
      if (gymName) {
        state.set("gymName", gymName);
      } else {
        state.delete("gymName");
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
          name="gymName"
          render={({ field }) => (
            <FormItem className="min-w-[200px]">
              <FormControl>
                <Input placeholder="Procure por uma academia..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary" size="xs">
          <div className="flex items-center justify-center">
            <Search className="h-4 w-4 mr-2" />
            Filtrar academias
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
