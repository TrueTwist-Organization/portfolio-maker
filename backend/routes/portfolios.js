const express = require('express');
const {
  listPortfolios,
  getPortfolioForOwner,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getPublicLiveBySlug,
  publishPortfolio,
  unpublishPortfolio,
} = require('../services/portfolios');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/public/:slug', async (req, res) => {
  try {
    const portfolio = await getPublicLiveBySlug(req.params.slug);
    if (!portfolio) {
      return res.status(404).json({ message: 'Live portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const portfolios = await listPortfolios(req.user);
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const portfolio = await createPortfolio(req.user, req.body);
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const portfolio = await getPortfolioForOwner(req.params.id, req.user);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const portfolio = await updatePortfolio(req.params.id, req.user, req.body);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const portfolio = await deletePortfolio(req.params.id, req.user);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:id/publish', protect, async (req, res) => {
  try {
    const { slug } = req.body;
    if (!slug) return res.status(400).json({ message: 'Slug is required for publishing' });

    const portfolio = await publishPortfolio(req.params.id, req.user, slug);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    res.json({ message: 'Successfully published!', portfolio });
  } catch (error) {
    if (error.code === 'SLUG_TAKEN') {
      return res.status(400).json({ message: 'This custom URL is already taken' });
    }
    res.status(500).json({ message: error.message });
  }
});

router.post('/:id/unpublish', protect, async (req, res) => {
  try {
    const portfolio = await unpublishPortfolio(req.params.id, req.user);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    res.json({ message: 'Successfully unpublished!', portfolio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
