import { useAppDispatch, useAppSelector } from '@/store/hook'
import BtnHeaderTable, { IBtnHeader } from '../BtnHeaderTable'
import { useEffect, useRef, useState } from 'react'
import { OverlayPanel } from 'primereact/overlaypanel'
import { FETCH_METHOD } from '@/lib/interfaces'
import { handleGet, handlePost, reqIsSuccess } from '@/lib/request'
import { toggleShowModalColumn, setFilterFields, setVisibleColumnTable, setOrderedTable } from '@/store/reducers/dataTableSlice'
import { FilterMatchMode } from 'primereact/api'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Ripple } from 'primereact/ripple'
import { classNames } from 'primereact/utils'
import BtnActions from '../BtnActions'
import RowAction from '../RowAction'
import { MESSAGES } from '@/lib/messages'
import { DataTable as PreactDT } from 'primereact/datatable'
import ButtonAction from '../ButtonAction'
import './styles.scss'

export interface IDataTable {
   api?: any
   actions?: (data: any) => any
   actionBtn?: (data: any) => any
   singleAction?: (data: any) => any
   title?: string
   dataKey?: string
   data?: any[]
   detail?: boolean
   className?: string
   loading?: boolean
   search?: boolean
   searchQuery?: string
   btnHeader?: IBtnHeader[]
   expandedRows?: any
   handleToggleRow?: (row: any) => void
   rowExpansionTemplate?: (data: any) => React.ReactNode | string
   rowsPerPageOptions?: any[]
   manageColumn?: boolean
   filterColumn?: boolean
   handleSelection?: (row: any) => void
   selectionMode?: any
   selectedCell?: any
   pagination?: boolean
   isCustomFilter?: boolean
   hideViewFilter?: boolean
   // isCustomFilterTit?: any
   // isCustomFilterTitDesc?: any
   headerFilter?: {
      title?: string
      description?: string
   }
   templateFilter?: any
   onApply?: any
   onReset?: any
   isDynamic?: boolean
   isSelected?: boolean
   isCustomHeader?: boolean
   headerTemplate?: any
   /* server side */
   isServerSide?: boolean
   onEnter?: any
   onChangeServerSide?: any
   inputServerSide?: any
   filterFieldServerSide?: any
   filtersServerSide?: any
   onPage?: any
   totalRecords?: any
   first?: any
   isDetail?: boolean
   isCheck?: boolean
   isApprove?: boolean
   countFilter?: number
   /* end server side */
   columns: {
      selectionMode?: any
      allowExpansion?: boolean
      className?: string
      field?: string
      header?: string
      headerStyle?: Record<string, any>
      sortable?: boolean
      body?: (data: any) => React.ReactNode | string
      style?: object
      hidden?: boolean
      frozen?: boolean
      default?: boolean | null
   }[]
}

