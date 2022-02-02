const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagReturn = await Tag.findAll({
      include: [{
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }]
    });
    res.status(200).json(tagReturn);
  }
  catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagReturn = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagReturn) {
      res.status(404).json({ message: 'There was not a tag associated with that id!' })
    };
    res.status(200).json(tagReturn);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagReturn = await Tag.create(req.body);
    res.status(200).json(tagReturn);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagReturn = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tagReturn) {
      res.status(404).json({ message: 'Could not find an associated tag with that id!' })
    };

    res.status(200).json(tagReturn);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagReturn = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagReturn) {
      res.status(404).json({ message: 'Tag not found, unable to delete!' });
      return;
    }
    res.status(200).json(`Tag was deleted.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
