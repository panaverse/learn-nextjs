export interface Article {
  id: string;
  title: string;
  body: string;
  author: {
    id: string;
    name: string;
  },
  image: {
    url: string;
    author: string;
  },
}

export const articles: Article[] = [
  {
    id: 'u12w3o0d',
    title: 'Healthy summer melon-carrot soup',
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, felis quis sagittis molestie, mi sem lobortis dui, a sollicitudin nibh erat id ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lorem ante, blandit sit amet ex quis, venenatis vestibulum enim. Mauris finibus ligula ac eros porttitor gravida. Donec luctus, nibh et lobortis lacinia, diam nulla scelerisque est, sagittis tincidunt massa massa id purus. Maecenas convallis, nisi non bibendum molestie, nibh arcu bibendum leo, vel rutrum arcu magna non odio. Vivamus semper ac nisi eget hendrerit. Quisque consectetur velit sit amet est dignissim, eget ultrices velit auctor. Phasellus et nulla vel tortor semper feugiat. Nulla lacinia in enim a mattis. Quisque vitae erat eu velit faucibus aliquam quis at nisl. Praesent ac odio in arcu eleifend sollicitudin.',
    author: {
      id: '93ksj19s',
      name: 'John Doe',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1629032355262-d751086c475d',
      author: 'Karolin Baitinger',
    },
  },
  {
    id: 'v23x4o0l',
    title: 'Vegetarian Burger with Kohlrabi',
    body:
      'Cras placerat rutrum volutpat. Nulla egestas gravida pharetra. Nunc est justo, blandit eu ultricies nec, suscipit at arcu. Etiam rutrum, eros sit amet laoreet convallis, mauris ex interdum ipsum, quis eleifend metus elit at massa. Sed blandit elit a viverra hendrerit. Etiam ut dignissim elit. Sed pretium urna vel augue malesuada, sit amet suscipit lacus tristique. Duis enim neque, rhoncus auctor euismod id, egestas vel lorem. Vestibulum venenatis euismod purus consequat consequat. Ut vulputate massa libero, non bibendum ligula fermentum eu. Suspendisse ultricies fermentum ex auctor ultricies. Cras vel nisl quam. Proin blandit nisi id imperdiet fermentum. Sed aliquet mi quis consequat elementum. Duis varius lorem risus, ut semper nisi pulvinar sed. Suspendisse porttitor elit nec risus interdum faucibus. Ut turpis orci, imperdiet id erat ut, elementum eleifend orci.',
    author: {
      id: '04ktk20u',
      name: 'Jane Doe',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1626414375186-12406f7e95f1',
      author: 'Karolin Baitinger',
    },
  },
  {
    id: 'u16f8o1c',
    title: 'All about jellyfish',
    body:
      'Donec elementum massa eget mauris fermentum sagittis. Ut tincidunt pharetra ex at gravida. Ut ut magna imperdiet lectus tristique maximus. Mauris faucibus, magna vel aliquet hendrerit, ligula dui cursus lectus, eget feugiat ex ligula sed dui. Suspendisse volutpat orci orci, sed mollis nulla placerat ut. Vivamus id tortor efficitur, iaculis mauris eu, convallis metus. Aenean vehicula, nibh et dignissim vulputate, est nibh facilisis tortor, ut sodales felis urna in nisi. Curabitur placerat sapien ipsum, tincidunt fringilla dolor malesuada ut. Vivamus rhoncus, libero et placerat tempor, massa risus viverra felis, et bibendum quam dui sed nibh. Sed in rutrum risus. Nam ut nibh non velit suscipit vehicula. Morbi id felis cursus, aliquet ante et, pretium metus. Pellentesque in dictum velit, non commodo felis. Pellentesque scelerisque sollicitudin tortor, nec sagittis elit eleifend in. Ut lacus metus, tempus vitae turpis id, vestibulum aliquam felis. Donec sit amet suscipit elit, eget volutpat arcu.',
    author: {
      id: '93ks3j2s',
      name: 'Mitch Shore',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1628944662511-d8a3909ae13d',
      author: 'Diane Picchiottino',
    },
  },
  {
    id: 'e23w3k0d',
    title: 'Climate change',
    body:
      'Nam at dui a eros aliquam pharetra vitae volutpat purus. Donec vestibulum eros dui, quis pellentesque eros convallis et. Phasellus quis pulvinar lectus. Praesent at lacus libero. Pellentesque pulvinar tempor est ac euismod. Vivamus volutpat cursus magna vitae aliquet. Fusce imperdiet vehicula tortor, a ornare est vehicula ultrices. Vestibulum faucibus nibh ut ex accumsan finibus sit amet vel lacus. Integer turpis elit, ullamcorper eget consectetur ac, sollicitudin ut nisi. Nullam at urna id erat molestie consectetur et vitae neque. Pellentesque lobortis sollicitudin massa sit amet rutrum. Maecenas venenatis hendrerit massa ut ultricies. Cras tempus metus at mauris tincidunt sollicitudin.',
    author: {
      id: '9dk1215c',
      name: 'Maurice Jennes',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1628777222379-9e0c746e6519',
      author: 'Marc Grove',
    },
  },
  {
    id: 'v81l30sb',
    title: 'The history of pyramids',
    body:
      'Duis vehicula nisl ligula, eu ullamcorper libero luctus ac. Phasellus euismod venenatis erat, eget egestas orci mollis a. Nunc at dui vitae lorem congue scelerisque at convallis lorem. Vivamus in metus non ante iaculis dictum. Duis porta dictum massa at facilisis. Suspendisse potenti. Cras auctor aliquam posuere. Phasellus ultricies velit eget elementum commodo. Fusce et pellentesque enim, ut vehicula nulla. Fusce hendrerit facilisis urna id pellentesque. Donec consectetur porta nibh, ut blandit eros finibus quis. Mauris quis efficitur nibh, iaculis fermentum massa.',
    author: {
      id: '93ksj19s',
      name: 'John Doe',
    },
    image: {
      url: 'https://images.unsplash.com/photo-1560157368-946d9c8f7cb6',
      author: 'Gaurav D Lathiya',
    },
  },
];

export default articles;
