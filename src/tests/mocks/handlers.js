import { rest } from "msw";

export const handlers = [
  rest.get('https://api.seatgeek.com/2/performers', (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
            id: 1,
            name: 'Korn'
        },
      })
    );
  }),

  rest.get('https://api.seatgeek.com/2/events', (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            id: 2,
            datetime_utc: "2020-02-02T02:02:02",
            url: "http://test.com"
          },
        ],
      })
    );
  }),
];
