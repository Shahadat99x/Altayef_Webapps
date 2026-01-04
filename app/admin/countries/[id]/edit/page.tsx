import { getCountryById } from '@/lib/data/countries'
import { notFound } from 'next/navigation'
import EditCountryForm from './form'

export default async function EditCountryPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const country = await getCountryById(id)

    if (!country) {
        notFound()
    }

    const serializedCountry = {
        ...country,
        _id: country._id?.toString()
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Country: {country.name}</h1>
            <EditCountryForm country={serializedCountry} />
        </div>
    )
}
