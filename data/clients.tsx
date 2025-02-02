export interface clientAddress {
    clients_location_id: string;
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
    category: string; //previously cuisine type.
    addresses: clientAddress[];
    tnc_consent?: boolean,
    is_non_monetary: boolean,
    discount: number;
    ways_to_use: string;
    status: "Active" | "Pending Approval" | "Blacklisted" | "Cancelled";
}

export const dummyClientAddresses: clientAddress[] = [
    {
        clients_location_id: "CL001",
        client_id: "C001",
        address: "123 Flavor Street",
        city: "Klang",
        postcode: "50000",
        state: "Selangor",
        country: "Malaysia",
    },
    {
        clients_location_id: "CL006",
        client_id: "C001",
        address: "123 Flavor Street",
        city: "Klang",
        postcode: "50000",
        state: "Selangor",
        country: "Malaysia",
    },
    {
        clients_location_id: "CL007",
        client_id: "C001",
        address: "123 Flavor Street",
        city: "Klang",
        postcode: "50000",
        state: "Selangor",
        country: "Malaysia",
    },
    {
        clients_location_id: "CL002",
        client_id: "C002",
        address: "56 Mediterranean Lane",
        city: "Athens",
        postcode: "10552",
        state: "Attica",
        country: "Greece",
    },
    {
        clients_location_id: "CL003",
        client_id: "C003",
        address: "22 Spice Road",
        city: "Mumbai",
        postcode: "400001",
        state: "Maharashtra",
        country: "India",
    },
    {
        clients_location_id: "CL004",
        client_id: "C004",
        address: "99 Italian Avenue",
        city: "Rome",
        postcode: "00184",
        state: "Lazio",
        country: "Italy",
    },
    {
        clients_location_id: "CL005",
        client_id: "C005",
        address: "88 Sashimi Street",
        city: "Tokyo",
        postcode: "100-0001",
        state: "Tokyo",
        country: "Japan",
    },
];

export const dummyClientData: Client[] = [
    {
        client_id: "CL001",
        company_name: "Tasty Treats Inc.",
        company_email: "info@tastytreats.com",
        addresses: dummyClientAddresses.filter(address => address.client_id === "C001"),
        person_in_charge_name: "John Doe",
        person_in_charge_email: "john.doe@tastytreats.com",
        industry: "Food & Beverage",
        category: "Chinese",
        contact_number: "+60123456789",
        alt_contact_number: "+60129876543",
        is_non_monetary: false,
        discount: 0,
        ways_to_use: "idk",
        tnc_consent: true,
        status: "Active"
    },
    {
        client_id: "CL002",
        company_name: "Souvlaki Haven",
        company_email: "contact@souvlakihaven.com",
        addresses: dummyClientAddresses.filter(address => address.client_id === "C002"),
        person_in_charge_name: "Maria Papadopoulos",
        person_in_charge_email: "maria@souvlakihaven.com",
        industry: "Food & Beverage",
        category: "Greek",
        contact_number: "+302101234567",
        alt_contact_number: "+302107654321",
        is_non_monetary: false,
        discount: 0,
        ways_to_use: "idk",
        tnc_consent: true,
        status: "Active"
    },
    {
        client_id: "CL003",
        company_name: "Curry Delight",
        company_email: "hello@currydelight.com",
        addresses: dummyClientAddresses.filter(address => address.client_id === "C003"),
        person_in_charge_name: "Rajesh Kapoor",
        person_in_charge_email: "rajesh@currydelight.com",
        industry: "Food & Beverage",
        category: "Indian",
        contact_number: "+912223456789",
        alt_contact_number: "+912298765432",
        is_non_monetary: false,
        discount: 0,
        ways_to_use: "idk",
        tnc_consent: true,
        status: "Active"
    },
    {
        client_id: "CL004",
        company_name: "Pizza Paradise",
        company_email: "info@pizzaparadise.com",
        addresses: dummyClientAddresses.filter(address => address.client_id === "C004"),
        person_in_charge_name: "Giovanni Rossi",
        person_in_charge_email: "giovanni@pizzaparadise.com",
        industry: "Food & Beverage",
        category: "Italian",
        contact_number: "+390612345678",
        alt_contact_number: "+390698765432",
        is_non_monetary: false,
        discount: 0,
        ways_to_use: "idk",
        tnc_consent: true,
        status: "Active"
    },
    {
        client_id: "CL005",
        company_name: "Sushi World",
        company_email: "contact@sushiworld.com",
        addresses: dummyClientAddresses.filter(address => address.client_id === "C005"),
        person_in_charge_name: "Haruto Tanaka",
        person_in_charge_email: "haruto@sushiworld.com",
        industry: "Food & Beverage",
        category: "Japanese",
        contact_number: "+81312345678",
        alt_contact_number: "+81387654321",
        is_non_monetary: false,
        discount: 0,
        ways_to_use: "idk",
        tnc_consent: true,
        status: "Active"
    },
];

export function getCompanyNameById(clientId: string): string | undefined {
    const client = dummyClientData.find(client => client.client_id === clientId);
    return client?.company_name;
}

export function getClientAddressesById(clientId: string): clientAddress[] | undefined {
    const client = dummyClientData.find(client => client.client_id === clientId);
    return client?.addresses as clientAddress[];
}

export function getClientAddressesByClientLocationId(clientLocationId: string): clientAddress[] {
    const matchingAddresses: clientAddress[] = [];
    for (const client of dummyClientData) {
        const addresses = client.addresses.filter(address => address.clients_location_id === clientLocationId);
        matchingAddresses.push(...addresses);
    }
    return matchingAddresses;
}

export function getAllCompanyNamesAndIds(): { client_id: string, company_name: string }[] {
    return dummyClientData.map(client => ({ client_id: client.client_id, company_name: client.company_name }));
}
