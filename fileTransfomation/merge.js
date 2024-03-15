const paymentList = JSON.parse(JSON.stringify(require('../rawPayments.json')));
  
  const taxList = JSON.parse(JSON.stringify(require('../rawTax.json')));
  
  const saleList = JSON.parse(JSON.stringify(require('../rawSalesDetails.json')));

  const fs = require('fs');
  const { Parser } = require('json2csv');


  
  const mergedList = saleList.map(saleItem => {
    // Find the corresponding payment information
    const paymentInfo = paymentList.find(payment => payment['Sale Number'] === saleItem['Sale Number']);
    // Find the corresponding tax information
    const taxInfo = taxList.find(tax => tax['Sale Number'] === saleItem['Sale Number']);
  
    // Merge the sale item with payment and tax information
    return {
      ...saleItem,
      'Tax Name': taxInfo ? taxInfo['Tax Name'] : undefined, // Add Tax Name
      ...paymentInfo, // Spread all payment information properties
    };
  });
  
//   console.log(mergedList);
  fs.writeFileSync('./mergeSale.json',JSON.stringify(mergedList));
  const fields = ['field1', 'field2', 'field3'];

  const opts = { fields };

try {
  const parser = new Parser();
  const csv = parser.parse(mergedList);
  console.log(csv);
  fs.writeFileSync('./mergeSale.csv',csv);
} catch (err) {
  console.error(err);
}
  