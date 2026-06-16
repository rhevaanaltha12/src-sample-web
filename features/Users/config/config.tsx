import { IBtnHeader } from '@/components/BtnHeaderTable'
import { IDataTable } from '@/components/DataTable'
import RowStatus from '@/components/RowStatus'
import { BTN_HEADER_TYPE } from '@/lib/types'

export const tableOptions = (options: any): IDataTable => {
   const { handleCreate, handleDelete, handleEdit } = options

   const btnHeader: IBtnHeader[] = []

   btnHeader.push({
      type: BTN_HEADER_TYPE.CREATE,
      onClick: () => handleCreate(),
      title: 'Create',
   })

   return {
      title: 'Table of Users',
      btnHeader: btnHeader,

      className: 'tblUser',
      columns: [
         {
            field: 'usruserid',
            header: 'User Id',
         },
         {
            field: 'usrname',
            header: 'Name',
            className: 'text-bold',
         },
         { field: 'usrnip', header: 'Nip' },
         { field: 'usraccesslevel', header: 'Role' },
         {
            field: 'status',
            header: 'Status',
            body: (row: any) => <RowStatus status={row?.status ?? ''} />,
         },
      ],
      actions: (data: any) => {
         const { row } = data

         const result: {
            label: string
            icon: string
            command: () => void
         }[] = []
         const btns = {
            edit: {
               label: 'Edit',
               icon: 'pi pi-fw pi-pencil',
               command: () => handleEdit(row),
            },
            delete: {
               label: 'Delete',
               icon: 'pi pi-fw pi-trash',
               command: () => handleDelete(row),
            },
         }

         result.push(btns.edit, btns.delete)

         return result
      },
   }
}

const firstNames = [
   'Budi',
   'Siti',
   'Ahmad',
   'Dewi',
   'Hendra',
   'Citra',
   'Andi',
   'Rina',
   'Joko',
   'Maya',
   'Eko',
   'Sari',
   'Rudi',
   'Lina',
   'Agus',
   'Nina',
]
const lastNames = [
   'Santoso',
   'Aminah',
   'Dahlan',
   'Lestari',
   'Wijaya',
   'Kirana',
   'Saputra',
   'Wati',
   'Setiawan',
   'Indah',
   'Prasetyo',
   'Nurhaliza',
   'Kusuma',
   'Yanti',
   'Hidayat',
   'Susanti',
]
const roles = ['Admin', 'User', 'Manager', 'Supervisor']
const statuses = ['Active', 'Inactive']

export const dummyUsers = Array.from({ length: 50 }).map((_, i) => {
   const id = (i + 1).toString().padStart(3, '0')
   const firstName = firstNames[i % firstNames.length]
   const lastName = lastNames[(i + 3) % lastNames.length]
   const role = roles[(i * 7) % roles.length]
   const status = statuses[(i * 3) % statuses.length]

   const year = 1980 + (i % 20)
   const month = ((i % 12) + 1).toString().padStart(2, '0')
   const day = ((i % 28) + 1).toString().padStart(2, '0')
   const reqYear = 2010 + (i % 10)
   const reqMonth = (((i + 5) % 12) + 1).toString().padStart(2, '0')
   const nipLast = (i + 1000).toString()
   const nip = `${year}${month}${day}${reqYear}${reqMonth}${nipLast}`

   return {
      usruserid: `USR-${id}`,
      usrname: `${firstName} ${lastName}`,
      usrnip: nip,
      usraccesslevel: role,
      status: status,
   }
})
