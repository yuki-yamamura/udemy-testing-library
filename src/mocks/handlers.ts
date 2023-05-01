import { rest } from 'msw';

// workaround for loading test
function sleep(ms: number) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
  rest.post('http://localhost:3030/order', async (req, res, ctx) => {
    await sleep(100);

    return res(
      ctx.status(201),
      ctx.json({
        orderNumber: '12345678901',
      }),
    );
  }),
];

export default handlers;
