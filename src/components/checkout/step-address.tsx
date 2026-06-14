import { useCheckoutStore } from "@/stores/checkout-store";
import { CheckoutSteps } from "@/types/checkout-steps";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
    street: z.string().min(2, 'Preencha o endereço'),
    number: z.string().min(2, 'Preencha o número'),
    complement: z.string().optional(),
    district: z.string().min(2, 'Preencha o bairro'),
    city: z.string().min(2, 'Preencha a cidade'),
    state: z.string().min(2, 'Preencha o estado')
})

type Props = {
    setStep: Dispatch<SetStateAction<CheckoutSteps>>;
}

export const StepAddress = ({ setStep }: Props) => {
    const { address, setAddress } = useCheckoutStore(state => state);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { ...address }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setAddress(values);
        setStep('finish');
    }
    
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} >
            <div className="grid grid-cols-2 gap-4">
                <Field>
                    <Label htmlFor="street">Rua</Label>

                    <Input {...form.register("street")} />

                    {form.formState.errors.street && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.street.message}
                        </p>
                    )}
                </Field>

                <Field>
                    <Label htmlFor="number">Número</Label>

                    <Input {...form.register("number")} />

                    {form.formState.errors.number && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.number.message}
                        </p>
                    )}
                </Field>

                <Field>
                    <Label htmlFor="complement">Complemento</Label>

                    <Input {...form.register("complement")} />

                    {form.formState.errors.complement && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.complement.message}
                        </p>
                    )}
                </Field>

                <Field>
                    <Label htmlFor="district">Bairro</Label>

                    <Input {...form.register("district")} />

                    {form.formState.errors.district && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.district.message}
                        </p>
                    )}
                </Field>

                <Field>
                    <Label htmlFor="city">Cidade</Label>

                    <Input {...form.register("city")} />

                    {form.formState.errors.city && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.city.message}
                        </p>
                    )}
                </Field>

                <Controller
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <Field>
                            <Label htmlFor="state">Estado</Label>

                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                
                                <SelectTrigger>
                                    <SelectValue placeholder="Estado" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="sp">São Paulo</SelectItem>
                                    <SelectItem value="pr">Paraná</SelectItem>
                                    <SelectItem value="rj">Rio de Janeiro</SelectItem>
                                </SelectContent>

                            </Select>

                            {form.formState.errors.state && (
                                <p className="text-sm text-destructive">
                                    {form.formState.errors.state.message}
                                </p>
                            )}
                        </Field>
                    )}
                />

            </div>
            <div className="flex justify-between mt-4">
                <Button variant="secondary" onClick={() => setStep('user')}>Voltar</Button>
                <Button type="submit">Concluir</Button>
            </div>
        </form>
    );
}