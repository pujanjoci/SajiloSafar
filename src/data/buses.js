export const buses = [
    {
        id: 1,
        name: "Sajilo Deluxe",
        type: "Luxury Sofa",
        minPrice: 1500,
        maxPrice: 4500,
        totalSeats: 30,
        seatsAvailable: 25,
        amenities: ["wifi", "ac", "toilet", "charging"],
        rating: 4.5,
        company: "Sajilo Safar",
        busNumber: "BA 1 PA 1234",
        rules: {},
        serviceAreas: ["all"],
        description: "Premium luxury bus with sofa seats, serving all major routes",
        seatConfiguration: {
            premiumSeats: [1, 2],           // 2 premium seats in front row
            sofaSeats: [3, 4, 5, 6, 7, 8, 9, 10], // 8 sofa seats (2 rows of 4)
            windowSeats: [1, 4, 5, 8, 9, 12, 13, 16, 17, 20, 21, 24, 25, 28, 29],
            aisleSeats: [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30]
        }
    },
    {
        id: 2,
        name: "Pokhara Express",
        type: "VIP AC",
        minPrice: 1200,
        maxPrice: 1800,
        totalSeats: 35,
        seatsAvailable: 10,
        amenities: ["ac", "charging", "toilet"],
        rating: 4.2,
        company: "Greenline Tours",
        busNumber: "GA 2 KHA 5678",
        rules: {
            allowedDestinations: ['Pokhara']
        },
        serviceAreas: ["Kathmandu-Pokhara", "Pokhara-Kathmandu"],
        description: "Express service between Kathmandu and Pokhara",
        seatConfiguration: {
            premiumSeats: [1, 2],           // 2 premium seats
            sofaSeats: [],                  // No sofa seats
            windowSeats: [1, 4, 5, 8, 9, 12, 13, 16, 17, 20, 21, 24, 25, 28, 29, 32, 33],
            aisleSeats: [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31, 34, 35]
        }
    },
    {
        id: 3,
        name: "Chitwan Safari",
        type: "Tourist Bus",
        minPrice: 1100,
        maxPrice: 1600,
        totalSeats: 40,
        seatsAvailable: 30,
        amenities: ["ac", "toilet"],
        rating: 4.0,
        company: "Jungle Tours",
        busNumber: "CH 3 PA 9012",
        rules: {
            allowedDestinations: ['Chitwan']
        },
        serviceAreas: ["Kathmandu-Chitwan", "Chitwan-Kathmandu", "Pokhara-Chitwan", "Chitwan-Pokhara"],
        description: "Wildlife-themed tourist bus for Chitwan routes",
        seatConfiguration: {
            premiumSeats: [1, 2],           // 2 premium seats
            sofaSeats: [],                  // No sofa seats
            windowSeats: [1, 4, 5, 8, 9, 12, 13, 16, 17, 20, 21, 24, 25, 28, 29, 32, 33, 36, 37, 40],
            aisleSeats: [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31, 34, 35, 38, 39]
        }
    },
    {
        id: 4,
        name: "Night Rider",
        type: "Sleeper",
        minPrice: 2200,
        maxPrice: 6500,
        totalSeats: 30,
        seatsAvailable: 15,
        amenities: ["wifi", "ac", "toilet", "charging"],
        rating: 4.7,
        company: "Eastern Express",
        busNumber: "KK 4 BA 3456",
        rules: {
            allowedTypes: ['overnight']
        },
        serviceAreas: ["Kathmandu-Kakarvitta", "Kakarvitta-Kathmandu", "Kathmandu-Biratnagar", "Biratnagar-Kathmandu"],
        description: "Overnight sleeper bus for long-distance routes",
        seatConfiguration: {
            premiumSeats: [1, 2],           // 2 premium beds
            sofaSeats: [3, 4, 5, 6],        // 4 sofa/converting beds
            windowSeats: [1, 4, 5, 8, 9, 12, 13, 16, 17, 20, 21, 24, 25, 28, 29],
            aisleSeats: [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30]
        }
    },
    {
        id: 5,
        name: "Buddha Express",
        type: "Deluxe",
        minPrice: 1800,
        maxPrice: 3200,
        totalSeats: 32,
        seatsAvailable: 20,
        amenities: ["wifi", "ac", "charging", "toilet"],
        rating: 4.3,
        company: "Buddha Travels",
        busNumber: "LU 5 PA 7890",
        rules: {},
        serviceAreas: ["all"],
        description: "Premium deluxe bus serving all Lumbini and general routes",
        seatConfiguration: {
            premiumSeats: [1, 2],           // 2 premium seats
            sofaSeats: [],                  // No sofa seats
            windowSeats: [1, 4, 5, 8, 9, 12, 13, 16, 17, 20, 21, 24, 25, 28, 29, 32],
            aisleSeats: [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31]
        }
    },
    {
        id: 6,
        name: "Mountain View",
        type: "Semi-Deluxe",
        minPrice: 1300,
        maxPrice: 1800,
        totalSeats: 36,
        seatsAvailable: 28,
        amenities: ["ac", "toilet"],
        rating: 4.1,
        company: "Mountain Express",
        busNumber: "PK 6 KHA 2345",
        rules: {
            allowedDestinations: ['Pokhara']
        },
        serviceAreas: ["Kathmandu-Pokhara", "Pokhara-Kathmandu"],
        description: "Economical semi-deluxe for Pokhara routes",
        seatConfiguration: {
            premiumSeats: [1, 2],           // 2 premium seats
            sofaSeats: [],                  // No sofa seats
            windowSeats: [1, 4, 5, 8, 9, 12, 13, 16, 17, 20, 21, 24, 25, 28, 29, 32, 33, 36],
            aisleSeats: [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31, 34, 35]
        }
    },
    {
        id: 7,
        name: "East-West Special",
        type: "AC Deluxe",
        minPrice: 2000,
        maxPrice: 5500,
        totalSeats: 35,
        seatsAvailable: 12,
        amenities: ["wifi", "ac", "charging", "water bottle"],
        rating: 4.4,
        company: "Eastern Express",
        busNumber: "KO 1 KHA 8899",
        rules: {
            allowedDirections: ['East-West']
        },
        serviceAreas: ["Kathmandu-Kakarvitta", "Kakarvitta-Kathmandu", "Kathmandu-Biratnagar", "Biratnagar-Kathmandu"],
        description: "Special AC deluxe for East-West corridor routes",
        seatConfiguration: {
            premiumSeats: [1, 2, 3, 4],     // 4 premium seats
            sofaSeats: [],                  // No sofa seats
            windowSeats: [1, 4, 5, 8, 9, 12, 13, 16, 17, 20, 21, 24, 25, 28, 29, 32, 33],
            aisleSeats: [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31, 34, 35]
        }
    },
    {
        id: 8,
        name: "Wildlife Express",
        type: "Tourist AC",
        minPrice: 1100,
        maxPrice: 1600,
        totalSeats: 30,
        seatsAvailable: 15,
        amenities: ["ac", "water bottle"],
        rating: 4.2,
        company: "Jungle Tours",
        busNumber: "NA 4 KHA 1122",
        rules: {
            allowedDestinations: ['Chitwan']
        },
        serviceAreas: ["Kathmandu-Chitwan", "Chitwan-Kathmandu", "Pokhara-Chitwan", "Chitwan-Pokhara"],
        description: "AC tourist bus specializing in wildlife destination routes",
        seatConfiguration: {
            premiumSeats: [1, 2],           // 2 premium seats
            sofaSeats: [],                  // No sofa seats
            windowSeats: [1, 4, 5, 8, 9, 12, 13, 16, 17, 20, 21, 24, 25, 28, 29],
            aisleSeats: [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30]
        }
    },
    {
        id: 9,
        name: "Peace Travel",
        type: "Luxury Sofa",
        minPrice: 1900,
        maxPrice: 3500,
        totalSeats: 28,
        seatsAvailable: 20,
        amenities: ["wifi", "ac", "toilet", "dinner stop", "blanket"],
        rating: 4.6,
        company: "Buddha Travels",
        busNumber: "LU 2 KHA 3344",
        rules: {},
        serviceAreas: ["all"],
        description: "Luxury sofa bus with premium amenities for all routes",
        seatConfiguration: {
            premiumSeats: [1, 2],           // 2 premium seats
            sofaSeats: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // 10 sofa seats
            windowSeats: [1, 4, 5, 8, 9, 12, 13, 16, 17, 20, 21, 24, 25, 28],
            aisleSeats: [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27]
        }
    },
    {
        id: 10,
        name: "Kathmandu Express",
        type: "Super Deluxe",
        minPrice: 1850,
        maxPrice: 4500,
        totalSeats: 32,
        seatsAvailable: 25,
        amenities: ["wifi", "ac", "charging"],
        rating: 4.5,
        company: "Sajilo Safar",
        busNumber: "BA 5 KHA 5566",
        rules: {
            allowedDestinations: ['Kathmandu']
        },
        serviceAreas: [
            "Pokhara-Kathmandu",
            "Chitwan-Kathmandu",
            "Kakarvitta-Kathmandu",
            "Lumbini-Kathmandu",
            "Janakpur-Kathmandu",
            "Biratnagar-Kathmandu",
            "Butwal-Kathmandu"
        ],
        description: "Super deluxe bus serving all routes to Kathmandu",
        seatConfiguration: {
            premiumSeats: [1, 2, 3, 4],     // 4 premium seats
            sofaSeats: [],                  // No sofa seats
            windowSeats: [1, 4, 5, 8, 9, 12, 13, 16, 17, 20, 21, 24, 25, 28, 29, 32],
            aisleSeats: [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31]
        }
    }
];

