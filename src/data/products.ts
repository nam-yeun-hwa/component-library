interface Review {
  userId: number; // 사용자 ID
  comment: string; // 리뷰 내용
  rating: number; // 리뷰 평점
}

export interface Product {
  id: number; // 고유 식별자
  name: string; // 상품명
  price: number; // 가격
  discountPrice: number | null; // 할인가 (선택)
  stock: number; // 재고 수량
  category: string; // 카테고리
  imageUrl: string; // 상품 이미지 경로
  description: string; // 상품 설명
  isBest: boolean; // 베스트 상품 여부
  isNew: boolean; // 신상품 여부
  isRegular: boolean; // 일반 상품 여부
  rating: number; // 평균 평점
  reviews: Review[]; // 리뷰 배열
}

export const products: Product[] = [
  {
    id: 1, // 고유 식별자
    name: "스마트폰", // 상품명
    price: 799000, // 가격
    discountPrice: 699000, // 할인가 (선택)
    stock: 50, // 재고 수량
    category: "전자제품", // 카테고리
    imageUrl: "/images/smartphone.jpg", // 상품 이미지 경로
    description: "최신 5G 스마트폰", // 상품 설명
    isBest: true, // 베스트 상품 여부
    isNew: true, // 신상품 여부
    isRegular: false, // 일반 상품 여부
    rating: 4.5, // 평균 평점
    reviews: [{ userId: 101, comment: "좋아요", rating: 5 }], // 리뷰 배열
  },
  {
    id: 2,
    name: "노트북",
    price: 1299000,
    discountPrice: null,
    stock: 30,
    category: "전자제품",
    imageUrl: "/images/laptop.jpg",
    description: "고성능 노트북",
    isBest: false,
    isNew: false,
    isRegular: true,
    rating: 4.0,
    reviews: [],
  },
];
