const RAW_TRANSACTION_HEADER_MAPPING = {
    'Sale Complete Date': 'Process DateTime',
    'Sale Sale ID': 'Sale Number',
    'Sale Payments Payment Type': 'Payment Type',
    'Sale Payments Amount': 'Payment Amount',
    'Sale Line Quantity Sold':'Qty'
}

const  PAYMENT_REPORT_HEADER_MAPPING = {
    'Sale Tax Name': 'Tax Name',
    'Sale Sale ID': 'Sale Number',
    'Sale Line Total with Tax': 'line Item Total',
    '':'Tax value'
}


const LINE_REPORTING_HEADER_MAPPING = {
    'Customer Customer ID': 'Customer Code',
    'Sale Sale ID': 'Sale Number',
    'Sale Completed Date': 'Process DateTime',
    'Item System ID': 'SKU',
    'Sale Line Quantity Sold': 'Qty'
};

module.exports = {
    RAW_TRANSACTION_HEADER_MAPPING,
    PAYMENT_REPORT_HEADER_MAPPING,
    LINE_REPORTING_HEADER_MAPPING
}