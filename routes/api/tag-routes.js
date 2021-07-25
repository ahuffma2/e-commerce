const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({include:[Product]});
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const tagData = await Tag.destroy({
      where: { id: req.params.id}
    });
        
    if(!tagData){
      res.status(400).json({message: 'No Tag with that ID Found'});
      return;
    }

    res.status(200).json(tagData);
  } 
  catch (err) { res.status(500).json(err); }
});

module.exports = router;
