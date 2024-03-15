const salesFilePath='./R-Series-Sale-Export/new_sf_sales sales 2024-03-15T1536.csv';
const csv=require('csvtojson')
const fs = require('fs');

// Function to find objects with the same Sale IDs and transform them
async function findObjectsWithSameSaleIds(salesFilePath) {
    const salesData = await csv().fromFile(salesFilePath);
      
      const transformedData = salesData.map(item => {
        // Extract the tax percentage from the 'Sale Line Tax Class' string
        let taxPercentage = parseFloat(item['Sale Line Tax Class'].match(/(\d+)/));
        if(isNaN(taxPercentage)){
            taxPercentage = 0;
        }

        // Calculate the tax value
        const taxValue = parseFloat(item['Sale Line Subtotal']) * (taxPercentage / 100);
        // Calculate the line item total
        const lineItemTotal = parseFloat(item['Sale Line Subtotal']) + taxValue;
      
        return {
          'Customer Code': item['Customer Customer ID'],
          'Sale Number': item['Sale Sale ID'],
          'Process DateTime': item['Sale Completed Date'],
          'SKU': item['Item System ID'],
          'Tax Value': taxValue.toFixed(2),
          'Qty': item['Sale Line Quantity Sold'],
          'Retail Price (excluding Tax)': item['Sale Line Subtotal'],
          'line Item Total': lineItemTotal.toFixed(2)
        };
      });
      
    //   console.log(transformedData);
      

    return transformedData;

    // return transformedData;
}

async function processData() {
    const transformedData = await findObjectsWithSameSaleIds(salesFilePath);
    console.log(transformedData);
    fs.writeFileSync('./rawSalesDetails.json',JSON.stringify(transformedData));
}

processData();

