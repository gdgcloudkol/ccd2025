import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import Button from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface AuthFormProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => Promise<void>;
  isLoading: boolean;
  submitText: string;
  fields: {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    description?: string;
  }[];
  footer?: ReactNode;
  error?: string;
}

export default function AuthForm({
  form,
  onSubmit,
  isLoading,
  submitText,
  fields,
  footer,
  error,
}: AuthFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="text-base">{field.label}</FormLabel>
                <FormControl>
                  <Input
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    className="bg-background text-foreground border-input focus:border-primary focus:ring-1 focus:ring-primary"
                    {...formField}
                  />
                </FormControl>
                {field.description && (
                  <FormDescription>{field.description}</FormDescription>
                )}
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          className="w-full text-center bg-primary hover:bg-primary/90 text-primary-foreground h-11 text-base font-medium transition-colors"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {submitText}
        </Button>

        {error && (
          <p className="text-destructive text-center text-sm font-medium">
            {error}
          </p>
        )}

        {footer && <div className="text-center text-sm">{footer}</div>}
      </form>
    </Form>
  );
}
