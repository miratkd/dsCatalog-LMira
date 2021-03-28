export type ProductsResponse = {
    content: Product[];
    totalPages: number;
}
export type Product ={
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    date: string;
    categories: Category[];
}

export type Category = {
    id: number;
    name: string;
}
export type CategoriesResponse = {
    content: Category[];
    totalPages: number;
}
export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[];
}
export type Role ={
    id: number;
    authoriry: string;
}
export type UserResponse = {
    content: User[];
    totalPages: number;
}