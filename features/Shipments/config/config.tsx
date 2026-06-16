import { IBtnHeader } from '@/components/BtnHeaderTable'
import { IDataTable } from '@/components/DataTable'
import RowStatus from '@/components/RowStatus'
import { BTN_HEADER_TYPE } from '@/lib/types'

export const tableOptions = (options: any): IDataTable => {
   const { handleCreate } = options
   const btnHeader: IBtnHeader[] = [{ type: BTN_HEADER_TYPE.CREATE, onClick: handleCreate, title: 'Create' }]

   return {
      title: 'Table of Shipments',
      btnHeader,
      className: 'tblShipment',
      columns: [
         { field: 'shipid', header: 'Shipment ID' },
         { field: 'recipient', header: 'Recipient' },
         {
            field: 'route',
            header: 'Route',
            body: (row: any) => <span>{row.origin} → {row.destination}</span>,
         },
         { field: 'weight', header: 'Weight' },
         { field: 'vehicletype', header: 'Vehicle' },
         {
            field: 'status',
            header: 'Status',
            body: (row: any) => <RowStatus status={row?.status ?? ''} />,
         },
         { field: 'eta', header: 'ETA' },
      ],
      actions: (data: any) => {
         const { row } = data
         return [
            { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => options.handleEdit(row) },
            { label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => options.handleDelete(row) },
         ]
      },
   }
}

const recipients = ['PT Maju Jaya', 'CV Berkah Mandiri', 'PT Surya Logistik', 'UD Makmur Abadi', 'PT Nusantara Trans', 'CV Cepat Kilat', 'PT Andalas Cargo', 'UD Jaya Sentosa', 'PT Prima Ekspres', 'CV Sumber Rejeki']
const origins = ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Makassar', 'Semarang', 'Palembang', 'Balikpapan']
const destinations = ['Surabaya', 'Jakarta', 'Yogyakarta', 'Denpasar', 'Manado', 'Pekanbaru', 'Pontianak', 'Banjarmasin', 'Kupang', 'Ambon']
const vehicles = ['Truck', 'Pickup', 'Motor', 'Van']
const statuses = ['Pending', 'In Transit', 'Delivered', 'Cancelled']
const priorities = ['Normal', 'Express', 'Urgent']

export const dummyShipments = Array.from({ length: 40 }).map((_, i) => {
   const id = (i + 1).toString().padStart(3, '0')
   const etaDay = new Date(2025, 5, 20 + (i % 15))
   const etaStr = etaDay.toISOString().slice(0, 10)

   return {
      shipid: `SHP-${id}`,
      recipient: recipients[i % recipients.length],
      origin: origins[i % origins.length],
      destination: destinations[(i + 2) % destinations.length],
      weight: `${(50 + i * 23) % 900 + 50} kg`,
      vehicletype: vehicles[i % vehicles.length],
      priority: priorities[i % priorities.length],
      status: statuses[(i * 3) % statuses.length],
      eta: etaStr,
      notes: '',
   }
})
