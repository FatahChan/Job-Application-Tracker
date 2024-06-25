import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TextInputField from '../TextInputField';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { account } from '@/lib/appwrite';
import { useNavigate } from '@tanstack/react-router';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginFormType = z.infer<typeof loginFormSchema>;

function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });
  const onSubmit = async (values: LoginFormType) => {
    const { success, data, error } = await loginFormSchema.safeParseAsync(values);
    if (!success) {
      throw new Error(error?.message);
    } else {
      try {
        await account.createEmailPasswordSession(data.email, data.password);
        navigate({ to: '/' });
      } catch (e) {
        console.error(e);
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8">
        <TextInputField formControl={form.control} name="email" />
        <TextInputField formControl={form.control} name="password" type="password" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default LoginForm;
