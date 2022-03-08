const Product=require('./models/product');
const products=[
    {
        name:'AMS Airpods',
        price: 2999,
        desc:'Get all Pro features with the best quality Calling features working Both side sensors working 2 tap pause & play music (Right) 2 taps next music control',
        img:'/images/Airpods.jpg'
    },
    {
        name:'AMS Neckband',
        price: 899,
        desc:'Neckband with Stylish design, HD Sound, extra bass and light-weight, available in red, black, yellow colour',
        img:'/images/neckband.jpg'
    },
    {
        name:'AMS Charger',
        price: 450,
        desc:'AMS Charger compatible with android (3 Amp), white in colour with white cable.',
        img:'/images/charger.jpg'
    },
    {
        name:'AMS Bluetooh Speaker',
        price: 3999,
        desc:'This Super Ultra Compact & Mini Size Portable Speaker Is A Brand New Product Which Will Provide Unbelievable Loud Sound And Great Bass.',
        img:'/images/speaker.jpg'
    },
    {
        name:'AMS Wireless Speaker',
        price: 3999,
        desc:'Super Bass sound, wireless bluetooth speaker',
        img:'/images/sp2.jpg'
    },
    {
        name:'AMS Tempered Glass',
        price: 799,
        desc:'Japnese quality tempered glass, The strongest tempered glass ever invented.',
        img:'/images/glass.jpg'
    }
];
// when seedDB function is called then products will be added in database.
// insert these products in products collection
const seedDB=async()=>{
    await Product.deleteMany({}); // jitni time seedDB func call hoga utni bar products add honge asa na ho to delete kr denge sari entries.
    await Product.insertMany(products);
    console.log('DB Seeded');
}
module.exports=seedDB; 