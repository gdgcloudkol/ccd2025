import { VERITY_EMAIL_DJANGO_URL } from "@/lib/constants/be";
import { redirect } from "next/navigation";


const Page = async ({ params }: { params: Promise<{ token: string }> }) => {
  const { token } = await params;
  const tokenString = decodeURIComponent(token);

  const res = await fetch(`${VERITY_EMAIL_DJANGO_URL}${tokenString}/`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Do this BEFORE returning anything
  if (res.ok) {
    redirect("/login");
  }

  // If not ok, fall through to show an error/fallback UI
  return (
    <div className='flex grow flex-col items-center justify-center'>
      <div className='w-[200px]'>
        <div className='progress-bar'>
          <div className='progress-bar-value'></div>
        </div>
      </div>
      <section>
        <div className='mx-auto max-w-screen-xl p-4'>
          <div className='mx-auto max-w-screen-sm text-center'>
            <p className='mb-4 text-xl font-bold tracking-tight text-gray-500 dark:text-gray-300'>
              Failed to activate account. Please try again or contact support.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
