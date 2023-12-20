import { providers, auth, signIn } from '@/auth';

export default function SignIn({ providers: [] }) {
  return (
    <>
      {providers.map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.name)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}

export async function getServerSideProps(context:any) {
  const providers = await auth();
  return {
    props: { providers },
  }
}