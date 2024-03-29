"use client";
import Heading from '@/components/heading'
import { Code } from 'lucide-react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from "axios"
import Empty from '@/components/empty';
import Loader from '@/components/loader';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/user-avatar';
import BotAvatar from '@/components/bot-avatar';
import UserMessage from '@/components/user-message';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface userPrompt {
    user: string;
    prompt: string;
}
const CodePage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<userPrompt[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/code", values);
            const data = response.data;
            const newPrompt = { user: values.prompt, prompt: data };
            setMessages(current => [...current, newPrompt]);
            form.reset();
        } catch (error) {
            // TODO: Open pro mode
            console.log(error);
        }
    }

    return (
        <div>
            <Heading
                title='Code generation'
                description='Generate code using descriptive text.'
                icon={Code}
                iconColor='text-green-700'
                bgColor='bg-green-700/10'
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
                            <FormField
                                name='prompt'
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-10'>
                                        <FormControl className='m-0 p-0'>
                                            <Input
                                                className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                                disabled={isLoading}
                                                placeholder='How to center a div'
                                                {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty
                            label='Not found'
                        />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {
                            messages.map((message) => (
                                <div key={message.user}
                                    className={cn('p-8 w-full flex gap-x-8 rounded-lg flex-col gap-y-2 text-sm')}
                                >
                                    {message.user && (
                                        <UserMessage
                                            avatarComponent={<UserAvatar />}
                                            text={message.user}
                                        />
                                    )}
                                    <div className="flex gap-2 bg-muted py-5 px-4 rounded-lg border">
                                        <BotAvatar />
                                        <ReactMarkdown
                                            components={{
                                                pre: ({ node, ...props }) => (
                                                    <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'>
                                                        <pre {...props} />
                                                    </div>
                                                ),
                                                code: ({ node, ...props }) => (
                                                    <SyntaxHighlighter language="javascript" style={a11yDark}>
                                                        {props.children}
                                                    </SyntaxHighlighter>
                                                ),
                                            }}
                                            className="text-sm overflow-hidden leading-7 w-full"
                                        >
                                            {message.prompt || ""}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodePage