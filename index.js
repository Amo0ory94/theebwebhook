const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3030;

async function getAuth(){
    return await fetch(`https://carprouat.theeb.sa:8080/WebAPI/api/AccessToken?username=TheebUser1&password=ZT%3EQs%23NXbt%3D9yzVb6A%40Z&client_id=CarProAPI&client_secret=EB074A7D-F6BE-4F55-B8E3-D64CA0F4AD5D`,{
        method:'POST'
    }).then((data) =>{
      return data.json()
      })
}
app.use(bodyParser.json());
app.post('/webhook', async (req, res) => {
    const data = req.body;
     const auth = await getAuth()
     const url = 'https://carprouat.theeb.sa:8080/WebAPI/api/CreatePayment?Responsetype=json';

     const payment = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + auth.access_token,
        },
        body: JSON.stringify({
            PAYMENTOPTION:data.payment_option,
            MERCHANTREFERENCE:data.merchant_reference,
            AMOUNT:data.amount / 100,
            CARDNUMBER:data.card_number,
            EXPIRYDATE:data.expiry_date,
            AUTHORIZATIONCODE:data.authorization_code,
            RESERVATIONNO:'013614170106',
            DRIVERCODE:data.merchant_extra,
            CURRENCY:data.currency,
            INVOICE:'',
            AGREEMENT:'',
            LastName:data.merchant_extra1,
            LicenseIdNo:data.merchant_extra2,
            MobileNumber:data.merchant_extra3,
            PassportIdNumber:data.merchant_extra2,
            InternetAddress:data.merchant_extra4
        })
     }).then((res)=> res.json())
 
     console.log(payment)
    return res.status(214).send(payment)

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});