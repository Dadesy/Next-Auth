import { signOut } from '@/auth';

const SettingsPage = async () => {
  return (
    <div>
      <form
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <button type="submit">Выйти</button>
      </form>
    </div>
  );
};

export default SettingsPage;
