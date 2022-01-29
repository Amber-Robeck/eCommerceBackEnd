const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // // be sure to include its associated Products
  //this query shows id categoryname id product name price stock category id
  // Select * from category join product on product.category_id = category.id;
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//   try {
//     const categoryData = await Category.findByPk(req.params.id, {
//       include: [{ model: Product }],
//       attributes: {
//         include: [
//           [
//             sequelize.literal(
//               '(Select * from category where product.category_id = category.id)'
//             ),
//             '',
//           ],
//         ],
//       },
//     });

//     if (!categoryData) {
//       res.status(404).json({ message: 'No categories found with that id!' });
//       return;
//     }

//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
