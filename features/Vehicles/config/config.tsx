import { IBtnHeader } from '@/components/BtnHeaderTable'
import { IDataTable } from '@/components/DataTable'
import RowBadge from '@/components/RowBadge'
import RowStatus from '@/components/RowStatus'
import { BTN_HEADER_TYPE } from '@/lib/types'

export const tableOptions = (options: any): IDataTable => {
   const btnHeader: IBtnHeader[] = [{ type: BTN_HEADER_TYPE.CREATE, onClick: options.handleCreate, title: 'Create' }]

   return {
      title: 'Table of Vehicles',
      btnHeader,
      className: 'tblVehicle',
      columns: [
         { field: 'vhcid', header: 'Vehicle ID' },
         { field: 'plate', header: 'Plate Number' },
         {
            field: 'vhctype',
            header: 'Type',
            body: (row: any) => <RowBadge status={row.vhctype} type="wrap-blue" />,
         },
         { field: 'capacity', header: 'Capacity' },
         { field: 'year', header: 'Year' },
         {
            field: 'status',
            header: 'Status',
            body: (row: any) => <RowStatus status={row?.status ?? ''} />,
         },
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

const plates = ['B', 'D', 'F', 'Z', 'L', 'W', 'N', 'AG', 'AE']
const types = ['Truck', 'Pickup', 'Motor', 'Van']
const statuses = ['Active', 'On Route', 'Maintenance']

export const dummyVehicles = Array.from({ length: 25 }).map((_, i) => {
   const id = (i + 1).toString().padStart(3, '0')
   const plate = plates[i % plates.length]
   const num = String(1000 + i * 137).slice(0, 4)
   const suffix = ['AB', 'CD', 'EF', 'GH', 'XY', 'JK'][i % 6]

   return {
      vhcid: `VHC-${id}`,
      plate: `${plate} ${num} ${suffix}`,
      vhctype: types[i % types.length],
      capacity: `${[1, 2, 3, 5, 8, 10][i % 6]} Ton`,
      year: String(2018 + (i % 6)),
      status: statuses[(i * 2) % statuses.length],
   }
})
