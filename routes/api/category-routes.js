const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const allCategories = await Category.findAll();
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {  
  const singleCategory = await Category.findOne({where: {id: req.params.id}, include: [Product]});

  if (!singleCategory) {
    res.status(400).json({message: 'No category found with this ID! '});
  }
    res.status(200).json(singleCategory);
  } 

  catch(err){ res.status(500).json(err);}
});


router.post('/', async (req, res) => {
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }
  catch(err) { res.status(400).json(err); }
});



router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
  const updatedCat = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(updatedCat);
  }
  catch (err) {res.status(500).json(err)}
});

router.delete('/:id', async (req, res) => {
  try{
    const categoryData = await Category.destroy({
      where: { id: req.params.id}
    });
    
    if(!categoryData){
      res.status(400).json({message: 'No Category Found'});
      return;
    }

    res.status(200).json(categoryData);
  } 
  catch (err) { res.status(500).json(err); }
});

module.exports = router;
