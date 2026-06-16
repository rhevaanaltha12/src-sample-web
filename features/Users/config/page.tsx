export const pageForm = (type: any) => ({
   pageTitle: 'User Management',
   pageIcon: 'pi-users',
   formTitle: type?.title,
   breadcrumb: [
      {
         label: 'Dashboard',
         url: '#',
      },
      {
         label: 'User Management',
         url: '/dashboard/users',
      },
      {
         label: type?.status,
      },
   ],
})
