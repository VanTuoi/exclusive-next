/* eslint-disable @typescript-eslint/no-explicit-any */
import MockAdapter from "axios-mock-adapter";

import { API_URLS } from "~/constants";
import { Product } from "~/types";

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Sony PS5 DualSense Controller",
    price: 49.99,
    description:
      "The PS5 controller offers haptic feedback along with flexible and micro-triggers that put the gaming world at your fingertips.",
    category: "Gaming",
    image: [
      {
        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang.webp",
        alt: "Sony PS5 DualSense Controller",
        colorText: "white",
        colorCode: "#DDDDDD",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Den.webp",
        alt: "Sony PS5 DualSense Controller",
        colorText: "black",
        colorCode: "black",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Xanh.webp",
        alt: "Sony PS5 DualSense Controller",
        colorText: "Blue",
        colorCode: "#00CCFF",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Do.webp",
        alt: "Sony PS5 DualSense Controller",
        colorText: "red",
        colorCode: "#CC0066",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Do-2.webp",
        alt: "Sony PS5 DualSense Controller",
        colorText: "",
        colorCode: "",
        isIllustration: true
      },
      {
        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang-2.webp",
        alt: "Sony PS5 DualSense Controller",
        colorText: "",
        colorCode: "",
        isIllustration: true
      },
      {
        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang-3.webp",
        alt: "Sony PS5 DualSense Controller",
        colorText: "",
        colorCode: "",
        isIllustration: true
      },
      {
        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang-4.webp",
        alt: "Sony PS5 DualSense Controller",
        colorText: "",
        colorCode: "",
        isIllustration: true
      },
      {
        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang-5.webp",
        alt: "Sony PS5 DualSense Controller",
        colorText: "",
        colorCode: "",
        isIllustration: true
      }
    ],
    rating: {
      rate: 5 * Math.random(),
      count: 4.5
    },
    inStock: true,
    promotions: [
      {
        type: "percentage",
        value: 25,
        description: "25%"
      }
    ],
    finalPrice: 37
  },
  {
    id: 2,
    title: "Game console Playstation 5 Pro - PS5",
    price: 999.99,
    description:
      "The PS5 controller offers haptic feedback along with flexible and micro-triggers that put the gaming world at your fingertips.",
    category: "Gaming",
    image: [
      {
        url: "/assets/imgs/products/May-choi-game-Sony-PS5-Pro.webp",
        alt: "Game console Playstation 5 Pro - PS5",
        colorText: "white",
        colorCode: "#DDDDDD",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/May-choi-game-Sony-PS5-Pro.webp",
        alt: "Game console Playstation 5 Pro - PS5",
        colorText: "white",
        colorCode: "#DDDDDD",
        isIllustration: true
      }
    ],
    rating: {
      rate: 5 * Math.random(),
      count: 4.5
    },
    inStock: true,
    promotions: [
      {
        type: "percentage",
        value: 10,
        description: "10%"
      }
    ],
    finalPrice: 899.99
  },
  {
    id: 3,
    title: "Nintendo Switch OLED – Mod Chip",
    price: 499.99,
    description:
      "Nintendo Switch OLED Hack is a version that has been Modded directly into the hardware of the device to be able to download more games from the 3rd party app store completely free. You can download new applications or games completely online without having to copy the game offline like before.",
    category: "Gaming",
    image: [
      {
        url: "/assets/imgs/products/May-choi-game-Nintendo-Switch-OLED-model-NEON-3.webp",
        alt: "Nintendo Switch OLED",
        colorText: "black",
        colorCode: "black",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/May-choi-game-Nintendo-Switch-Neon.webp",
        alt: "Nintendo Switch OLED",
        colorText: "white",
        colorCode: "#DDDDDD",
        isIllustration: true
      },
      {
        url: "/assets/imgs/products/May-choi-game-Nintendo-Switch-OLED-model-NEON-4.webp",
        alt: "Nintendo Switch OLED",
        colorText: "white",
        colorCode: "#DDDDDD",
        isIllustration: true
      }
    ],
    rating: {
      rate: 5 * Math.random(),
      count: 4.5
    },
    inStock: true,
    promotions: [
      {
        type: "percentage",
        value: 10,
        description: "10%"
      }
    ],
    finalPrice: 449.99
  },
  {
    id: 4,
    title: "Lenovo Legion Go 8.8 AMD Ryzen Z1 Extreme",
    price: 699.99,
    description:
      "Lenovo Legion Go 8.8 AMD Ryzen Z1 Extreme 16GB/ 512GB gaming console is the first handheld gaming machine from Lenovo. The machine possesses an extremely powerful configuration from the AMD Ryzen Z1 Extreme chip. Along with that are extremely high-end technologies such as 8.8-inch 144Hz screen, Coldfront cooling technology, ... This promises to be a handheld gaming machine that stirs up the gaming market, in the same segment as ROG Ally, Steam Deck,.",
    category: "Gaming",
    image: [
      {
        url: "/assets/imgs/products/May-choi-game-Lenovo-Legion-Go-8.8-AMD-Ryzen-Z1-Extreme-16GB-512GB.webp",
        alt: "Lenovo Legion Go 8.8",
        colorText: "black",
        colorCode: "black",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/May-choi-game-Lenovo-Legion-Go-8.8-AMD-Ryzen-Z1-Extreme-16GB-512GB-1.webp",
        alt: "Lenovo Legion Go 8.8",
        colorText: "black",
        colorCode: "black",
        isIllustration: true
      },
      {
        url: "/assets/imgs/products/May-choi-game-Lenovo-Legion-Go-8.8-AMD-Ryzen-Z1-Extreme-16GB-512GB-2.webp",
        alt: "Lenovo Legion Go 8.8",
        colorText: "black",
        colorCode: "black",
        isIllustration: true
      },
      {
        url: "/assets/imgs/products/May-choi-game-Lenovo-Legion-Go-8.8-AMD-Ryzen-Z1-Extreme-16GB-512GB-3.webp",
        alt: "Lenovo Legion Go 8.8",
        colorText: "black",
        colorCode: "black",
        isIllustration: true
      },
      {
        url: "/assets/imgs/products/May-choi-game-Lenovo-Legion-Go-8.8-AMD-Ryzen-Z1-Extreme-16GB-512GB-4.webp",
        alt: "Lenovo Legion Go 8.8",
        colorText: "black",
        colorCode: "black",
        isIllustration: true
      },
      {
        url: "/assets/imgs/products/May-choi-game-Lenovo-Legion-Go-8.8-AMD-Ryzen-Z1-Extreme-16GB-512GB-5.webp",
        alt: "Lenovo Legion Go 8.8",
        colorText: "black",
        colorCode: "black",
        isIllustration: true
      }
    ],
    rating: {
      rate: 5 * Math.random(),
      count: 4.5
    },
    inStock: true,
    promotions: [
      {
        type: "percentage",
        value: 10,
        description: "10%"
      }
    ],
    finalPrice: 629.99
  },
  {
    id: 5,
    title: "Sony Playstation VR 2 Virtual Reality Glasses",
    price: 699.99,
    description:
      "Sony Playstation VR 2 virtual reality glasses, also known as SONY PSVR 2, are the next generation of PSVR. Since 2016, when the first version of PSVR glasses was released, until now 2022, Sony has officially announced the next generation with many significant hardware upgrades, with a stylish design like PS5. This is not surprising when PSVR 2 is officially designed for Playstation 5.",
    category: "Gaming",
    image: [
      {
        url: "/assets/imgs/products/Kinh-thuc-te-ao-PSVR2.webp",
        alt: "Sony Playstation VR 2",
        colorText: "white",
        colorCode: "#DDDDDD",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/Kinh-thuc-te-ao-PSVR2-1.webp",
        alt: "Sony Playstation VR 2",
        colorText: "white",
        colorCode: "#DDDDDD",
        isIllustration: true
      }
    ],
    rating: {
      rate: 5 * Math.random(),
      count: 4.5
    },
    inStock: true,
    promotions: [
      {
        type: "percentage",
        value: 10,
        description: "10%"
      }
    ],
    finalPrice: 629.99
  },
  {
    id: 6,
    title: "Xbox Series X console (Microsoft)",
    price: 699.99,
    description:
      "The Xbox Series X is one of the most notable products in the world of gaming consoles in recent years. With a combination of powerful performance, advanced design and groundbreaking features, the Xbox Series X promises to bring users an extremely wonderful gaming experience.",
    category: "Gaming",
    image: [
      {
        url: "/assets/imgs/products/May-choi-game-Xbox-Series-X-1.webp",
        alt: "Xbox Series X console",
        colorText: "black",
        colorCode: "black",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/may-choi-game-xbox-series-x-2tb.webp",
        alt: "Xbox Series X console",
        colorText: "black",
        colorCode: "black",
        isIllustration: true
      },
      {
        url: "/assets/imgs/products/May-choi-game-Xbox-Series-X-2.webp",
        alt: "Xbox Series X console",
        colorText: "black",
        colorCode: "black",
        isIllustration: true
      },
      {
        url: "/assets/imgs/products/May-choi-game-Xbox-Series-X-3.webp",
        alt: "Xbox Series X console",
        colorText: "black",
        colorCode: "black",
        isIllustration: true
      }
    ],
    rating: {
      rate: 5 * Math.random(),
      count: 4.5
    },
    inStock: true,
    promotions: [
      {
        type: "percentage",
        value: 10,
        description: "10%"
      }
    ],
    finalPrice: 629.99
  },
  {
    id: 7,
    title: "Xbox Series X/S/One Wireless Controller",
    price: 699.99,
    description:
      "Xbox Series Wireless Controller – Mineral Camo (Special Edition) is the latest controller model from Microsoft. The version with special colors will be an extremely prominent highlight, in addition, with new upgrades, this will be a controller model that many people trust and choose.",
    category: "Gaming",
    image: [
      {
        url: "/assets/imgs/products/Tay-cam-xbox-series-X-Arctic-camo-1.webp",
        alt: "Xbox Series",
        colorText: "Arctic Camo",
        colorCode: "#DDDDDD",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/Tay-cam-xbox-series-X-Daystrike-Camo-1.webp",
        alt: "Xbox Series",
        colorText: "Daystrike Camo",
        colorCode: "#BB0000",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/Tay-Cam-Xbox-Series-Wireless-Controller-Mineral-Camo-Special-Edition-2.webp",
        alt: "Xbox Series",
        colorText: "Mineral Camo",
        colorCode: "#0099FF",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/Tay-cam-xbox-series-X-Arctic-camo-1.webp",
        alt: "Xbox Series",
        colorText: "Mineral Camo",
        colorCode: "#0099FF",
        isIllustration: true
      },
      {
        url: "/assets/imgs/products/Tay-cam-xbox-series-X-Arctic-camo-2.webp",
        alt: "Xbox Series",
        colorText: "Mineral Camo",
        colorCode: "#0099FF",
        isIllustration: true
      },
      {
        url: "/assets/imgs/products/Tay-cam-xbox-series-X-Daystrike-Camo-1.webp",
        alt: "Xbox Series",
        colorText: "Mineral Camo",
        colorCode: "#0099FF",
        isIllustration: true
      },
      {
        url: "/assets/imgs/products/Tay-cam-xbox-series-X-Daystrike-Camo-2.webp",
        alt: "Xbox Series",
        colorText: "Mineral Camo",
        colorCode: "#0099FF",
        isIllustration: true
      },
      {
        url: "/assets/imgs/products/Tay-Cam-Xbox-Series-Wireless-Controller-Mineral-Camo-Special-Edition-1.webp",
        alt: "Xbox Series",
        colorText: "Mineral Camo",
        colorCode: "#0099FF",
        isIllustration: true
      },
      {
        url: "/assets/imgs/products/Tay-Cam-Xbox-Series-Wireless-Controller-Mineral-Camo-Special-Edition-3.webp",
        alt: "Xbox Series",
        colorText: "Mineral Camo",
        colorCode: "#0099FF",
        isIllustration: true
      }
    ],
    rating: {
      rate: 5 * Math.random(),
      count: 4.5
    },
    inStock: true,
    promotions: [
      {
        type: "percentage",
        value: 10,
        description: "10%"
      }
    ],
    finalPrice: 629.99
  },
  {
    id: 8,
    title: "Sony PS5 DualSense Controller - Midnight Black Edition",
    price: 54.99,
    description:
      "Special edition Midnight Black DualSense controller for PS5 with all the advanced features including haptic feedback and adaptive triggers.",
    category: "Gaming",
    image: [
      {
        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Den.webp",
        alt: "Sony PS5 DualSense Controller - Midnight Black",
        colorText: "Midnight Black",
        colorCode: "#111111",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang-2.webp",
        alt: "Sony PS5 DualSense Controller - Midnight Black",
        colorText: "",
        colorCode: "",
        isIllustration: true
      }
    ],
    rating: {
      rate: 5 * Math.random(),
      count: 4.7
    },
    inStock: true,
    promotions: [
      {
        type: "percentage",
        value: 15,
        description: "15%"
      }
    ],
    finalPrice: 46.74
  },
  {
    id: 9,
    title: "Nintendo Switch OLED - White Edition",
    price: 519.99,
    description:
      "Pure white edition of the Nintendo Switch OLED with mod chip installed, featuring a vibrant 7-inch OLED screen and enhanced audio.",
    category: "Gaming",
    image: [
      {
        url: "/assets/imgs/products/May-choi-game-Nintendo-Switch-Neon.webp",
        alt: "Nintendo Switch OLED White",
        colorText: "White",
        colorCode: "#FFFFFF",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/May-choi-game-Nintendo-Switch-OLED-model-NEON-4.webp",
        alt: "Nintendo Switch OLED White",
        colorText: "",
        colorCode: "",
        isIllustration: true
      }
    ],
    rating: {
      rate: 5 * Math.random(),
      count: 4.6
    },
    inStock: true,
    promotions: [
      {
        type: "percentage",
        value: 5,
        description: "5%"
      }
    ],
    finalPrice: 493.99
  },
  {
    id: 10,
    title: "Xbox Series X Controller - Daystrike Camo Edition",
    price: 69.99,
    description:
      "Special camouflage edition wireless controller for Xbox Series X/S with textured grip and hybrid D-pad.",
    category: "Gaming",
    image: [
      {
        url: "/assets/imgs/products/Tay-cam-xbox-series-X-Daystrike-Camo-1.webp",
        alt: "Xbox Series X Controller - Daystrike Camo",
        colorText: "Daystrike Camo",
        colorCode: "#BB0000",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/Tay-cam-xbox-series-X-Daystrike-Camo-2.webp",
        alt: "Xbox Series X Controller - Daystrike Camo",
        colorText: "",
        colorCode: "",
        isIllustration: true
      }
    ],
    rating: {
      rate: 5 * Math.random(),
      count: 4.8
    },
    inStock: true,
    promotions: [],
    finalPrice: 64.99
  },
  {
    id: 11,
    title: "PS5 DualSense Charging Station",
    price: 29.99,
    description: "Official charging station for up to two PS5 DualSense controllers with LED charging indicators.",
    category: "Gaming",
    image: [
      {
        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang-4.webp",
        alt: "PS5 DualSense Charging Station",
        colorText: "White",
        colorCode: "#FFFFFF",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang-5.webp",
        alt: "PS5 DualSense Charging Station",
        colorText: "",
        colorCode: "",
        isIllustration: true
      }
    ],
    rating: {
      rate: 5 * Math.random(),
      count: 4.3
    },
    inStock: true,
    promotions: [],
    finalPrice: 29.99
  },
  {
    id: 12,
    title: "Lenovo Legion Go Travel Case",
    price: 39.99,
    description:
      "Premium protective case designed specifically for Lenovo Legion Go handheld console with custom compartments.",
    category: "Gaming",
    image: [
      {
        url: "/assets/imgs/products/May-choi-game-Lenovo-Legion-Go-8.8-AMD-Ryzen-Z1-Extreme-16GB-512GB-5.webp",
        alt: "Lenovo Legion Go Travel Case",
        colorText: "Black",
        colorCode: "#000000",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/May-choi-game-Lenovo-Legion-Go-8.8-AMD-Ryzen-Z1-Extreme-16GB-512GB-4.webp",
        alt: "Lenovo Legion Go Travel Case",
        colorText: "",
        colorCode: "",
        isIllustration: true
      }
    ],
    rating: {
      rate: 5 * Math.random(),
      count: 4.2
    },
    inStock: true,
    promotions: [],
    finalPrice: 34.99
  },
  {
    id: 13,
    title: "PSVR 2 Charging Dock",
    price: 49.99,
    description: "Official charging station for PlayStation VR 2 Sense controllers with sleek PS5-inspired design.",
    category: "Gaming",
    image: [
      {
        url: "/assets/imgs/products/Kinh-thuc-te-ao-PSVR2-1.webp",
        alt: "PSVR 2 Charging Dock",
        colorText: "White",
        colorCode: "#FFFFFF",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/Kinh-thuc-te-ao-PSVR2.webp",
        alt: "PSVR 2 Charging Dock",
        colorText: "",
        colorCode: "",
        isIllustration: true
      }
    ],
    rating: {
      rate: 5 * Math.random(),
      count: 4.4
    },
    inStock: true,
    promotions: [
      {
        type: "percentage",
        value: 10,
        description: "10%"
      }
    ],
    finalPrice: 44.99
  },
  {
    id: 14,
    title: "Xbox Series X Vertical Stand",
    price: 24.99,
    description: "Official vertical stand for Xbox Series X console with improved stability and cable management.",
    category: "Gaming",
    image: [
      {
        url: "/assets/imgs/products/May-choi-game-Xbox-Series-X-3.webp",
        alt: "Xbox Series X Vertical Stand",
        colorText: "Black",
        colorCode: "#000000",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/May-choi-game-Xbox-Series-X-2.webp",
        alt: "Xbox Series X Vertical Stand",
        colorText: "",
        colorCode: "",
        isIllustration: true
      }
    ],
    rating: {
      rate: 5 * Math.random(),
      count: 4.1
    },
    inStock: true,
    promotions: [],
    finalPrice: 24.99
  },
  {
    id: 15,
    title: "DualSense Controller - Cosmic Red",
    price: 59.99,
    description:
      "Striking Cosmic Red edition of the PS5 DualSense controller with all the advanced features in vibrant red color.",
    category: "Gaming",
    image: [
      {
        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Do.webp",
        alt: "DualSense Controller - Cosmic Red",
        colorText: "Cosmic Red",
        colorCode: "#CC0066",
        isIllustration: false
      },
      {
        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Do-2.webp",
        alt: "DualSense Controller - Cosmic Red",
        colorText: "",
        colorCode: "",
        isIllustration: true
      }
    ],
    rating: {
      rate: 5 * Math.random(),
      count: 4.9
    },
    inStock: true,
    promotions: [],
    finalPrice: 49.99
  }
];

