
import { VERITY_EMAIL_DJANGO_URL } from "@/lib/constants/be";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    token: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const tokenParams = (await params).token;

  const token = decodeURIComponent(tokenParams); // ensure decoded
  console.log("URL IS",`${VERITY_EMAIL_DJANGO_URL}${token}/`)
  try {
    const res = await fetch(`${VERITY_EMAIL_DJANGO_URL}${token}/`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      redirect("/login");
    } else {
      throw new Error(`An error occurred: ${res.status}`);
    }
  } catch (error) {
    console.error("Verification failed:", error);
    // Optionally show error page or fallback
  }

  return (
    <div className='flex grow flex-col items-center justify-center'>
      <div className={"w-[200px]"}>
        <div className='progress-bar'>
          <div className='progress-bar-value'></div>
        </div>
      </div>
      <section>
        <div className='mx-auto max-w-screen-xl p-4'>
          <div className='mx-auto max-w-screen-sm text-center'>
            <p className='mb-4 text-xl font-bold tracking-tight text-gray-500 dark:text-gray-300'>
              Activating account
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
