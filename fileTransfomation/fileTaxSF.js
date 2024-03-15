const taxFilePath='./R-Series-Sale-Export/sf_tax_collected sales 2024-03-15T1640.csv';
const csv=require('csvtojson');
const fs = require('fs');

async function getTaxData(taxFilePath){
    const data = await csv().fromFile(taxFilePath);

    const transformedData = data.map(item => {
        // const taxValue = (parseFloat(item['Sale Line Total with Tax']) - parseFloat(item['Sale Line Subtotal'])).toFixed(2);
        return {
            'Tax Name': item['Sale Tax Name'],
            'Sale Number': item['Sale Sale ID']
        };
    });
    
    return transformedData;

}

async function processData(){
    
    // console.log(await getTaxData(taxFilePath))
    fs.writeFileSync('./rawTax.json',JSON.stringify(await getTaxData(taxFilePath)));

}

processData();