import { IBtnHeader } from '@/components/BtnHeaderTable'
import { IDataTable } from '@/components/DataTable'
import RowBadge from '@/components/RowBadge'
import RowStatus from '@/components/RowStatus'
import { BTN_HEADER_TYPE } from '@/lib/types'

export const tableOptions = (options: any): IDataTable => {
   const btnHeader: IBtnHeader[] = [{ type: BTN_HEADER_TYPE.CREATE, onClick: options.handleCreate, title: 'Create' }]

   return {
      title: 'Table of Customers',
      btnHeader,
      className: 'tblCustomer',
      columns: [
         { field: 'custid', header: 'Customer ID' },
         { field: 'custname', header: 'Name', className: 'text-bold' },
         { field: 'phone', header: 'Phone' },
         {
            field: 'custtype',
            header: 'Type',
            body: (row: any) => (
               <RowBadge status={row.custtype} type={row.custtype === 'Corporate' ? 'wrap-blue' : 'wrap-grey'} />
            ),
         },
         { field: 'totalorders', header: 'Total Orders' },
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

const companyNames = ['PT Maju Jaya', 'CV Berkah Mandiri', 'PT Surya Logistik', 'UD Makmur Abadi', 'PT Nusantara Trans', 'CV Cepat Kilat', 'PT Andalas Cargo', 'UD Jaya Sentosa', 'PT Prima Ekspres', 'CV Sumber Rejeki', 'PT Bangun Karya', 'UD Sejahtera', 'CV Mandiri Utama', 'PT Global Ekspres', 'UD Harapan Baru']
const individualNames = ['Budi Santoso', 'Siti Aminah', 'Ahmad Dahlan', 'Dewi Lestari', 'Hendra Wijaya', 'Citra Kirana', 'Andi Saputra', 'Rina Wati', 'Joko Setiawan', 'Maya Indah']
const cities = ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Makassar', 'Semarang', 'Palembang', 'Yogyakarta']
const statuses = ['Active', 'Inactive']
const types = ['Corporate', 'Individual']

export const dummyCustomers = Array.from({ length: 35 }).map((_, i) => {
   const id = (i + 1).toString().padStart(3, '0')
   const type = types[i % 2]
   const name = type === 'Corporate' ? companyNames[i % companyNames.length] : individualNames[i % individualNames.length]
   const city = cities[i % cities.length]

   return {
      custid: `CST-${id}`,
      custname: name,
      phone: `0${8 + (i % 3)}${String(12000000 + i * 7891).slice(0, 9)}`,
      email: `${name.toLowerCase().replace(/\s/g, '.').replace(/[^a-z.]/g, '')}@email.com`,
      address: `Jl. ${['Sudirman', 'Gatot Subroto', 'Thamrin', 'Diponegoro', 'Veteran'][i % 5]} No. ${i + 1}, ${city}`,
      custtype: type,
      totalorders: (i * 7 + 3) % 50 + 1,
      status: statuses[(i * 3) % statuses.length],
   }
})
