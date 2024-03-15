const salesFilePath='./R-Series-Sale-Export/new_sf_sales sales 2024-03-15T1208.csv';
const paymentsFilePath='./R-Series-Sale-Export/sf_sale_payments sales 2024-03-15T1210.csv';
const taxFilePath='./R-Series-Sale-Export/sf_tax_collected sales 2024-03-15T1209.csv';
const csv=require('csvtojson');
const fs = require('fs');

// Function to find objects with the same Sale IDs and transform them
async function findObjectsWithSameSaleIds(paymentsFilePath) {
    const data = await csv().fromFile(paymentsFilePath);
    const transformedData = [];

    data.forEach(item => {
        const saleId = item['Sale Sale ID'];
        const existingItem = transformedData.find(obj => obj['Sale Number'] === saleId);

        if (existingItem) {
            const paymentIndex = Object.keys(existingItem).filter(key => key.includes('Payment Type')).length + 1;

            existingItem[`Payment Type ${paymentIndex}`] = item['Sale Payments Payment Type'];
            existingItem[`Payment Amount ${paymentIndex}`] = item['Sale Payments Amount'];
        } else {
            const transformedItem = {
                'Process DateTime': item['Sale Completed Date'],
                'Sale Number': saleId,
                'Payment Type 1': item['Sale Payments Payment Type'],
                'Payment Amount 1': item['Sale Payments Amount']
            };

            transformedData.push(transformedItem);
        }
    });

    return transformedData;
}

async function processData() {
    const transformedData = await findObjectsWithSameSaleIds(paymentsFilePath);
    console.log(transformedData);
    fs.writeFileSync('./rawPayments.json',JSON.stringify(transformedData));
}

processData();