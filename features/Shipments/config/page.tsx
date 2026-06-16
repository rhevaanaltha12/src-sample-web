export const pageForm = (form: { status: string; title: string }) => ({
   pageTitle: `${form.status} Shipment`,
   breadcrumb: [
      { label: 'Dashboard', url: '/dashboard' },
      { label: 'Shipment Management', url: '/dashboard/shipments' },
      { label: form.status },
   ],
   formTitle: form.title,
})
