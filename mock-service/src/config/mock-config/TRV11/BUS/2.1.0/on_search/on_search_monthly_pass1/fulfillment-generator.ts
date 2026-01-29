const exampleFullfillment = {
	fulfillments: [
		{
			id: "F1",
			type: "ROUTE",
			stops: [
				{
					type: "START",
					instructions: {
						name: "Stop 1",
					},
					location: {
						descriptor: {
							code: "mock_station_011_A",
						},
						gps: "28.744676, 77.138332",
					},
					id: "1",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 2",
					},
					location: {
						descriptor: {
							code: "ROHINI_SECTOR18,19",
						},
						gps: "28.738416, 77.139132",
					},
					id: "2",
					parent_stop_id: "1",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 3",
					},
					location: {
						descriptor: {
							code: "HAIDERPUR_BADLI_MOR",
						},
						gps: "28.738876, 77.119932",
					},
					id: "3",
					parent_stop_id: "2",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 4",
					},
					location: {
						descriptor: {
							code: "JAHANGIRPURI",
						},
						gps: "28.738411, 77.131132",
					},
					id: "4",
					parent_stop_id: "3",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 5",
					},
					location: {
						descriptor: {
							code: "ADARSH_NAGAR",
						},
						gps: "28.738176, 77.139932",
					},
					id: "5",
					parent_stop_id: "4",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 6",
					},
					location: {
						descriptor: {
							code: "AZADPUR",
						},
						gps: "28.738426, 77.139932",
					},
					id: "6",
					parent_stop_id: "5",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 7",
					},
					location: {
						descriptor: {
							code: "MODEL_TOWN",
						},
						gps: "28.718476, 77.129932",
					},
					id: "7",
					parent_stop_id: "6",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 8",
					},
					location: {
						descriptor: {
							code: "GTB_NAGAR",
						},
						gps: "28.738576, 77.139532",
					},
					id: "8",
					parent_stop_id: "7",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 9",
					},
					location: {
						descriptor: {
							code: "VISHWA_VIDYALAYA",
						},
						gps: "28.731406, 77.131032",
					},
					id: "9",
					parent_stop_id: "8",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 10",
					},
					location: {
						descriptor: {
							code: "VIDHAN_SABHA",
						},
						gps: "28.718476, 77.133932",
					},
					id: "10",
					parent_stop_id: "9",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 11",
					},
					location: {
						descriptor: {
							code: "CIVIL_LINES",
						},
						gps: "28.798416, 77.119902",
					},
					id: "11",
					parent_stop_id: "10",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 12",
					},
					location: {
						descriptor: {
							code: "KASHMERE_GATE",
						},
						gps: "28.738426, 77.139922",
					},
					id: "12",
					parent_stop_id: "11",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 13",
					},
					location: {
						descriptor: {
							code: "CHANDNI_CHOWK",
						},
						gps: "28.738446, 77.139942",
					},
					id: "13",
					parent_stop_id: "12",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 14",
					},
					location: {
						descriptor: {
							code: "CHAWRI_BAZAR",
						},
						gps: "28.738477, 77.139937",
					},
					id: "14",
					parent_stop_id: "13",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 15",
					},
					location: {
						descriptor: {
							code: "NEW_DELHI",
						},
						gps: "28.738276, 77.132932",
					},
					id: "15",
					parent_stop_id: "14",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 16",
					},
					location: {
						descriptor: {
							code: "RAJIV_CHOWK",
						},
						gps: "28.738436, 77.139332",
					},
					id: "16",
					parent_stop_id: "15",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 17",
					},
					location: {
						descriptor: {
							code: "PATEL_CHOWK",
						},
						gps: "28.738126, 77.133432",
					},
					id: "17",
					parent_stop_id: "16",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 18",
					},
					location: {
						descriptor: {
							code: "CENTRAL_SECRETARIAT",
						},
						gps: "28.732076, 77.130192",
					},
					id: "18",
					parent_stop_id: "17",
				},
				{
					type: "INTERMEDIATE_STOP",
					instructions: {
						name: "Stop 19",
					},
					location: {
						descriptor: {
							code: "UDYOG_BHAWAN",
						},
						gps: "28.611076, 77.212232",
					},
					id: "19",
					parent_stop_id: "18",
				},
				{
					type: "END",
					instructions: {
						name: "Stop 20",
					},
					location: {
						descriptor: {
							code: "LOK_KALYAN_MARG",
						},
						gps: "28.738176, 77.139132",
					},
					id: "20",
					parent_stop_id: "19",
				}
			],
			vehicle: {
				category: "BUS",
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
					],
				},
			],
		},
	],
};

export function createFullfillment(cityCode: string) {
	const fake = exampleFullfillment.fulfillments;
	let index = 1;
	for (const full of fake) {
		full.stops.forEach((stop: any) => {
			stop.location.descriptor.code = `MOCK_STATION_${index}`;
			index++;
		});
	}
	return { fulfillments: fake };
}
