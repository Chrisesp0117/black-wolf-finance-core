import ClientDashboard from "./components/ClientDashboard"

export default async function Page({ searchParams }: { searchParams?: Promise<{ user_id?: string }> }) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const userId = resolvedSearchParams?.user_id || ""

  return <ClientDashboard userId={userId} />
}
