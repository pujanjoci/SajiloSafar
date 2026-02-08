// Export empty array as buses are now fetched from API
export const buses = [];

// Helper function to calculate price for a specific route
// Keep this as it's a pure function logic
export const calculateRoutePrice = (bus, routeFrom, routeTo) => {
    const routeKey = `${routeFrom}-${routeTo}`;
    const reverseRouteKey = `${routeTo}-${routeFrom}`;

    // Check if bus serves this route
    // Note: This relies on bus.serviceAreas being an array, which API should provide
    if (!bus.serviceAreas) return null;

    if (bus.serviceAreas.includes("all") ||
        bus.serviceAreas.includes(routeKey) ||
        bus.serviceAreas.includes(reverseRouteKey)) {

        // Route distance mapping for price calculation
        const routeBasePrices = {
            // Short routes (< 200km)
            "Kathmandu-Pokhara": bus.minPrice,
            "Pokhara-Kathmandu": bus.minPrice,
            "Kathmandu-Chitwan": bus.minPrice * 0.9,
            "Chitwan-Kathmandu": bus.minPrice * 0.9,
            "Pokhara-Chitwan": bus.minPrice * 1.1,
            "Chitwan-Pokhara": bus.minPrice * 1.1,

            // Medium routes (200-300km)
            "Kathmandu-Lumbini": bus.minPrice * 1.3,
            "Lumbini-Kathmandu": bus.minPrice * 1.3,
            "Kathmandu-Janakpur": bus.minPrice * 1.25,
            "Janakpur-Kathmandu": bus.minPrice * 1.25,
            "Kathmandu-Butwal": bus.minPrice * 1.2,
            "Butwal-Kathmandu": bus.minPrice * 1.2,

            // Long routes (> 500km)
            "Kathmandu-Kakarvitta": bus.maxPrice,
            "Kakarvitta-Kathmandu": bus.maxPrice,
            "Kathmandu-Biratnagar": bus.maxPrice * 0.95,
            "Biratnagar-Kathmandu": bus.maxPrice * 0.95,
        };

        const price = routeBasePrices[routeKey] || routeBasePrices[reverseRouteKey] || bus.minPrice;
        return Math.round(price);
    }

    return null; // Bus doesn't serve this route
};

// Helper function to get seat type
export const getSeatType = (bus, seatNumber) => {
    if (!bus.seatConfiguration) {
        return 'standard';
    }

    const config = bus.seatConfiguration;

    // Helper to check if number is in array (handles both int and string)
    const includes = (arr, num) => arr && arr.some(x => parseInt(x) === parseInt(num));

    if (config.premiumSeats && includes(config.premiumSeats, seatNumber)) {
        return 'premium';
    }

    if (config.sofaSeats && includes(config.sofaSeats, seatNumber)) {
        return 'sofa';
    }

    return 'standard';
};