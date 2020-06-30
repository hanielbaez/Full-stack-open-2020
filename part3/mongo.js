const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://phonebook:${password}@cluster0-qh3gt.mongodb.net/<dbname>?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phoneNumberSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date
})

const PhoneNumber = mongoose.model('Phone', phoneNumberSchema)

if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const phoneNumber = new PhoneNumber({
        name: name,
        number: number,
        date: new Date()
    })

    phoneNumber.save().then(_ => {
        console.log(`Phone number save`)
        mongoose.connection.close()
    })

} else {
    PhoneNumber
        .find({})
        .then(phoneNumbers => {
            console.log('phonebook:')
            phoneNumbers.forEach(phoneNumber => {
                console.log(`${phoneNumber.name} ${phoneNumber.number}`)
            })
            mongoose.connection.close()
        })
}