var db = require('./models')

// db.user.create({
//   firstname: 'Samantha',
//   lastname: 'Helmbreck',
//   password: '12345678',
//   email: 'samantha.helmbreck@gmail.com',
//   birthdate: new Date(1992, 6, 24),
// })
// .then(function(user) {
//   console.log(user.get())
// })

// db.favorite.create({
//   userId: 1,
//   url: 'www.google.com',
//   label: 'cookie',
//   image: 'facebook',
//   uri: 'cooool',
//   foodId: 'dessert',
// })
// .then(function(favorite) {
//   console.log(favorite.get())
// })

db.user.findOne({
  where: { id: 1 },
  include: [db.favorite]
})
.then(result=>{
  console.log(result.favorites)
})