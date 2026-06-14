import { useCheckoutStore } from "@/stores/checkout-store";
import { CheckoutSteps } from "@/types/checkout-steps";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
    name: z.string().min(2, 'Preencha seu nome')
})

type Props = {
    setStep: Dispatch<SetStateAction<CheckoutSteps>>;
}

export const StepUser = ({ setStep }: Props) => {
    const { name, setName } = useCheckoutStore(state => state);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setName(values.name);
        setStep('address');
    }
    
    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
        >
            <Field>
                <Label htmlFor="name">Seu nome</Label>

                <Input
                    id="name"
                    autoFocus
                    placeholder="Qual o seu nome?"
                    {...form.register("name")}
                />

                {form.formState.errors.name && (
                    <p className="text-sm text-destructive">
                        {form.formState.errors.name.message}
                    </p>
                )}
            </Field>

            <Button
                type="submit"
                variant="outline"
            >
                Próximo
            </Button>
        </form>
    );
}