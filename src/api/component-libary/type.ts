// TypeScript에서 인터페이스 이름의 첫 글자는 일반적으로 대문자로 작성하는 것이 관례입니다.
// 이는 JavaScript/TypeScript 커뮤니티에서 널리 받아들여지는 명명 규칙(naming convention)에 따른 것입니다.
// 클래스, 인터페이스, 타입 별칭 등 사용자 정의 타입의 이름은 보통 PascalCase(첫 글자 대문자, 단어 시작마다 대문자)를 사용합니다.

/**
 * @description  index
 */
export interface IndexParam {
  libraryIdx: number; // Required
}

/**
 * @description  index
 */
export interface LibraryResponse {
  idx: string;
  address: string;
  address_detail: string;
}
