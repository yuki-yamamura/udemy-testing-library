import { rest } from 'msw';

const handlers = [
  rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          name: 'Vanilla',
          imagePath: '/images/vanilla.png',
        },
        {
          name: 'Chocolate',
          imagePath: '/images/chocolate.png',
        },
      ]),
    ),
  ),
  rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          name: 'Cherries',
          imagePath: '/images/cherries.png',
        },
        {
          name: 'M&Ms',
          imagePath: '/images/m-and-ms.png',
        },
        {
          name: 'Hot fudge',
          imagePath: '/images/hot-fudge.png',
        },
      ]),
    ),
  ),
];

export default handlers;
