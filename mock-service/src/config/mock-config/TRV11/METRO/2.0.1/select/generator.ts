const getRandomItemsWithQuantities = (items: any): any => {
	// Shuffle the array to select random items
	const shuffledItems = items.sort(() => Math.random() - 0.5);

	// Determine a random number of items to pick
	const randomItemCount = Math.floor(Math.random() * items.length) + 1;

	// Pick a random subset of items
	const selectedItems = shuffledItems.slice(0, randomItemCount);

	// Assign random quantities within the minimum and maximum range
	return selectedItems.map((item: any) => {
		const min = item.quantity.minimum.count;
		const max = item.quantity.maximum.count;

		return {
			id: item.id,
			quantity: {
				selected: {
					count: Math.floor(Math.random() * (max - min + 1)) + min, // Random number between min and max (inclusive)
				},
			},
		};
	});
};

const transformToItemFormat = (items: any[]): any => {
	try {
		return items.map((item) => ({
			id: item.id,
			quantity: {
				maximum: {
					count: item.quantity.maximum.count,
				},
				minimum: {
					count: item.quantity.minimum.count,
				},
			},
		}));
	} catch (e: any) {
		console.error(e.message);
	}
};

export async function selectGenerator(existingPayload: any, sessionData: any) {
	const items = sessionData?.items.length>0 ? sessionData?.items : staticItemsArray;
	const items_min_max = transformToItemFormat(items);
	if(items_min_max?.length>0){
	const chosen_items = getRandomItemsWithQuantities(items_min_max);
	sessionData.selected_ids = Array.isArray(sessionData.selected_ids)
		? sessionData.selected_ids
		: [sessionData.selected_ids || "I1"];
	const items_chosen = chosen_items;
	
	 if(items_chosen){
		existingPayload.message.order.items = items_chosen;
	}
}
	
	if(sessionData.provider_id){
		existingPayload.message.order.provider.id = sessionData.provider_id
	  }
	return existingPayload;
}

 const staticItemsArray = [
	{
	  id: "I1",
	  category_ids: ["C1"],
	  descriptor: {
		name: "Single Journey Ticket",
		code: "SJT"
	  },
	  price: {
		currency: "INR",
		value: "60"
	  },
	  quantity: {
		maximum: { count: 6 },
		minimum: { count: 1 }
	  },
	  fulfillment_ids: ["F1"],
	  time: {
		label: "Validity",
		duration: "P2D",
		timestamp: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString()
	  }
	},
	{
	  id: "I2",
	  category_ids: ["C1"],
	  descriptor: {
		name: "Round Journey Ticket",
		code: "RJT"
	  },
	  price: {
		currency: "INR",
		value: "110"
	  },
	  quantity: {
		maximum: { count: 6 },
		minimum: { count: 1 }
	  },
	  fulfillment_ids: ["F1"],
	  time: {
		label: "Validity",
		duration: "P2D",
		timestamp: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString()
	  }
	}
  ];
  