import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useRedirectAfterSomeSeconds(
  redirectTo: string,
  seconds: number,
  isOpen: boolean
) {
  const [secondsRemaining, setSecondsRemaining] = useState(seconds);
  const router = useRouter();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
        if (secondsRemaining === 1) router.push(redirectTo);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [router, secondsRemaining, redirectTo, isOpen]);

  return { secondsRemaining };
}
