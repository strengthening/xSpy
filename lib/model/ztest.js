var models = require('./models');


// models.Hexun_xauusd.findOrCreate({where: {timestamp: '1467820800000'}, defaults: {price: 1111}})
//   .spread(function(hexun_xauusd, created) {
//     console.log(hexun_xauusd);
//     console.log(created);
//     // console.log(user.get({
//     //   plain: true
//     // }))
//     // console.log(created)

//     /*
//       {
//         username: 'sdepold',
//         job: 'Technical Lead JavaScript',
//         id: 1,
//         createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
//         updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
//       }
//       created: true
//     */
//   })


// models.Hexun_usdcnh.findOrCreate({where: {timestamp : '1467331200000'}, defaults: { value : 11111,date : new Date(1467331200000)}})
// .spread(function(hexun_xauusd, created) {
//     console.log(hexun_xauusd);
//     console.log(created);
// })  

// models.Hexun_usdcnh.create({
//     timestamp : '1467331200000',
//     value : 11111,
//     date : new Date(1467331200000)
// });