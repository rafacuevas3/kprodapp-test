const elemFromId = App.catalogs.elemFromId
const preprocData = require('./models/preproc-data')
const BT_PREFIX = 'related-orders'

const dateFormatter = require('scripts/lib/dates').dateTimeFormat

const statusFormatter = status => {
  status = status && elemFromId('order_statuses', status)

  if (!status) return '-'

  return `<span class="boxed-status ${status.color}">${status.name}</span>`
}

const linkFormmater = id => {
  return `<a href="#/orden/${id}" target="_blank">
    <span class="fa-external-link"></span>
  </a>`
}

const translationFormatter = isTranslation => {
  return `<span> ${isTranslation ? 'Si' : 'No'}</span>`
}

const columns = [
  {
    field: 'id',
    title: 'ID',
    titleTooltip: 'Id de la orden de producción',
    class: 'no-break text-center',
    sortable: true,
    order: 'desc',
  },
  {
    field: 'resource_title',
    title: 'Título del recurso',
    sortable: true,
    order: 'desc',
    class: 'min-width-medium',
  },
  {
    field: 'created_at',
    title: 'Fecha de creación',
    sortable: false,
    order: 'asc',
    formatter: dateFormatter,
  },
  {
    field: 'status',
    title: 'Estatus',
    class: 'no-break',
    sortable: true,
    order: 'desc',
    formatter: statusFormatter,
  },
  {
    field: 'grade',
    title: 'Grado',
    sortable: true,
    order: 'desc',
  },
  {
    field: 'challenge',
    title: 'Reto',
    sortable: true,
    order: 'desc',
  },
  {
    field: 'resource_type',
    title: 'Tipo del recurso',
    sortable: true,
    order: 'desc',
  },
  {
    field: 'is_translation',
    title: 'Traducción',
    sortable: true,
    order: 'desc',
    formatter: translationFormatter,
  },
  {
    field: 'id',
    title: '',
    titleTooltip: 'Enlace externo',
    class: 'has-link',
    sortable: false,
    formatter: linkFormmater,
  },
]

module.exports = function (ctx) {
  const init = require('scripts/table-init')

  setImmediate(() => {
    $('#table-root-orders')
      .find('.search input')
      .attr('placeholder', 'Buscar orden de producción existente')
      .focus()
  })

  init(BT_PREFIX, '#table-root-orders', {
    url: '/related-orders',
    columns,
    uniqueId: 'id',
    requisId: ctx.id,
    toolbar: '',
    searchAlign: 'left',
    condensed: false,
    showColumns: true,
    showRefresh: false,
    showToggle: false,
    queryParams: params => ({
      ...params,
      requisition_id: ctx.id,
      show_suggested: 0,
      per_page: -1,
      order_name: 'id',
    }),
  })
}
