import { getServiceById } from '@/lib/data/services'
import { notFound } from 'next/navigation'
import EditServiceForm from './form'

export default async function EditServicePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const service = await getServiceById(id)

    if (!service) {
        notFound()
    }

    const serializedService = {
        ...service,
        _id: service._id?.toString()
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Service: {service.title}</h1>
            <EditServiceForm service={serializedService} />
        </div>
    )
}
