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

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findOne({where: {id: req.params.id}, include: [Product]});
    if(!singleTag) {
      res.status(400).json({message: 'No Tag found with this ID! '});
    }
    res.status(200).json(singleTag);
  } 
  catch(err){ res.status(500).json(err);}
});

router.post('/', async (req, res) => {
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  }
  catch(err) { res.status(400).json(err); }

});

router.put('/:id', async (req, res) => {
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