const filterAndSortProducts = (products: Product[], params: Record<string, any>) => {
  let filteredProducts = [...products];

  if (params.category) {
    const cleanCategory = params.category.replace(/^\//, "");
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === cleanCategory.toLowerCase()
    );
  }

  if (params.name) {
    const searchTerm = params.name.toLowerCase();
    filteredProducts = filteredProducts.filter((product) => product.title.toLowerCase().includes(searchTerm));
  }

  if (params.price_min) {
    const minPrice = Number(params.price_min);
    filteredProducts = filteredProducts.filter((product) => product.finalPrice >= minPrice);
  }

  if (params.price_max) {
    const maxPrice = Number(params.price_max);
    filteredProducts = filteredProducts.filter((product) => product.finalPrice <= maxPrice);
  }

  if (params.rating_filter) {
    const minRating = Number(params.rating_filter);
    filteredProducts = filteredProducts.filter((product) => product.rating.rate >= minRating);
  }

  if (params.exclude) {
    const excludeIds = params.exclude.split(",").map(Number);
    filteredProducts = filteredProducts.filter((product) => !excludeIds.includes(product.id));
  }

  if (params.sort_by) {
    const sortField = params.sort_by;
    const sortOrder = params.order === "desc" ? -1 : 1;

    filteredProducts.sort((a, b) => {
      if (sortField === "price") {
        return (a.finalPrice - b.finalPrice) * sortOrder;
      }
      if (sortField === "name") {
        return a.title.localeCompare(b.title) * sortOrder;
      }

      return 0;
    });
  }

  return filteredProducts;
};

