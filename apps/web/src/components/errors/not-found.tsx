import { Button } from '@repo/ui';
import { Link } from '@tanstack/react-router';

export function NotFound({ children }: { children?: React.ReactNode }) {
  return (
    <div className="space-y-2 p-2">
      <div>
        {children ?? <p>The page you are looking for does not exist.</p>}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => globalThis.history.back()}>Go back</Button>
        <Link to="/">Start Over</Link>
      </div>
    </div>
  );
}
