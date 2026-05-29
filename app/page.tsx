import ClientDashboard from "./components/ClientDashboard"

export default function Page({ searchParams }: { searchParams?: { user_id?: string } }) {
  const userId = (searchParams?.user_id as string) || "default_user"

  return <ClientDashboard userId={userId} />
}
