import ResourcePageClient from "./ResourcePageClient"

interface Props {
  params: Promise<{ id: string }>
}

export default async function ResourcePage({ params }: Props) {
  const { id } = await params
  return <ResourcePageClient id={id} />
}