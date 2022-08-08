import { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../data/articles';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  const requestedArticle = data.find((article) => article.id === id);

  requestedArticle
    ? res.status(200).json(requestedArticle)
    : res.status(404).json({ error: 'Not found' });
};