const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: Product
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const tagData = await Tag.findByPk(id);
    if (!tagData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id,
      },
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }

  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const tagData = await Tag.destroy({
      where: {
        id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
