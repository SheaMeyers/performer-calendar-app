import { rest } from "msw";

export const handlers = [
  rest.get('https://app.ticketmaster.com/discovery/v2/', (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            id: 2,
            name: 'Korn',
            url: "http://test.com",
            dates: {
              start: {
                dateTime: "2023-01-02T02:02:02",
              }
            }
          },
        ],
      })
    );
  }),
];