const paginateProducts = (products: Product[], page: number = 1, limit: number = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return products.slice(startIndex, endIndex);
};

export function mockProducts(mock: MockAdapter) {
  mock.onGet(new RegExp(`${API_URLS.PUBLIC_API.PRODUCT_DETAILS}/\\d+$`)).reply((config) => {
    const match = config.url?.match(/\/(\d+)$/);
    const id = match ? parseInt(match[1], 10) : null;

    if (!id) {
      return [404, { success: false, message: "Product not found" }];
    }

    const product = PRODUCTS.find((p) => p.id === id);

    if (!product) {
      return [404, { success: false, message: "Product not found" }];
    }

    return [
      200,
      {
        success: true,
        message: "Get product details successfully",
        data: product
      }
    ];
  });

  mock.onGet(new RegExp(`${API_URLS.PUBLIC_API.PRODUCTS}(\\?.*)?$`)).reply((config) => {
    const url = new URL(config.url!, "http://localhost");
    const params = Object.fromEntries(url.searchParams.entries());

    const page = params.page ? Number(params.page) : 1;
    const limit = params.limit ? Number(params.limit) : 10;

    const filteredProducts = filterAndSortProducts(PRODUCTS, params);

    const paginatedProducts = paginateProducts(filteredProducts, page, limit);

    return [
      200,
      {
        success: true,
        message: "Get products successfully",
        data: paginatedProducts,
        meta: {
          total: filteredProducts.length,
          page,
          pages: Math.ceil(filteredProducts.length / limit),
          limit
        }
      }
    ];
  });
}
