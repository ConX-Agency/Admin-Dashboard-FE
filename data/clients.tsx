export interface ClientAddress {
    client_location_id: number;
    client_id: number;
    country: string;
    state: string;
    city: string;
    postcode: string;
    address: string;
}

export interface CreateClientAddress {
    client_location_id?: number;
    client_id?: number;
    country: string;
    state: string;
    city: string;
    postcode: string;
    address: string;
}

export interface UpdateClientAddress {
    client_location_id?: number;
    client_id?: number;
    country?: string;
    state?: string;
    city?: string;
    postcode?: string;
    address?: string;
}

export interface Client {
    client_id: number;
    company_name: string;
    person_in_charge_name: string;
    person_in_charge_email: string;
    company_email: string;
    contact_number: string;
    alt_contact_number: string;
    industry: string;
    category: string;
    is_non_monetary: boolean,
    discount: number;
    ways_to_use: string;
    status: "Active" | "Pending Approval" | "Blacklisted" | "Cancelled";
    addresses: ClientAddress[];
}

export interface CreateClient {
    company_name: string;
    person_in_charge_name: string;
    person_in_charge_email: string;
    company_email: string;
    contact_number: string;
    alt_contact_number: string;
    industry: string;
    category: string;
    is_non_monetary: boolean,
    discount: number;
    ways_to_use: string;
    status: "Active" | "Pending Approval" | "Blacklisted" | "Cancelled";
    addresses: CreateClientAddress[];
}

export interface UpdateClient {
    company_name?: string;
    person_in_charge_name?: string;
    person_in_charge_email?: string;
    company_email?: string;
    contact_number?: string;
    alt_contact_number?: string;
    industry?: string;
    category?: string;
    is_non_monetary?: boolean,
    discount?: number;
    ways_to_use?: string;
    status?: "Active" | "Pending Approval" | "Blacklisted" | "Cancelled";
    addresses?: UpdateClientAddress[];
}