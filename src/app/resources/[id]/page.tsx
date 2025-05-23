// import ResourcePageClient from "./ResourcePageClient";



// export default function ResourcePage({ params }: { params: { id: string } }) {
//   return <ResourcePageClient id={params.id} />
// }

import ResourcePageClient from "./ResourcePageClient"

interface Props {
  params: { id: string }
}

export default function ResourcePage({ params }: Props) {
  return <ResourcePageClient id={params.id} />
}