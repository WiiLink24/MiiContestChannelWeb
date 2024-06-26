export interface Mii {
    entry_id: number;
    artisan_id: number;
    initials: string;
    skill: string;
    nickname: string;
    gender: 1 | 2;
    country_id: number;
    mii_data: string;
    likes: number;
    perm_likes: number;
}

export interface Contest {
    contest_id: number;
    has_thumbnail: boolean;
    english_name: string;
    status: string;
    open_time: Date;
    close_time: Date;
    has_souvenir: boolean;
}

export interface Artisan {
    name: string;
    country_id: number;
    wii_number: bigint;
    mii_data: string;
    number_of_posts: any;
    total_likes: number;
    is_master: boolean;
    last_post: Date;
}


