

export interface IWishListType { 
    wishListId: string;
    wishList: boolean;
    wishListUser: string;
}

export interface IBookTypes {
    _id?: string
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
    userEmail: string | null;
    wishlist?: IWishListType[]
}