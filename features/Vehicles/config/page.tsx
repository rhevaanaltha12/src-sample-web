export const pageForm = (form: { status: string; title: string }) => ({
   pageTitle: `${form.status} Vehicle`,
   breadcrumb: [
      { label: 'Dashboard', url: '/dashboard' },
      { label: 'Fleet Management', url: '/dashboard/vehicles' },
      { label: form.status },
   ],
   formTitle: form.title,
})
