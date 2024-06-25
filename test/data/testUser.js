const testData = {
    testUsers: [
        {
            _id: "60c72b2f5f1b2c001c8d4a9a",
            email: "user1@example.com",
            favouriteLocations: [
                { location: "New York" },
                { location: "London" },
            ],
            password: "$2b$10$eTX4UMTwblS6ac1Q6iqJeOLTYzm0lxcyJthing2fP21YPDtFI/q7y", // hashed password
        },
        {
            _id: "60c72b2f5f1b2c001c8d4a9b",
            email: "user2@example.com",
            favouriteLocations: [
                { location: "Tokyo" },
                { location: "Paris" },
            ],
            password: "$2b$10$eTX4UMTwblS6ac1Q6iqJeOLTYzm0lxcyJthing2fP21YPDtFI/q7y", // hashed password
        },
    ],
    newUser: {
        email: "newuser@example.com",
        favouriteLocations: [
            { location: "Berlin" },
        ],
        password: "NewUserPassword1!", // plain password to be hashed
    },
    invalidUser: {
        email: "invaliduser@example.com",
        favouriteLocations: [
            { location: "Invalid City" },
        ],
        password: "short", // plain password that does not meet criteria
    },
};

export default testData;