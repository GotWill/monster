import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormLabel, FormItem, FormField, FormControl, FormMessage } from "./form";
import { Input } from "./input";
import { Heart, Shield, Sword, Zap } from "lucide-react";
import { Button } from "./button";
import { Label } from "@radix-ui/react-label";
import type { MonsterBattle } from "@/types/monster";

interface RegisterFormProps {
    onRegister: (prev: MonsterBattle) => void;
    monsters: MonsterBattle[]
}

const RegisterForm = ({ onRegister, monsters }: RegisterFormProps) => {

    const disabledInputs = monsters.length === 2

    const formSchema = z.object({
        name: z.string().min(1, { message: 'Nome é obrigatório' }),
        attack: z.coerce.number().min(1, { message: 'Ataque deve ser maior que 0' }),
        defense: z.coerce.number().min(1, { message: 'Defesa deve ser maior que 0' }),
        hp: z.coerce.number().min(1, { message: 'HP deve ser maior que 0' }),
        speed: z.coerce.number().min(1, { message: 'Velocidade deve ser maior que 0' }),
        image_url: z.string().url({ message: 'URL da imagem é obrigatória' }),
    });

    type formSchema = z.infer<typeof formSchema>

    const form = useForm<formSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            attack: 0,
            defense: 0,
            hp: 0,
            speed: 0,
            image_url: '',

        },
    })

    const image_url = form.watch('image_url')

    const onSubmit = (values: formSchema) => {
        onRegister(values)
        form.reset({
            name: '',
            attack: 0,
            defense: 0,
            hp: 0,
            speed: 0,
            image_url: '',
        })
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-slate-200">Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite o nome do monstro" {...field} disabled={disabledInputs} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="attack"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-200 flex gap-2"><Sword className="w-4 h-4 text-red-400" />Ataque</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="" {...field} disabled={disabledInputs} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="defense"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-200 flex gap-2"> <Shield className="w-4 h-4 text-blue-400" />Defesa</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="" {...field} disabled={disabledInputs} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="speed"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-200 flex gap-2 "> <Zap className="w-4 h-4 text-yellow-400 " />Velocidade</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="" {...field} disabled={disabledInputs} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="hp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-200 flex gap-2"><Heart className="w-4 h-4 text-green-400" />HP</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="" {...field} disabled={disabledInputs} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-slate-200">URL da Imagem</FormLabel>
                            <FormControl>
                                <Input placeholder="https://exemplo.com/imagem.jpg" {...field} disabled={disabledInputs} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                {image_url && (
                    <div className="space-y-2">
                        <Label className="text-slate-200">Preview</Label>
                        <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-slate-600 mx-auto">
                            <img
                                src={image_url}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}
                <Button
                    disabled={disabledInputs}
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700 text-white font-bold py-2 transition-all duration-200"
                >
                    Cadastrar Monstro
                </Button>
            </form>
        </Form>
    );
}

export default RegisterForm;