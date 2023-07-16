

export interface IWishListType { 
    wishListId: string;
    wishList: boolean;
    wishListUser: string;
}

export interface IReadType { 
    ReadBookId: string;
    isRead: boolean;
    readUser: string;
    isComplete: string;
} 

export interface IBookTypes {
    _id?: string
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
    userEmail: string | null;
    wishlist?: IWishListType[];
    addRead?: IReadType[]
}