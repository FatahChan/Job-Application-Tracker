import LoginForm from '@/components/LoginForm';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/login')({
  component: () => <LoginForm />,
});
