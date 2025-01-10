export interface clientAddress {
    client_location_id: string;
    client_id: string;
    country: string;
    state: string;
    city: string;
    postcode: string;
    address: string;
}

export interface Client {
    client_id: string;
    company_name: string;
    person_in_charge_name: string;
    person_in_charge_email: string;
    company_email: string;
    contact_number: string;
    alt_contact_number: string;
    industry: string;
    cuisine_type: string;
    addresses: clientAddress[];
    tnc_consent?: boolean,
    is_non_monetary: boolean,
    discount: number;
    ways_to_use: string;
    status: "Active" | "Pending Approval" | "Blacklisted" | "Cancelled";
}

export const dummyClientData: Client[] = [
    {
        client_id: "eb626727-ea74-4de7-87ab-db79039c5042",
        company_name: "Tasty Treats Inc.",
        company_email: "info@tastytreats.com",
        addresses: [
            {
                client_location_id: "loc1",
                client_id: "eb626727-ea74-4de7-87ab-db79039c5042",
                address: "123 Flavor Street",
                city: "Klang",
                postcode: "50000",
                state: "Selangor",
                country: "Malaysia",
            },
        ],
        person_in_charge_name: "John Doe",
        person_in_charge_email: "john.doe@tastytreats.com",
        industry: "Food & Beverage",
        cuisine_type: "Chinese",
        contact_number: "+60123456789",
        alt_contact_number: "+60129876543",
        is_non_monetary: false,
        discount: 0,
        ways_to_use: "idk",
        tnc_consent: true,
        status: "Active"
    },
    {
        client_id: "1ba79f5d-e465-4287-85fd-c39b19dfcee1",
        company_name: "Souvlaki Haven",
        company_email: "contact@souvlakihaven.com",
        addresses: [
            {
                client_location_id: "loc2",
                client_id: "1ba79f5d-e465-4287-85fd-c39b19dfcee1",
                address: "56 Mediterranean Lane",
                city: "Athens",
                postcode: "10552",
                state: "Attica",
                country: "Greece",
            },
        ],
        person_in_charge_name: "Maria Papadopoulos",
        person_in_charge_email: "maria@souvlakihaven.com",
        industry: "Food & Beverage",
        cuisine_type: "Greek",
        contact_number: "+302101234567",
        alt_contact_number: "+302107654321",
        is_non_monetary: false,
        discount: 0,
        ways_to_use: "idk",
        tnc_consent: true,
        status: "Active"
    },
    {
        client_id: "9d7c1722-18e7-4c99-94ed-a22f41f34e04",
        company_name: "Curry Delight",
        company_email: "hello@currydelight.com",
        addresses: [
            {
                client_location_id: "loc3",
                client_id: "9d7c1722-18e7-4c99-94ed-a22f41f34e04",
                address: "22 Spice Road",
                city: "Mumbai",
                postcode: "400001",
                state: "Maharashtra",
                country: "India",
            },
        ],
        person_in_charge_name: "Rajesh Kapoor",
        person_in_charge_email: "rajesh@currydelight.com",
        industry: "Food & Beverage",
        cuisine_type: "Indian",
        contact_number: "+912223456789",
        alt_contact_number: "+912298765432",
        is_non_monetary: false,
        discount: 0,
        ways_to_use: "idk",
        tnc_consent: true,
        status: "Active"
    },
    {
        client_id: "c4ee145b-2781-4070-a00d-2862e19c2a4a",
        company_name: "Pizza Paradise",
        company_email: "info@pizzaparadise.com",
        addresses: [
            {
                client_location_id: "loc4",
                client_id: "c4ee145b-2781-4070-a00d-2862e19c2a4a",
                address: "99 Italian Avenue",
                city: "Rome",
                postcode: "00184",
                state: "Lazio",
                country: "Italy",
            },
        ],
        person_in_charge_name: "Giovanni Rossi",
        person_in_charge_email: "giovanni@pizzaparadise.com",
        industry: "Food & Beverage",
        cuisine_type: "Italian",
        contact_number: "+390612345678",
        alt_contact_number: "+390698765432",
        is_non_monetary: false,
        discount: 0,
        ways_to_use: "idk",
        tnc_consent: true,
        status: "Active"
    },
    {
        client_id: "5b1c7f01-90ae-4fab-9983-60b8cbdddf51",
        company_name: "Sushi World",
        company_email: "contact@sushiworld.com",
        addresses: [
            {
                client_location_id: "loc5",
                client_id: "5b1c7f01-90ae-4fab-9983-60b8cbdddf51",
                address: "88 Sashimi Street",
                city: "Tokyo",
                postcode: "100-0001",
                state: "Tokyo",
                country: "Japan",
            },
        ],
        person_in_charge_name: "Haruto Tanaka",
        person_in_charge_email: "haruto@sushiworld.com",
        industry: "Food & Beverage",
        cuisine_type: "Japanese",
        contact_number: "+81312345678",
        alt_contact_number: "+81387654321",
        is_non_monetary: false,
        discount: 0,
        ways_to_use: "idk",
        tnc_consent: true,
        status: "Active"
    },
];