function DataTable(props: IDataTable) {
   const {
      api,
      title = '',
      actions,
      actionBtn,
      singleAction,
      columns,
      searchQuery = '',
      dataKey,
      selectedCell,
      handleSelection,
      selectionMode,
      expandedRows,
      handleToggleRow,
      rowExpansionTemplate,
      className = '',
      loading = false,
      btnHeader = null,
      search = true,
      detail = false,
      data = [],
      manageColumn = false,
      pagination = true,
      isCustomHeader = false,
      headerTemplate = null,
      /* server side */
      isServerSide = false,
      onEnter,
      onChangeServerSide,
      onPage,
      totalRecords,
      first,
   } = props
   const { url = '', body = {}, method = '' } = api || {}

   const dispatch = useAppDispatch()
   const { visibleColumnTable, filterFields } = useAppSelector((state) => state.dataTableReducer)

   // * Hook *
   const [dtLoading, setDtLoading] = useState<boolean>(false)
   const [emptyMsg, setEmptyMsg] = useState('')
   const [rows, setRows] = useState<any[]>([])
   const tooltipRef = useRef<OverlayPanel>(null)
   const baseColumnsRef = useRef<any[]>([])

   // * filters
   const [filters, setFilters] = useState<any>(null)
   const [filterInputValue, setFilterInputValue] = useState('')

   const [rowsValue, setRowsValue] = useState<any>(10)
   const [currentPage, setCurrentPage] = useState<any>(1)
   const [inputPage, setInputPage] = useState<any>(1)
   const [pageInputTooltip, setPageInputTooltip] = useState<any>("Press 'Enter' key to go to this page.")

   // * Method *
   const reqData = async () => {
      let req

      setDtLoading(true)

      if (method === FETCH_METHOD.POST) {
         req = await handlePost(url, body)
      } else {
         req = await handleGet(url)
      }

      const dataSuccess = reqIsSuccess(req) ? req.data : []
      setRows(dataSuccess)
      setDtLoading(false)
   }

   useEffect(() => {
      // if (data) {
      //    handleDefaultData()
      // }
      if (data) {
         setRows(data ? data : [])
      } else {
         reqData()
      }
   }, [data])

   useEffect(() => {
      setDtLoading(loading)
      setEmptyMsg(loading ? MESSAGES.TBL_LOADING : MESSAGES.TBL_EMPTY)
   }, [loading])

   const handleChangeFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      let _filters = { ...filters }
      _filters['global'].value = value

      setFilters(_filters)
      setFilterInputValue(value)
   }

   const elColumns = (manageColumn ? visibleColumnTable || [] : columns)?.map((col: any, i: any) => {
      return (
         <Column
            key={i}
            selectionMode={col.selectionMode}
            expander={col.allowExpansion}
            field={col.field}
            body={col.body}
            className={col.className}
            header={col.header}
            style={col.style}
            hidden={col.hidden}
            frozen={col.frozen}
         />
      )
   })

   const header = () => {
      return (
         (search || title) && (
            <>
               <div className="table-header">
                  <div className="left">
                     {search && (
                        <span className="p-input-icon-left  ">
                           <i className="pi pi-search" />
                           {/* {!isDetail && ( */}
                           <InputText
                              value={isServerSide ? undefined : filterInputValue}
                              onChange={isServerSide ? onChangeServerSide : handleChangeFilterInput}
                              placeholder="Search"
                              onKeyPress={isServerSide ? onEnter : () => console.log('enter')}
                           />
                           {/* )} */}
                        </span>
                     )}
                  </div>
                  <div className="right">{btnHeader && <BtnHeaderTable buttons={btnHeader} />}</div>
               </div>
               {isCustomHeader && headerTemplate}
            </>
         )
      )
   }

   const footer = detail && <div className="table-footer"> Found ${rows ? rows.length : 0} rows.</div>

   /* PAGINATION */

   const onPageChange = (event: any) => {
      setCurrentPage(event.first / event.rows + 1)
      setRowsValue(event.rows)
   }

   const onPageInputChange = (event: any) => {
      setInputPage(event.target.value)
      // setCurrentPage(event.target.value)
   }

   const onPageInputKeyDown = (event: any, options: any) => {
      if (event.key === 'Enter') {
         const page = parseInt(inputPage)

         if (page <= 0 || page > options.totalPages || !page) {
            setPageInputTooltip(`Value must be between 1 and ${options.totalPages}.`)
         } else {
            setCurrentPage(page)

            setPageInputTooltip("Press 'Enter' key to go to this page.")
         }
      }
   }

   const leftContent: any = (e: any) => {
      return (
         <div>
            {/* Showing <b>{parseFloat(e?.first) + 1}</b> to{" "} */}
            Showing <b>{parseFloat(e?.first) + 1}</b> to{' '}
            <b>{e?.first + Number(e?.rows) > e?.totalRecords ? e?.totalRecords : parseFloat(e?.first) + Number(e?.rows)}</b> of{' '}
            <b>{e?.totalRecords}</b> data
         </div>
      )
   }

   const template = {
      layout: !isServerSide
         ? 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport'
         : 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown',
      PrevPageLink: (options: any) => {
         return (
            <>
               <div className="borders-left"></div>
               <button
                  type="button"
                  className={classNames(options.className, 'border-round')}
                  onClick={options.onClick}
                  disabled={options.disabled}
               >
                  <span className="p-3">
                     <i className="pi pi-angle-double-left" style={{ fontSize: '1rem' }}></i>
                  </span>
                  <Ripple />
               </button>
            </>
         )
      },
      NextPageLink: (options: any) => {
         return (
            <>
               <button
                  type="button"
                  className={classNames(options.className, 'border-round')}
                  onClick={options.onClick}
                  disabled={options.disabled}
               >
                  <span className="p-3">
                     <i className="pi pi-angle-double-right" style={{ fontSize: '1rem' }}></i>
                  </span>
                  <Ripple />
               </button>
               <div className="borders-left"></div>
            </>
         )
      },
      RowsPerPageDropdown: (options: any) => {
         const dropdownOptions = [
            { label: 10, value: 10 },
            { label: 20, value: 20 },
            { label: 30, value: 30 },
            { label: 'All', value: options.totalRecords },
         ]

         return (
            <div className="rowsPerPageDropdown">
               <div className="title">Data Displayed:</div>
               <Dropdown
                  value={options.value}
                  options={dropdownOptions}
                  onChange={(e) => {
                     options.onChange(e)
                     setRowsValue(e.value)
                  }}
               />
            </div>
         )
      },
      CurrentPageReport: (options: any) => {
         return (
            <>
               <div className="borders-left"></div>
               <span className="currentPageReport">
                  Go to:{' '}
                  <span
                     onMouseEnter={(e: any) => tooltipRef.current?.toggle(e)}
                     onMouseLeave={(e: any) => tooltipRef.current?.toggle(e)}
                  >
                     <InputText
                        size="1"
                        value={inputPage}
                        keyfilter="pint"
                        // tooltip={pageInputTooltip}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => onPageInputKeyDown(e, options)}
                        onChange={onPageInputChange}
                     />
                     <OverlayPanel ref={tooltipRef}>
                        <p>{pageInputTooltip}</p>
                     </OverlayPanel>
                  </span>
               </span>
            </>
         )
      },
   }

   useEffect(() => {
      setFilters({
         global: {
            value: searchQuery ?? null,
            matchMode: FilterMatchMode.CONTAINS,
         },
      })
      const hasDefaultKey = columns.some((col) => 'default' in col)

      setFilterInputValue(searchQuery ?? '')

      const visibled = columns?.filter((e: any) => e?.default || e?.default == 'null' || e?.default == null)
      if (hasDefaultKey) {
         dispatch(setFilterFields(visibled?.map((e: any) => e?.field)))
      } else {
         dispatch(setFilterFields(columns.map((col: any) => col.field)))
      }
      dispatch(setVisibleColumnTable(visibled))
      dispatch(setOrderedTable(columns))
   }, [])

   return (
      <PreactDT
         className={`dt-idx ${search ? '' : 'hideSearch'} ${className}`}
         header={header}
         footer={footer}
         value={rows}
         responsiveLayout="scroll"
         selectionMode={selectionMode}
         sortMode="multiple"
         stripedRows
         paginator={pagination} //!isCheck && !isApprove && !isDetail &&
         {...(dataKey && { dataKey })}
         rowHover
         selection={selectedCell}
         onSelectionChange={handleSelection}
         expandedRows={expandedRows}
         onRowToggle={handleToggleRow}
         rowExpansionTemplate={rowExpansionTemplate}
         filters={filters}
         filterDisplay="menu"
         globalFilterFields={filterFields}
         emptyMessage={emptyMsg}
         currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
         rows={rowsValue}
         paginatorTemplate={template}
         rowsPerPageOptions={[10, 25, 50]}
         paginatorLeft={leftContent}
         expandedRowIcon={'pi pi-angle-up'}
         collapsedRowIcon={'pi pi-angle-down'}
         /* server side */
         totalRecords={isServerSide ? totalRecords : rows?.length}
         first={isServerSide ? first : (currentPage - 1) * rowsValue}
         onPage={isServerSide ? onPage : onPageChange}
         lazy={isServerSide}
      >
         {elColumns}

         {singleAction && (
            <Column align="right" body={(row) => <ButtonAction row={row} actions={(row: any) => singleAction({ row })} />} />
         )}

         {actions && <Column align="right" body={(row) => <RowAction row={row} actions={(row: any) => actions({ row })} />} />}

         {actionBtn && (
            <Column align="right" body={(row) => <BtnActions row={row} actions={(row: any) => actionBtn({ row })} />} />
         )}
      </PreactDT>
   )
}

export default DataTable
