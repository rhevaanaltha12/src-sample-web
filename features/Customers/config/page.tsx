export const pageForm = (form: { status: string; title: string }) => ({
   pageTitle: `${form.status} Customer`,
   breadcrumb: [
      { label: 'Dashboard', url: '/dashboard' },
      { label: 'Customer Management', url: '/dashboard/customers' },
      { label: form.status },
   ],
   formTitle: form.title,
})