// Helper function to calculate price for a specific route
export const calculateRoutePrice = (bus, routeFrom, routeTo) => {
    const routeKey = `${routeFrom}-${routeTo}`;
    const reverseRouteKey = `${routeTo}-${routeFrom}`;

    // Check if bus serves this route
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

    if (config.premiumSeats && config.premiumSeats.includes(seatNumber)) {
        return 'premium';
    }

    if (config.sofaSeats && config.sofaSeats.includes(seatNumber)) {
        return 'sofa';
    }

    return 'standard';
};

// Route information for display
export const routes = [
    { id: 1, from: "Kathmandu", to: "Pokhara", isPopular: true, type: 'standard', direction: 'Center-West', region: 'Hilly' },
    { id: 2, from: "Kathmandu", to: "Chitwan", isPopular: true, type: 'standard', direction: 'Center-South', region: 'Terai' },
    { id: 3, from: "Kathmandu", to: "Kakarvitta", isPopular: false, type: 'overnight', direction: 'East-West', region: 'Terai' },
    { id: 4, from: "Pokhara", to: "Kathmandu", isPopular: true, type: 'standard', direction: 'West-Center', region: 'Hilly' },
    { id: 5, from: "Chitwan", to: "Kathmandu", isPopular: false, type: 'standard', direction: 'South-Center', region: 'Hilly' },
    { id: 6, from: "Kakarvitta", to: "Kathmandu", isPopular: false, type: 'overnight', direction: 'East-West', region: 'Hilly' },
    { id: 7, from: "Kathmandu", to: "Lumbini", isPopular: true, type: 'standard', direction: 'Center-South', region: 'Terai' },
    { id: 8, from: "Lumbini", to: "Kathmandu", isPopular: false, type: 'standard', direction: 'South-Center', region: 'Hilly' },
    { id: 9, from: "Kathmandu", to: "Janakpur", isPopular: false, type: 'standard', direction: 'Center-South', region: 'Terai' },
    { id: 10, from: "Janakpur", to: "Kathmandu", isPopular: false, type: 'standard', direction: 'South-Center', region: 'Hilly' },
    { id: 11, from: "Pokhara", to: "Chitwan", isPopular: true, type: 'standard', direction: 'West-South', region: 'Terai' },
    { id: 12, from: "Chitwan", to: "Pokhara", isPopular: false, type: 'standard', direction: 'South-West', region: 'Hilly' },
    { id: 13, from: "Kathmandu", to: "Biratnagar", isPopular: false, type: 'overnight', direction: 'East-West', region: 'Terai' },
    { id: 14, from: "Biratnagar", to: "Kathmandu", isPopular: false, type: 'overnight', direction: 'East-West', region: 'Hilly' },
    { id: 15, from: "Kathmandu", to: "Butwal", isPopular: false, type: 'standard', direction: 'Center-West', region: 'Terai' },
    { id: 16, from: "Butwal", to: "Kathmandu", isPopular: false, type: 'standard', direction: 'West-Center', region: 'Hilly' }
];