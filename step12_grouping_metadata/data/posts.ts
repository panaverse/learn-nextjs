export interface Post{
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    image: string;
}

const posts: Post[] = [
    {
        id: 'qWD3Pzce',
        slug: 'dog-of-the-day-the-english-setter',
        title: 'Dog of the day: the English Setter',
        subtitle: 'The English Setter dog breed was named for these dogs\' practice of "setting", or crouching low, when they found birds so hunters could throw their nets over them',
        image: 'https://images.unsplash.com/photo-1605460375648-278bcbd579a6'
    },
    {
        id: 'yI6BK404',
        slug: 'about-rottweiler',
        title: 'About Rottweiler',
        subtitle: "The Rottweiler is a breed of domestic dog, regarded as medium-to-large or large. The dogs were known in German as Rottweiler Metzgerhund, meaning Rottweil butchers' dogs, because their main use was to herd livestock and pull carts laden with butchered meat to market",
        image: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379'
    },
    {
        id: 'VFOyZVyH',
        slug: 'running-free-with-collies',
        title: 'Running free with Collies',
        subtitle: 'Collies form a distinctive type of herding dogs, including many related landraces and standardized breeds. The type originated in Scotland and Northern England. Collies are medium-sized, fairly lightlybuilt dogs, with pointed snouts. Many types have a distinctive white color over the shoulders',
        image: 'https://images.unsplash.com/photo-1517662613602-4b8e02886677'
    }
];

export default posts;


