export type Product = {
  name: string;
  strength: string;
  use: string;
  description: string;
  type: 'standard' | 'reinforced';
  imageId: string;
};

export const products: Product[] = [
  {
    name: 'M5',
    strength: '5 N/mm²',
    use: 'PCC work, foundation blinding.',
    description: 'A lean concrete mix, ideal for leveling surfaces and non-structural applications where high strength is not a primary requirement.',
    type: 'standard',
    imageId: 'product-standard-lean',
  },
  {
    name: 'M10',
    strength: '10 N/mm²',
    use: 'Mass concrete, leveling courses, non-structural works.',
    description: 'Commonly used for non-structural purposes like patio slabs, pathways, and other light domestic applications.',
    type: 'standard',
    imageId: 'product-standard-patio',
  },
  {
    name: 'M15',
    strength: '15 N/mm²',
    use: 'Pavement kerbs, flooring, and lightweight domestic foundations.',
    description: 'A versatile mix suitable for light-duty foundations, floor blinding, and house floors not containing embedded metal.',
    type: 'standard',
    imageId: 'product-standard-light-foundations',
  },
  {
    name: 'M20',
    strength: '20 N/mm²',
    use: 'Domestic floors and foundations, garage bases.',
    description: 'The most common mix for domestic applications. Perfect for foundations, garage floors, and internal floor slabs.',
    type: 'standard',
    imageId: 'product-standard-foundations',
  },
  {
    name: 'M25',
    strength: '25 N/mm²',
    use: 'All-purpose mix for general engineering and foundations.',
    description: 'A multi-purpose concrete mix, widely used for foundations, slabs, and other general construction projects.',
    type: 'standard',
    imageId: 'product-standard-multipurpose',
  },
  {
    name: 'M30',
    strength: '30 N/mm²',
    use: 'Roadways, reinforced foundations, and areas with heavy traffic.',
    description: 'A strong, durable mix designed for external paving, roadways, and applications requiring higher strength and resistance.',
    type: 'standard',
    imageId: 'product-standard-roadway',
  },
  {
    name: 'M35',
    strength: '35 N/mm²',
    use: 'Commercial structures, reinforced concrete walls, and slabs.',
    description: 'Designed for heavy-duty structural use, including commercial slabs, piling, and reinforced foundations.',
    type: 'standard',
    imageId: 'product-standard-commercial',
  },
  {
    name: 'M40',
    strength: '40 N/mm²',
    use: 'Structural beams, columns, and foundations for high-rise buildings.',
    description: 'A high-strength concrete for major structural elements and projects with stringent engineering requirements.',
    type: 'standard',
    imageId: 'product-standard-structural',
  },
  {
    name: 'M45',
    strength: '45 N/mm²',
    use: 'Pre-stressed concrete, runways, and critical structural elements.',
    description: 'A very high-strength mix used in specialized applications like pre-stressed concrete beams and critical infrastructure.',
    type: 'standard',
    imageId: 'product-standard-prestressed',
  },
  {
    name: 'M50',
    strength: '50 N/mm²',
    use: 'Bridges, dams, and projects requiring extreme durability.',
    description: 'An ultra-high-strength concrete for specialized construction projects that demand maximum durability and performance.',
    type: 'standard',
    imageId: 'product-standard-ultra-high-strength',
  },
  {
    name: 'RC20',
    strength: '20 N/mm²',
    use: 'Reinforced house floors and light-duty structures.',
    description: 'Reinforced concrete mix designed for light structural work where steel reinforcement is present, providing excellent bonding.',
    type: 'reinforced',
    imageId: 'product-reinforced-light',
  },
  {
    name: 'RC30',
    strength: '30 N/mm²',
    use: 'Heavy-duty reinforced foundations and commercial slabs.',
    description: 'A robust reinforced concrete mix for commercial projects, capable of supporting heavy loads and complex structures.',
    type: 'reinforced',
    imageId: 'product-reinforced-heavy',
  },
];
