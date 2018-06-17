import {
  Router,
} from 'express';

import CommonRoute from '../utils/commonRoute';

import {
  responseResult,
  responseErrors,
  responseBadReq,
} from '../utils/response';

const Sequelize = require('sequelize');
const {
  Child,
  Worker,
  Camp,
} = require('../db');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const {
      p
    } = req.query;
    const {
      rows: data,
      count
    } = await Child.findAndCountAll({
      include: [{
        model: Worker,
        as: 'Parent',
        include: [{
          model: Camp,
         }]
      }],
      limit: 6,
      offset: 6 * (p - 1 || 0),
      order: [
        ['createdAt', 'DESC']
      ]
    });
    const newData = data.map(row => ({
          ...row.toJSON(),
          Camp: row.Parent && row.Parent.Camp,
        })); 
    responseResult(res)({
      data: newData,
      count
    });
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      responseBadReq(res)(err);
    } else {
      responseErrors(res)(err);
    }
  }
});

// router.get('/search', async (req, res) => {
//   try {
//     const {
//       Op,
//     } = Sequelize;
//     const {
//       name,
//       id,
//       camp_name: campName,
//       parent_name: parentName,
//       p,
//     } = req.query;
//     const {
//       rows: data,
//       count,
//     } = await Child.findAndCountAll({
//       where: {
//         name: {
//           [Op.like]: `%${name}%`,
//         },
//       },
//       limit: 6,
//       offset: 6 * (p - 1 || 0),
//       order: [
//         ['createdAt', 'DESC'],
//       ],
//     });

//     responseResult(res)({
//       data,
//       count,
//     });
    // if (id) {
    //   const data = await Child.findById(id);

    //   responseResult(res)({
    //     data: [data],
    //     count: 1,
    //   });
    // } else if (parentName) {
    //   const {
    //     rows: data,
    //     count,
    //   } = await Child.findAndCountAll({
    //     include: [{
    //       model: Worker,
    //       as: 'Parent',
    //       required: true,
    //       where: {
    //         name: {
    //           [Op.like]: `%${parentName}%`,
    //         },
    //       },
    //     }],
    //     limit: 6,
    //     offset: 6 * (p - 1 || 0),
    //     order: [
    //       ['createdAt', 'DESC'],
    //     ],
    //   });
    //   const newData = data.map(row => ({
    //     ...row.toJSON(),
    //     parent_name: row.Parent.name,
    //   }));
    //   responseResult(res)({
    //     data: newData,
    //     count,
    //   });
    // } else if (campName) {
    //   const {
    //     rows: data,
    //     count,
    //   } = await Child.findAndCountAll({
    //     include: [{
    //       model: Worker,
    //       as: 'Parent',
    //       required: true,
    //       attributes: ['name'],
    //       include: [{
    //         model: Camp,
    //         required: true,
    //         where: {
    //           name: {
    //             [Op.like]: `%${campName}%`,
    //           },
    //         },
    //       }],
    //     }],
    //     limit: 6,
    //     offset: 6 * (p - 1 || 0),
    //     order: [
    //       ['createdAt', 'DESC'],
    //     ],
    //   });
    //   const newData = data.map(row => ({
    //     ...row.toJSON(),
    //     camp_name: row.Parent.Camp.name,
    //   }));

    //   responseResult(res)({
    //     data: newData,
    //     count,
    //   });
    // } else {
    //   const {
    //     rows: data,
    //     count,
    //   } = await Child.findAndCountAll({
    //     where: {
    //       name: {
    //         [Op.like]: `%${name}%`,
    //       },
    //     },
    //     limit: 6,
    //     offset: 6 * (p - 1 || 0),
    //     order: [
    //       ['createdAt', 'DESC'],
    //     ],
    //   });

    //   responseResult(res)({
    //     data,
    //     count,
    //   });
    // };
//   } catch (err) {
//     if (err instanceof Sequelize.ValidationError) {
//       responseBadReq(res)(err);
//     } else {
//       responseErrors(res)(err);
//     }
//   }
// });

router.get('/', CommonRoute.list(Child));
router.get('/:id', CommonRoute.get(Child));
router.put('/:id', CommonRoute.put(Child));
router.post('/', CommonRoute.post(Child));

export default router;