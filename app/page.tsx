import { Montserrat } from 'next/font/google';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/TheButton';
import { LoginButton } from '@/components/auth/LoginButton/LoginButton';

const font = Montserrat({
  subsets: ['cyrillic'],
  weight: ['600'],
});

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-center h-full 
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
    from-sky-400  to-blue-800
    "
    >
      <div className="space-y-6 text-center">
        <h1 className={cn('text-6xl font-semibold text-white drop-shadow-md', font.className)}>
          🔐 Авторизация
        </h1>
        <p className="text-white text-lg">Сервис для аутентификации</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Авторизация
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
