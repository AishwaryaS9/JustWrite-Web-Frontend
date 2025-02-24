export type UserToken = string;

export interface PostBody {
    content: string;
    author: string;
}

export interface User {
    _id: string;
    avatar: string;
    name: string;
    verified: boolean;
}

export interface Category {
    _id: string;
    title: string;
}

export interface Posts {
    _id: string;
    title: string;
    caption: string;
    slug: string;
    body: PostBody;
    user: User;
    tags: string[];
    categories: Category[];
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
    photo: string;
    id: string;
}

export interface EditPost {
    _id: string;
    title: string;
    caption: string;
    slug: string;
    body: PostBody;
    user: User;
    tags: string[];
    categories: Category[];
    isFeatured: boolean;
    createdAt: string | Date | null;
    updatedAt: string | Date | null;
    photo: string;
    id: string;
}

export interface PostCardProps {
    title: string;
    body: string;
    photo: string;
    author: string;
    slug: string;
    categories: Category[];
    postedDate: string | Date;
}

export interface RouterQuery {
    slug?: string | string[] | null;
}

export interface Comment {
    id: string;
    desc: string;
    createdAt: string;
    user: { name: string; avatar?: string; _id: string };
}

export interface RecommendedPost {
    _id: string;
    title: string;
    caption: string;
    slug: string;
    body: PostBody;
    user: User;
    tags: string[];
    categories: Category[];
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
    photo: string;
    id: string;
}

export interface FormData {
    title: string;
    caption: string;
    content: string;
    user: string;
    category: string[];
}

export interface FormDataPost {
    title: string;
    caption: string;
    content: string;
    user: string;
    category: string;
    _id?: string;
}

export interface SinglePost {
    _id: string,
    title: string,
    caption: string,
    slug: string,
    body: PostBody,
    user: User,
    tags: string[],
    categories: Category[];
    isFeatured: boolean,
    createdAt: string | Date | null;
    updatedAt: string | Date | null;
    photo: string;
    comments: Comment[],
    id: string;
}

export interface UserProfileDetails {
    data: {
        _id: string,
        avatar: string,
        name: string,
        email: string,
        verified: boolean,
        admin: boolean,
    }

}

export interface ProfileDetails {
 
        _id: string,
        avatar: string,
        name: string,
        email: string,
        verified: boolean,
        admin: boolean,
   
}

export interface Profile {
    data: {
        _id: string,
        avatar: string,
        name: string,
        email: string,
        verified: boolean,
        admin: boolean,
    }

}

export interface ForgotPasswordResponse {
    success: boolean;
    message: string;
}