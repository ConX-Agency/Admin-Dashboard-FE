export interface clientAddress {
    id?: number;
    address: string;
    city: string;
    postcode: string;
    state: string;
    country: string;
}

export type SubscriptionType = "Free Tier" | "Bronze Tier" | "Silver Tier" | "Gold Tier" | "Premium Tier";

export interface Client {
    client_id: string;
    company_name: string;
    company_email: string;
    company_addresses: clientAddress[];
    pic_name: string;
    pic_email: string;
    industry_type: string;
    food_category: string;
    contact_no: string;
    alt_contact_no: string;
    subscription: SubscriptionType;
}

export const dummyClientData: Client[] = [
    {
        client_id: "eb626727-ea74-4de7-87ab-db79039c5042",
        company_name: "Tasty Treats Inc.",
        company_email: "info@tastytreats.com",
        company_addresses: [
            {
                address: "123 Flavor Street",
                city: "Kuala Lumpur",
                postcode: "50000",
                state: "Selangor",
                country: "Malaysia",
            },
        ],
        pic_name: "John Doe",
        pic_email: "john.doe@tastytreats.com",
        industry_type: "Food & Beverage",
        food_category: "Chinese",
        contact_no: "+60123456789",
        alt_contact_no: "+60129876543",
        subscription: "Free Tier",
    },
    {
        client_id: "1ba79f5d-e465-4287-85fd-c39b19dfcee1",
        company_name: "Souvlaki Haven",
        company_email: "contact@souvlakihaven.com",
        company_addresses: [
            {
                address: "56 Mediterranean Lane",
                city: "Athens",
                postcode: "10552",
                state: "Attica",
                country: "Greece",
            },
        ],
        pic_name: "Maria Papadopoulos",
        pic_email: "maria@souvlakihaven.com",
        industry_type: "Food & Beverage",
        food_category: "Greek",
        contact_no: "+302101234567",
        alt_contact_no: "+302107654321",
        subscription: "Silver Tier",
    },
    {
        client_id: "9d7c1722-18e7-4c99-94ed-a22f41f34e04",
        company_name: "Curry Delight",
        company_email: "hello@currydelight.com",
        company_addresses: [
            {
                address: "22 Spice Road",
                city: "Mumbai",
                postcode: "400001",
                state: "Maharashtra",
                country: "India",
            },
        ],
        pic_name: "Rajesh Kapoor",
        pic_email: "rajesh@currydelight.com",
        industry_type: "Food & Beverage",
        food_category: "Indian",
        contact_no: "+912223456789",
        alt_contact_no: "+912298765432",
        subscription: "Bronze Tier",
    },
    {
        client_id: "c4ee145b-2781-4070-a00d-2862e19c2a4a",
        company_name: "Pizza Paradise",
        company_email: "info@pizzaparadise.com",
        company_addresses: [
            {
                address: "99 Italian Avenue",
                city: "Rome",
                postcode: "00184",
                state: "Lazio",
                country: "Italy",
            },
        ],
        pic_name: "Giovanni Rossi",
        pic_email: "giovanni@pizzaparadise.com",
        industry_type: "Food & Beverage",
        food_category: "Italian",
        contact_no: "+390612345678",
        alt_contact_no: "+390698765432",
        subscription: "Gold Tier",
    },
    {
        client_id: "5b1c7f01-90ae-4fab-9983-60b8cbdddf51",
        company_name: "Sushi World",
        company_email: "contact@sushiworld.com",
        company_addresses: [
            {
                address: "88 Sashimi Street",
                city: "Tokyo",
                postcode: "100-0001",
                state: "Tokyo",
                country: "Japan",
            },
        ],
        pic_name: "Haruto Tanaka",
        pic_email: "haruto@sushiworld.com",
        industry_type: "Food & Beverage",
        food_category: "Japanese",
        contact_no: "+81312345678",
        alt_contact_no: "+81387654321",
        subscription: "Free Tier",
    },
    {
        client_id: "eb626727-ea74-4de7-87ab-db79039c5042",
        company_name: "Tasty Treats Inc.",
        company_email: "info@tastytreats.com",
        company_addresses: [
            {
                address: "123 Flavor Street",
                city: "Kuala Lumpur",
                postcode: "50000",
                state: "Selangor",
                country: "Malaysia",
            },
        ],
        pic_name: "John Doe",
        pic_email: "john.doe@tastytreats.com",
        industry_type: "Food & Beverage",
        food_category: "Chinese",
        contact_no: "+60123456789",
        alt_contact_no: "+60129876543",
        subscription: "Gold Tier",
    },
    {
        client_id: "1ba79f5d-e465-4287-85fd-c39b19dfcee1",
        company_name: "Souvlaki Haven",
        company_email: "contact@souvlakihaven.com",
        company_addresses: [
            {
                address: "56 Mediterranean Lane",
                city: "Athens",
                postcode: "10552",
                state: "Attica",
                country: "Greece",
            },
        ],
        pic_name: "Maria Papadopoulos",
        pic_email: "maria@souvlakihaven.com",
        industry_type: "Food & Beverage",
        food_category: "Greek",
        contact_no: "+302101234567",
        alt_contact_no: "+302107654321",
        subscription: "Silver Tier",
    },
    {
        client_id: "9d7c1722-18e7-4c99-94ed-a22f41f34e04",
        company_name: "Curry Delight",
        company_email: "hello@currydelight.com",
        company_addresses: [
            {
                address: "22 Spice Road",
                city: "Mumbai",
                postcode: "400001",
                state: "Maharashtra",
                country: "India",
            },
        ],
        pic_name: "Rajesh Kapoor",
        pic_email: "rajesh@currydelight.com",
        industry_type: "Food & Beverage",
        food_category: "Indian",
        contact_no: "+912223456789",
        alt_contact_no: "+912298765432",
        subscription: "Bronze Tier",
    },
    {
        client_id: "c4ee145b-2781-4070-a00d-2862e19c2a4a",
        company_name: "Pizza Paradise",
        company_email: "info@pizzaparadise.com",
        company_addresses: [
            {
                address: "99 Italian Avenue",
                city: "Rome",
                postcode: "00184",
                state: "Lazio",
                country: "Italy",
            },
        ],
        pic_name: "Giovanni Rossi",
        pic_email: "giovanni@pizzaparadise.com",
        industry_type: "Food & Beverage",
        food_category: "Italian",
        contact_no: "+390612345678",
        alt_contact_no: "+390698765432",
        subscription: "Gold Tier",
    },
    {
        client_id: "5b1c7f01-90ae-4fab-9983-60b8cbdddf51",
        company_name: "Sushi World",
        company_email: "contact@sushiworld.com",
        company_addresses: [
            {
                address: "88 Sashimi Street",
                city: "Tokyo",
                postcode: "100-0001",
                state: "Tokyo",
                country: "Japan",
            },
        ],
        pic_name: "Haruto Tanaka",
        pic_email: "haruto@sushiworld.com",
        industry_type: "Food & Beverage",
        food_category: "Japanese",
        contact_no: "+81312345678",
        alt_contact_no: "+81387654321",
        subscription: "Premium Tier",
    }
]