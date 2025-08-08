export type User = {
    name: string;
    email: string;
    password: string;
    handle: string;
    description: string;
    image: string;
    links: string;
}

export type RegisterForm = Pick<User, 'name' | 'email' | 'handle'> & {
    password: string;
    password_confirmation: string;
}

export type LoginForm = Pick<User, 'email'> & {
    password: string;
}

export type ProfileForm = Pick<User, 'handle' | 'description'>;


export type SocialNetwork = {
    id: number;
    name: string;
    url: string;
    enabled: boolean;
}

export type DevTreeLinks = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>
