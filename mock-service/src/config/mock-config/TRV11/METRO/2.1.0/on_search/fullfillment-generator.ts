export const exampleFullfillment = {
  fulfillments: [
    {
      id: "F1",
      type: "TRIP",
      stops: [
        {
          type: "START",
          location: {
            descriptor: {
              name: "mock_station_1",
              code: "MOCK_STATION_1",
            },
            gps: "28.686576, 77.441632",
          },
          id: "1",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 1",
          },
          location: {
            descriptor: {
              name: "mock_station_2",
              code: "MOCK_STATION_2",
            },
            gps: "28.686176, 77.442632",
          },
          id: "2",
          parent_stop_id: "1",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 2",
          },
          location: {
            descriptor: {
              name: "mock_station_3",
              code: "MOCK_STATION_3",
            },
            gps: "28.181276, 77.442332",
          },
          id: "3",
          parent_stop_id: "2",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 3",
          },
          location: {
            descriptor: {
              name: "mock_station_4",
              code: "MOCK_STATION_4",
            },
            gps: "28.981276, 77.772332",
          },
          id: "4",
          parent_stop_id: "3",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 4",
          },
          location: {
            descriptor: {
              name: "mock_station_5",
              code: "MOCK_STATION_5",
            },
            gps: "28.620976, 77.046732",
          },
          id: "5",
          parent_stop_id: "4",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 5",
          },
          location: {
            descriptor: {
              name: "mock_station_6",
              code: "MOCK_STATION_6",
            },
            gps: "28.120976, 77.946732",
          },
          id: "6",
          parent_stop_id: "5",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 6",
          },
          location: {
            descriptor: {
              name: "mock_station_7",
              code: "MOCK_STATION_7",
            },
            gps: "28.677076, 77.346632",
          },
          id: "7",
          parent_stop_id: "6",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 7",
          },
          location: {
            descriptor: {
              name: "mock_station_8",
              code: "MOCK_STATION_8",
            },
            gps: "28.617076, 77.146632",
          },
          id: "8",
          parent_stop_id: "7",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 8",
          },
          location: {
            descriptor: {
              name: "mock_station_9",
              code: "MOCK_STATION_9",
            },
            gps: "28.917076, 77.146632",
          },
          id: "9",
          parent_stop_id: "8",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 9",
          },
          location: {
            descriptor: {
              name: "mock_station_10",
              code: "MOCK_STATION_10",
            },
            gps: "28.897076, 77.146632",
          },
          id: "10",
          parent_stop_id: "9",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 10",
          },
          location: {
            descriptor: {
              name: "mock_station_11",
              code: "MOCK_STATION_11",
            },
            gps: "28.117076, 77.116632",
          },
          id: "11",
          parent_stop_id: "10",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 11",
          },
          location: {
            descriptor: {
              name: "mock_station_12",
              code: "MOCK_STATION_12",
            },
            gps: "28.127076, 77.416632",
          },
          id: "12",
          parent_stop_id: "11",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 12",
          },
          location: {
            descriptor: {
              name: "mock_station_13",
              code: "MOCK_STATION_13",
            },
            gps: "28.217076, 77.216632",
          },
          id: "13",
          parent_stop_id: "12",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 13",
          },
          location: {
            descriptor: {
              name: "mock_station_14",
              code: "MOCK_STATION_14",
            },
            gps: "28.327076, 77.416632",
          },
          id: "14",
          parent_stop_id: "13",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 14",
          },
          location: {
            descriptor: {
              name: "mock_station_15",
              code: "MOCK_STATION_15",
            },
            gps: "28.427076, 77.446632",
          },
          id: "15",
          parent_stop_id: "14",
        },
        {
          type: "TRANSIT_STOP",
          instructions: {
            name: "Stop 15",
            short_desc: "Please Change here for Yellow Line",
          },
          location: {
            descriptor: {
              name: "mock_station_16",
              code: "MOCK_STATION_16",
            },
            gps: "28.738426, 77.139922",
          },
          id: "16",
          parent_stop_id: "15",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 16",
          },
          location: {
            descriptor: {
              name: "mock_station_17",
              code: "MOCK_STATION_17",
            },
            gps: "28.627076, 77.646632",
          },
          id: "17",
          parent_stop_id: "16",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 17",
          },
          location: {
            descriptor: {
              name: "mock_station_18",
              code: "MOCK_STATION_18",
            },
            gps: "28.727076, 77.746632",
          },
          id: "18",
          parent_stop_id: "17",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 18",
          },
          location: {
            descriptor: {
              name: "mock_station_19",
              code: "MOCK_STATION_19",
            },
            gps: "28.827076, 77.846632",
          },
          id: "19",
          parent_stop_id: "18",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 19",
          },
          location: {
            descriptor: {
              name: "mock_station_20",
              code: "MOCK_STATION_20",
            },
            gps: "28.927076, 77.946632",
          },
          id: "20",
          parent_stop_id: "19",
        },
        {
          type: "INTERMEDIATE_STOP",
          instructions: {
            name: "Stop 20",
          },
          location: {
            descriptor: {
              name: "mock_station_21",
              code: "MOCK_STATION_21",
            },
            gps: "28.217076, 77.496632",
          },
          id: "21",
          parent_stop_id: "20",
        },
        {
          type: "END",
          location: {
            descriptor: {
              name: "mock_station_22",
              code: "MOCK_STATION_22",
            },
            gps: "28.707358, 77.180910",
          },
          id: "22",
          parent_stop_id: "21",
        },
      ],
      vehicle: {
        category: "METRO",
      },
      tags: [
        {
          descriptor: {
            code: "ROUTE_INFO",
          },
          list: [
            {
              descriptor: {
                code: "ROUTE_ID",
              },
              value: "242",
            },
            {
              descriptor: {
                code: "ROUTE_NAME",
              },
              value: "Yellow Line",
            },
          ],
        },
      ],
    },
  ],
};

export function createFullfillment() {
  const fake = exampleFullfillment.fulfillments;
  let index = 1;
  for (const full of fake) {
    full.stops.forEach((stop: any) => {
      stop.location.descriptor.code = `MOCK_STATION_${index}`;
      stop.location.descriptor.name = `MOCK_STATION_${index}`;
      index++;
    });
  }
  return { fulfillments: fake };
}
