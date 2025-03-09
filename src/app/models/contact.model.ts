export interface Contact{
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
}

export interface ContactForCreate{
    name: string;
    phoneNumber: string;
    email: string;
}

export interface ContactForUpdate{
    name: string;
    phoneNumber: string;
    email: string;
}

export interface MetaData {
    CurrentPage: number;
    TotalPages: number;
    PageSize: number;
    TotalCount: number;
    HasPrevious: boolean;
    HasNext: boolean;
}

export interface ContactParameters{
    searchTerm?: string;
    pageNumber?: number;
    pageSize?: number;
}
